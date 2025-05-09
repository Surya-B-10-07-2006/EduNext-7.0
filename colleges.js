const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const College = require('../models/College');
const auth = require('../middleware/auth');
const Fuse = require('fuse.js');

// Get all colleges with filters
router.get('/', async (req, res) => {
    try {
        const {
            search,
            location,
            naacGrade,
            nbaAccredited,
            minFee,
            maxFee,
            course,
            sortBy = 'name',
            sortOrder = 'asc',
            page = 1,
            limit = 10
        } = req.query;

        // Build filter object
        const filter = {};
        if (location) filter.location = new RegExp(location, 'i');
        if (naacGrade) filter.naacGrade = naacGrade;
        if (nbaAccredited) filter.nbaAccredited = nbaAccredited === 'true';
        if (minFee) filter['feeRange.min'] = { $gte: Number(minFee) };
        if (maxFee) filter['feeRange.max'] = { $lte: Number(maxFee) };
        if (course) filter.courses = new RegExp(course, 'i');

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get colleges with filters
        let colleges = await College.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit))
            .populate('reviews');

        // If search query exists, use fuzzy search
        if (search) {
            const fuse = new Fuse(colleges, {
                keys: ['name', 'location', 'description'],
                threshold: 0.3
            });
            colleges = fuse.search(search).map(result => result.item);
        }

        // Get total count for pagination
        const total = await College.countDocuments(filter);

        res.json({
            colleges,
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

// Get college by ID
router.get('/:id', async (req, res) => {
    try {
        const college = await College.findById(req.params.id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name profilePicture'
                }
            });

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.json(college);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create college (admin only)
router.post('/', auth, [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('naacGrade').isIn(['A++', 'A+', 'A', 'B++', 'B+', 'B']).withMessage('Invalid NAAC grade'),
    body('feeRange.min').isNumeric().withMessage('Minimum fee must be a number'),
    body('feeRange.max').isNumeric().withMessage('Maximum fee must be a number'),
    body('courses').isArray().withMessage('Courses must be an array'),
    body('website').isURL().withMessage('Invalid website URL'),
    body('description').trim().notEmpty().withMessage('Description is required')
], async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const college = new College(req.body);
        await college.save();

        res.status(201).json(college);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update college (admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const college = await College.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.json(college);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete college (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const college = await College.findByIdAndDelete(req.params.id);

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.json({ message: 'College deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Save college to user's list
router.post('/:id/save', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const college = await College.findById(req.params.id);

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        if (user.savedColleges.includes(req.params.id)) {
            return res.status(400).json({ message: 'College already saved' });
        }

        user.savedColleges.push(req.params.id);
        await user.save();

        res.json({ message: 'College saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove college from user's list
router.delete('/:id/save', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const college = await College.findById(req.params.id);

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        user.savedColleges = user.savedColleges.filter(
            id => id.toString() !== req.params.id
        );
        await user.save();

        res.json({ message: 'College removed from saved list' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 