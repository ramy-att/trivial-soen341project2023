"use strict";
const singlefile = require("../model/singlefile");

const singleFileUpload = async (req, res, next) => {
  try {
    const file = new singlefile({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    });
    console.log(file);
    await file.save();
    //should add something incase the file formate is not pdf
    res.status(201).send("File Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallSingleFiles = async (req, res, next) => {
  try {
    const files = await singlefile.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};
module.exports = {
  singleFileUpload,
  getallSingleFiles,
};
