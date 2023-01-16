const express = require('express');
const router = express.Router();
const { loginUser, registerUser, deleteUsers, getUsers, getSpecificUser, updateUser } = require('../controllers/auth_controller');
// login

router.post('/login', loginUser);
router.post('/register', registerUser);
router.delete('/delete', deleteUsers);
router.get('/', getUsers);
router.get('/:userId', getSpecificUser);
// router.patch(':userId', updateUser);

module.exports = router;