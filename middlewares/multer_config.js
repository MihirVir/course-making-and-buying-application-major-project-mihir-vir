const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `${file.originalname.replace(/\s/g,"").substring(0, 4)}-${Date.now()}.${ext}`)
    }
}) 


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'video/mp4'){
            cb(null, true)
        } else {
            console.log("only mp4 allowed");
            cb(null, false)
        }
    }, 
    limits: {
        fileSize: 1024 * 1024 * 1024 * 1024 * 4
    }
})

module.exports = upload;