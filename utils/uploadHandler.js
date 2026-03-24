let multer = require('multer')
let path = require('path')

//luu o dau ? luu voi ten la gi?
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        let newFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, newFileName)
    }
})
let filterImage = function (req, file, cb) {
    console.log(file);
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error("file khong dung dinh dang"))
    }
}
let filterExel = function (req, file, cb) {
    // Accept various MIME types for Excel files
    const acceptedMimeTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/vnd.ms-excel.sheet.macroEnabled.12',
        'application/x-xlsx'
    ];
    
    const isAccepted = acceptedMimeTypes.some(type => file.mimetype.includes(type.split('/')[1]) || file.mimetype === type);
    
    if (isAccepted || file.originalname.endsWith('.xlsx') || file.originalname.endsWith('.xls')) {
        cb(null, true)
    } else {
        cb(new Error("file khong dung dinh dang"))
    }
}
module.exports = {
    uploadImage: multer({
        storage: storage,
        limits: 5 * 1024 * 1024,
        fileFilter: filterImage
    }),
    uploadExcel: multer({
        storage: storage,
        limits: 5 * 1024 * 1024,
        fileFilter: filterExel
    })
}
