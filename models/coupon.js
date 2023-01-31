const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    code: {
        type: String,
        required: true
    },
    discountPercent: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Coupon", CouponSchema);