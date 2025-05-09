const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    location: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    naacGrade: {
        type: String,
        required: true,
        enum: ['A++', 'A+', 'A', 'B++', 'B+', 'B']
    },
    nbaAccredited: {
        type: Boolean,
        default: false
    },
    feeRange: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    courses: [{
        type: String,
        required: true
    }],
    website: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    facilities: [{
        type: String
    }],
    placement: {
        average: {
            type: Number,
            required: true
        },
        highest: {
            type: Number,
            required: true
        }
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    contactInfo: {
        phone: String,
        email: String,
        address: String
    },
    admissionProcess: {
        type: String,
        required: true
    },
    cutoffMarks: {
        type: Map,
        of: Number
    }
}, {
    timestamps: true
});

// Index for search
collegeSchema.index({ name: 'text', location: 'text', description: 'text' });

// Update average rating when reviews change
collegeSchema.methods.updateRating = async function() {
    const Review = mongoose.model('Review');
    const stats = await Review.aggregate([
        { $match: { college: this._id } },
        { $group: { _id: null, averageRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);

    if (stats.length > 0) {
        this.averageRating = stats[0].averageRating;
        this.totalReviews = stats[0].count;
    } else {
        this.averageRating = 0;
        this.totalReviews = 0;
    }

    await this.save();
};

module.exports = mongoose.model('College', collegeSchema); 