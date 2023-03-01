// this file is for file validation
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // the location where the file will be saved
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file, originalname);
    cb(null, Date.now() + ext); //the file will be read with the time stamp and extension
  },
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype == "application/pdf") {
      console.log("fileupload");
      callback(null, true);
    }else{
        console.log('wrong type of file')
        callback(null, false)
    }
    console.log({file});
  },
  limits:{
    fileSize: 1024 *1024 *2
  }
});
module.exports = upload
