const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    coursesAddedToCart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    totalPrice: {
        type: Number
    },
    priceAfterDiscount: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema);