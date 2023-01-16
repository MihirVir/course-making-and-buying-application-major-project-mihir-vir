const express = require('express')
const router = express.Router();
const {uploadVideo, removeAllCourses, deleteSpecificVideo, updateCourse} = require('../controllers/video_controller');
const upload = require('../middlewares/multer_config')
const {verifyIsAdmin, verifyUser} = require('../middlewares/verifyToken');
const uploadImage = require('../middlewares/multer_templates_config')
// post routes
router.post('/upload', verifyUser, upload.array('files'), uploadVideo);

// delete routes
router.delete('/', removeAllCourses);

// update course
router.patch('/video/:id', deleteSpecificVideo);
router.patch('/:id', uploadImage.single('img'), updateCourse)


module.exports = router;