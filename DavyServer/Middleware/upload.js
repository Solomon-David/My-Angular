const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `/profilePictures`)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + file.filename)
    }
})
const upload = multer({
    storage: storage,
})


module.exports = upload