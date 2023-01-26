const Cart = require('../models/cart');

const createNewCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.id;
        
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