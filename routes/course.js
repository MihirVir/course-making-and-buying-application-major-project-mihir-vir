const express = require('express')
const router = express.Router();
const {uploadVideo} = require('../controllers/video_controller');
const upload = require('../middlewares/multer_config')
const {verifyIsAdmin, verifyUser} = require('../middlewares/verifyToken');



router.post('/upload', upload.array('files'), verifyUser, uploadVideo);

module.exports = router;