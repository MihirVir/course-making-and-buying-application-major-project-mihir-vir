const Purchased = require('../models/purchased');
const Review = require('../models/review');

const getYearDataPurchase = async (req, res) => {
    try {
        const userId = req.user.id;

        const coursesPurchasedByOthers = await Purchased.find();
        
        if (userId !== coursesPurchasedByOthers) {
            return res
                    .status(404)
                    .json({
                        message: "Unauthorize access of the data"
                    })
        }
        
    } catch (err) {
        console.log(err);
        return res
                .status(500)
                .json({
                    message: "Internal Server Error"
                })
    }
}

module.exports = {
    getYearDataPurchase,
}