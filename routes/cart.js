const express = require('express');
const { createNewCart } = require('../controllers/cart_controller');
const { verifyUser } = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/:id', verifyUser, createNewCart);
module.exports = router;