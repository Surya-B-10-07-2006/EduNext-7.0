const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const College = require('../models/College');
const auth = require('../middleware/auth');

// Get reviews for a college
router.get('/college/:collegeId', async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'createdAt' } = req.query;
        const skip = (page - 1) * limit;

        const reviews = await Review.find({ college: req.params.collegeId })
            .populate('user', 'name profilePicture')
            .sort({ [sort]: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Review.countDocuments({ college: req.params.collegeId });

        res.json({
            reviews,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create review
router.post('/', auth, [
    body('college').notEmpty().withMessage('College ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { college, rating, title, content, pros, cons, images } = req.body;

        // Check if user has already reviewed this college
        const existingReview = await Review.findOne({
            user: req.user.userId,
            college
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this college' });
        }

        // Create review
        const review = new Review({
            user: req.user.userId,
            college,
            rating,
            title,
            content,
            pros,
            cons,
            images
        });

        await review.save();

        // Update college rating
        const collegeDoc = await College.findById(college);
        if (collegeDoc) {
            await collegeDoc.updateRating();
        }

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update review
router.put('/:id', auth, [
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().trim().notEmpty().withMessage('Content cannot be empty')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user owns the review
        if (review.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Update review
        const { rating, title, content, pros, cons, images } = req.body;
        if (rating) review.rating = rating;
        if (title) review.title = title;
        if (content) review.content = content;
        if (pros) review.pros = pros;
        if (cons) review.cons = cons;
        if (images) review.images = images;

        await review.save();

        // Update college rating
        const collegeDoc = await College.findById(review.college);
        if (collegeDoc) {
            await collegeDoc.updateRating();
        }

        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete review
router.delete('/:id', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user owns the review
        if (review.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const collegeId = review.college;
        await review.remove();

        // Update college rating
        const collegeDoc = await College.findById(collegeId);
        if (collegeDoc) {
            await collegeDoc.updateRating();
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark review as helpful
router.post('/:id/helpful', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.helpfulVotes += 1;
        await review.save();

        res.json({ message: 'Review marked as helpful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Report review
router.post('/:id/report', auth, [
    body('reason').trim().notEmpty().withMessage('Reason is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Add report
        review.reports = review.reports || [];
        review.reports.push({
            user: req.user.userId,
            reason: req.body.reason,
            date: new Date()
        });

        // If report count exceeds threshold, mark for review
        if (review.reports.length >= 3) {
            review.status = 'pending';
        }

        await review.save();

        res.json({ message: 'Review reported successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 