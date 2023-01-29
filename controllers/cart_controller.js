const Cart = require('../models/cart');
const Course = require('../models/course');
const createNewCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.id;
        const discountCoupon = req.body.discountCoupon;
        const creatingCart = new Cart();

        // findingCourse 
        const courseAdded = await Course.findOne({
            id: courseId
        })

        let initPrice = courseAdded.price;
        //TODO Later
    } catch (err) {
        return res
                .status(500)
                .json({
                    message: "Internal Server Error"
                })
    }
}

const clearCart = async (req, res) => {
    try {

    } catch (err) {
        return res
                .status(500)
                .json({
                    message: "Internal Server Error"
                })
    }
}
module.exports = {
    createNewCart
}