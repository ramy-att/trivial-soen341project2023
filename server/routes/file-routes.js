const express = require("express");
const {
  downloadFile,
} = require("../controller/file-controller");

const fileRouter = express.Router(); // contains all the request methods(get,post,put,delete)

fileRouter.post("/", downloadFile); //get

module.exports = fileRouter;
