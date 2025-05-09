const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const College = require('../models/College');
const Review = require('../models/Review');
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Apply admin authentication middleware to all routes
router.use(auth, adminAuth);

// Get admin dashboard stats
router.get('/dashboard', async (req, res) => {
    try {
        const [
            totalColleges,
            totalUsers,
            totalReviews,
            pendingReviews
        ] = await Promise.all([
            College.countDocuments(),
            User.countDocuments(),
            Review.countDocuments(),
            Review.countDocuments({ status: 'pending' })
        ]);

        res.json({
            stats: {
                totalColleges,
                totalUsers,
                totalReviews,
                pendingReviews
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const skip = (page - 1) * limit;

        const query = search ? {
            $or: [
                { name: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') }
            ]
        } : {};

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await User.countDocuments(query);

        res.json({
            users,
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

// Update user role
router.put('/users/:id/role', [
    body('role').isIn(['user', 'admin']).withMessage('Invalid role')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get pending reviews
router.get('/reviews/pending', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const reviews = await Review.find({ status: 'pending' })
            .populate('user', 'name email')
            .populate('college', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Review.countDocuments({ status: 'pending' });

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

// Moderate review
router.put('/reviews/:id/moderate', [
    body('status').isIn(['approved', 'rejected']).withMessage('Invalid status'),
    body('reason').optional().trim().notEmpty().withMessage('Reason is required for rejection')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { status, reason } = req.body;
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.status = status;
        if (status === 'rejected' && reason) {
            review.rejectionReason = reason;
        }

        await review.save();

        // Update college rating if review is approved
        if (status === 'approved') {
            const college = await College.findById(review.college);
            if (college) {
                await college.updateRating();
            }
        }

        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Bulk import colleges
router.post('/colleges/import', async (req, res) => {
    try {
        const { colleges } = req.body;

        if (!Array.isArray(colleges)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }

        const results = await Promise.all(
            colleges.map(async (collegeData) => {
                try {
                    const college = new College(collegeData);
                    await college.save();
                    return { success: true, college };
                } catch (error) {
                    return { success: false, error: error.message };
                }
            })
        );

        res.json({
            message: 'Import completed',
            results
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export college data
router.get('/colleges/export', async (req, res) => {
    try {
        const colleges = await College.find()
            .select('-reviews')
            .lean();

        res.json({
            colleges,
            exportDate: new Date(),
            totalColleges: colleges.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 