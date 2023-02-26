const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: {
        type: [String],
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    courseName: {
        type: String,
        required: true
    },
    video: {
        type: [String]
    },
    videoName: {
        type: [String]
    },
    template: {
        type: String
    },
    tags: {
        type: [String]
    },
    // if false we don't send it to the user
    privacy: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Course', CourseSchema);


