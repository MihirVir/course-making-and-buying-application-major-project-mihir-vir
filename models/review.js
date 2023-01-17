const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    reviewUser: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    courseReview: {
        type: mongoose.Types.ObjectId,
        ref: "Course"
    },
    rating: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', ReviewSchema);