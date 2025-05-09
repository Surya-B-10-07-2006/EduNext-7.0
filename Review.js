const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    pros: [{
        type: String
    }],
    cons: [{
        type: String
    }],
    verifiedStudent: {
        type: Boolean,
        default: false
    },
    helpfulVotes: {
        type: Number,
        default: 0
    },
    images: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Ensure one review per user per college
reviewSchema.index({ user: 1, college: 1 }, { unique: true });

// Update college rating when review is saved
reviewSchema.post('save', async function() {
    const College = mongoose.model('College');
    const college = await College.findById(this.college);
    if (college) {
        await college.updateRating();
    }
});

// Update college rating when review is deleted
reviewSchema.post('remove', async function() {
    const College = mongoose.model('College');
    const college = await College.findById(this.college);
    if (college) {
        await college.updateRating();
    }
});

module.exports = mongoose.model('Review', reviewSchema); 