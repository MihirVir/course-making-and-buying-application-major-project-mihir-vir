const express = require('express');
const router = express.Router();
const {createCoupon, deleteAllCoupons} = require('../controllers/coupon_controller');
const { verifyUser } = require('../middlewares/verifyToken');

router.post('/:courseId', verifyUser, createCoupon);
router.delete('/:courseId', verifyUser, deleteAllCoupons);

module.exports = router;