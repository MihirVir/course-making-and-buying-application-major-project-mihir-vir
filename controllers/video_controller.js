const Course = require('../models/course');
const uploadVideo = async (req, res) => {
    try {
        let arr = [];
        let videoNameArr = [];
        req.files.forEach((file) => {
                // console.log(file);
                arr.push(file.path)
                videoNameArr.push(file.filename)
        });
        

        const newCourse = new Course({
                title: req.body.title,
                video: arr,
                author: req.user.id,
            
                videoName: videoNameArr
        });

        const savedCourse = await newCourse.save();
        return res
                    .status(201)
                    .json({
                        message: "Successfully uploaded the course"
                    })
    } catch (err) {
        console.log(err)
        return res
                .status(500)
                .json({message: "Internal Server Error"})
    }
}


const removeAllCourses = async (req, res) => {
    try {
        await Course.deleteMany()
        return res
                .status(200)
                .json({
                    message: "Successfully deleted the courses"
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

const getAllCourse = async (req, res) => {
    try {
        const getCourses = await Course.find();
        return res
                .status(200)
                .json(getCourses)
    } catch (err) {
        return res
                .status(500)
                .json({
                    responseStatus: 500,
                    message: "Internal Server Error"
                })
    }
}

const removeSpecificCourse = async (req, res) => {
    try {
        const courseId = req.params.course;
        await Course.findByIdAndDelete({id: courseId});
        return res 
                .status(200)
                .json({
                    responseStatus: 200,
                    message: "Successfully Deleted The Course"
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

const getSpeficCourse = async (req, res) => {
    try {
        const courseId = req.parmas.courseId;

        const course = await Course.findById({id: courseId});

        if (!course) {
            return res
                    .status(404)
                    .json({
                        responseStatus: 404,
                        message: "Course Not Found :("
                    });
        }

        return res
                .status(200)
                .json({
                    responseStatus: 200,
                    course
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

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        return res
                .status(200)
                .json({
                    responseStatus: 200,
                    courses,
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

const deleteSpecificVideo = async (req, res) => {
    try {
        let arr = []
        const courseId = req.params.id;
        const idx = req.body.index;
        const findCourse = await Course.findById({_id: courseId});
        if (!findCourse) {
            return res
                    .status(404)
                    .json({
                        responseStatus: 404,
                        message: "Course Not Found :("
                    })
        }
        let titleArr = []
        titleArr =[...findCourse.title]
        arr = [...findCourse.video]

        let deletedVideo = arr.splice(idx, 1)
        let deletedTitle = titleArr.splice(idx, 1)


        const updatedCourse = await Course.findByIdAndUpdate(courseId, {title: titleArr, video: arr}, {new: true})

        if (!updatedCourse) {
            return res
                    .status(404)
                    .json({
                        responseStatus: 404,
                        message: "Course Not Found or Some Error Occurred"
                    })
        }

        
        return res
                .status(200)
                .json(updatedCourse)

    } catch (err) {
        console.log(err);
        return res
                .status(500)
                .json({
                    responseStatus: 500,
                    message: "Internal Server Error"
                })
    }
}

const updateCourse = async (req, res) => {
    try {
        const template = req.file.filename;
        const courseId = req.params.id;
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {template: template}, {new: true})
        if (!updatedCourse) {
            return res
                    .status(404)
                    .json({
                        responseStatus: 404,
                        message: "Internal Server Error"
                    })
        }

        return res
                .status(200)
                .json({
                    message: "Successfully updated the course and added the template of the course"
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


module.exports = {
    uploadVideo,
    removeAllCourses,
    removeSpecificCourse,
    getSpeficCourse,
    getAllCourses,
    deleteSpecificVideo,
    updateCourse
}