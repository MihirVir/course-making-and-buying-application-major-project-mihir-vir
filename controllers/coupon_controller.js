const Coupon = require('../models/coupon');
const Course = require('../models/course')

const createCoupon = async (req, res) => {
    try {
        const code = req.body.code;
        const courseId = req.params.courseId;
        const discountPercent = req.body.percentage;
        const userId = req.user.id;
        console.log(userId);
        const findCourse = await Course.findById({_id: courseId});
        
        if (findCourse.author != userId) {
            return res
                    .status(400)
                    .json({
                        message: "Unauthorized to access"
                    })
        }

        if (!findCourse) {
            return res
                    .status(404)
                    .json({
                        message: "Course Not Found"
                    })
        }
        const createCode = new Coupon({
            courseId: courseId,
            code: code,
            discountPercent: discountPercent
        });

        const savingCoupon = await createCode.save();

        return res  
                .status(201)
                .json(savingCoupon)
        
    } catch (err) {
        console.log(err);
        return res
                .status(500)
                .json({
                    message: "Internal Server Error"
                })
    }
}

const deleteAllCoupons = async (req, res) => {
    try {
        const courseId = req.params.id; 
        const userId = req.params.id;
        const findCourse = await Course.findById({
            id: courseId
        })
        if (findCourse.author !== userId) {
            return res
                    .status(400)
                    .json({
                        message: "Unauthorized access"
                    })
        }

        const deletingAllCoupons = await Coupon.deleteMany({
            courseId: courseId
        });

        return res
                .status(200)
                .json({
                    deletingAllCoupons,
                    message: "Successfully Deleted The Coupons"
                })
    } catch (err) {
        return res
                .status()
    }
}
module.exports = {
    createCoupon,
    deleteAllCoupons
}