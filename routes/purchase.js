const express = require('express');
const router = express.Router();
const {createPurchased} = require('../controllers/purchased_controller');
const {verifyUser} = require('../middlewares/verifyToken');
// POST routes
router.post('/:courseId', verifyUser, createPurchased);

module.exports = router;