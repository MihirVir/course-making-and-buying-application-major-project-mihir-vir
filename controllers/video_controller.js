const Course = require('../models/course');

const uploadVideo = async (req, res) => {
    try {
       const course = new Course({
            title: req.body.title
        })
        if (req.files) {
            let path = ''
            req.files.forEach((files, index, arr) => {
                path = path + files.path + ','
            })
            path = path.substring(0, path.lastIndexOf(","))
            course.video = path;
        }
        course.author = req.user.id
        const saved = await course.save()
        console.log(saved)
        return res
                .status(201)
                .json(saved)
    } catch (err) {
        console.log(err)
        return res
                .status(500)
                .json({message: "Internal Server Error"})
    }
}

const showVideo = async (req, res) => {
    try {

    } catch (err) {
        return res
                .status(500)
                .json({
                    message: "Internal Server Error!"
                })
    }
}

module.exports = {
    uploadVideo
}