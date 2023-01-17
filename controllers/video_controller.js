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
        const title = req.body.title
        let titleArr = title.replace(/\s/g,"").split(',')
        let titleArrSize = titleArr.length
        const lengthOfFiles = arr.length;
       
        if (titleArrSize !== lengthOfFiles) {
            return res
                    .status(404)
                    .json({
                        responseStatus: 404,
                        message: "Invalid Size Of The Array as title arr and files size don't match"
                    })
        }

        const newCourse = new Course({
                title: titleArr,
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
        let videoName = []
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
        videoName = [...findCourse.videoName]

        let deletedVideo = arr.splice(idx, 1)
        let deletedTitle = titleArr.splice(idx, 1)
        let deletedVideoName = videoName.splice(idx, 1);

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {title: titleArr, video: arr, videoName: videoName}, {new: true})

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
        const title = req.body.title;
        const titleArr = title.split(',')
        const privacy = req.body.privacy;
        const findingCourse = await Course.findById(courseId);

        const lenOldTitle = findingCourse.title.length;
        const lenNewTitle = titleArr.length;

        if (lenOldTitle !== lenNewTitle) {
            return res
                    .status(404)
                    .json({
                        responseStatus: 404,
                        message: "invlaid arr size"
                    })
        }
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {template: template, title: titleArr, privacy}, {new: true})
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

// const changeTitle = async (req, res) => {
//     try {
//         let arr = []
        
//         const courseId = req.params.id;
//         const changedTitle = req.body.title;
//         const findCourseTitle = await Course.findById(courseId);

//         let titleArr = changedTitle.replace(/\s/g,"").split(',')
        
//         const courseFile = findCourseTitle.title;

//         if (courseFile.length !== titleArr.length) {
//             return res
//                     .status(404)
//                     .json({
//                         responseStatus: 404,
//                         message: "Invalid Size Of The Array"
//                     })
//         }

//         const updatingTitle = await Course.findById(courseId, {title: arr}, {new: true});

//         return res  
//                 .status(200)
//                 .json(updatingTitle)
        
//     } catch (err) {
//         return res
//                 .status(500)
//                 .json({
//                     responseStatus: 500,
//                     message: "Internal Server Error"
//                 })
//     }
// }
module.exports = {
    uploadVideo,
    removeAllCourses,
    removeSpecificCourse,
    getSpeficCourse,
    getAllCourses,
    deleteSpecificVideo,
    updateCourse,
    
}