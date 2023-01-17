const Purchased = require('../models/purchased');

const createPurchased = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;

        const creatingUser = new Purchased();
        
        creatingUser.customer = userId;
        creatingUser.coursesPurchased.push(courseId);

        const savedUserPurchase = await creatingUser.save();

        return res
                .status(201)
                .json({
                    savedUserPurchase,
                    message: "Successfully created the purchase"
                })
    } catch (err) {
        return res
                .status(500)
                .json({
                    responseStatus: 500,
                    message: "Internal Server Error"
                })
    }
}

const returnPurchase = async (req, res) => {
    try {
        const purchaseId = req.params.purchaseId;
        const idx = req.body.index;

        const gettingPurchases = await Purchased.findById({purchaseId});

        // TODO Later
    } catch (err) {
        return res
                .status(500)
                .json({
                    responseStatus: 500,
                    message: "Internal Server Error"
                })
    }
}
module.exports = {
    createPurchased,
}