const Review = require('../models/review');

const createReview = async (req, res) =>{
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id
        
        const newReview = new Review({
            reviewUser: userId,
            courseReview: courseId,
            rating: req.body.rating
        });

        const savedReview = await newReview.save();

        return res
                .status(201)
                .json(savedReview)
        
    } catch (err) {
        return res
                .status(500)
                .json({
                    responseStatus: 500,
                    message: "Internal Server Error"
                })
    }
}

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user.id;
        const changeRating = req.body.rating;
        const findingReview = await Review.findById(reviewId);

        if (userId !== findingReview.reviewUser) {
            // return unauthorized access to edit the review
            return res
                    .status(404)
                    .json({
                        responseStatus: 404,
                        message: "Unauthorised access to edit the review"
                    })
        }

        const updatingReview = await Review.findByIdAndUpdate(reviewId, {rating: changeRating}, { new: true });

        return res
                .status(200)
                .json({
                    updatingReview,
                    message: "Successfully updated the review"
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

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        const deletingReview = await Review.findByIdAndDelete(reviewId);

        if (!deletingReview) {
            return res
                    .status(404)
                    .json({
                        responseStatus: 404,
                        message: "Review doesn't exist"
                    })
        }

        return res
                .status(200)
                .json({
                    message: "Successfully deleted the view"
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

const getReviews = async (req, res) => {
    try {
        const getAllReviews = await Review.find();
        
        return res
                .status(200)
                .json(getAllReviews)
    } catch (err) { 
        return res 
                .status(500)
                .json({
                    responseStatus: 500, 
                    message: "Internal Server Error"
                })
    }
}

const getReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        const getSpecificReview = await Review.findById(reviewId);

        return res
                .status(200)
                .json(getSpecificReview);
    } catch (err) {
        return res
                .status(500)
                .json({
                    responseStatus: 500,
                    message: "Internal Server Error"
                })
    }
}

const getReviewAvgByCourseId = async (req, res) => {
    try {
      const courseId = req.params.courseId;

      const findingReviews = await Review.find({
        courseReview: courseId
      })

      // To do find AVG of all the ratings

      return res
                .status(200)
                .json(findingReviews)
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
    createReview,
    updateReview,
    deleteReview,
    getReviews,
    getReview,
    getReviewAvgByCourseId
}