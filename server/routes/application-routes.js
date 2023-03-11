//contain all the route structure of the server where the api will be called
const express = require("express");
const {
  getAllApplications,
  addApplication,
  updateApplication,
  deleteApplication,
  getApplicationById,
} = require("../controller/application-controller");

const applicationRouter = express.Router(); // contains all the request methods(get,post,put,delete)

applicationRouter.get("/", getAllApplications); //get
applicationRouter.post("/", addApplication); //create
applicationRouter.patch("/:id", updateApplication); //update
applicationRouter.delete("/:id", deleteApplication); //only accessable to
applicationRouter.get("/:id", getApplicationById);
module.exports = applicationRouter;
