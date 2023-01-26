const express = require('express');
const router = express.Router();
const {getYearDataPurchase} = require('../controllers/dashboard_controller');
const { verifyUser } = require('../middlewares/verifyToken');

router.get('/', verifyUser, getYearDataPurchase);


module.exports = router;