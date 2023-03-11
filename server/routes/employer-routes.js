//contain all the route structure of the server where the api will be called
const express = require("express");
const {
  getAllEmployers,
  addEmployer,
  updateEmployer,
  deleteEmployer,
  getEmployerById,
} = require("../controller/employer-controller");

const employerRouter = express.Router(); // contains all the request methods(get,post,put,delete)

employerRouter.get("/", getAllEmployers); //get
employerRouter.post("/", addEmployer); //create
employerRouter.patch("/:id", updateEmployer); //update
employerRouter.delete("/:id", deleteEmployer); //only accessable to
employerRouter.get("/:id", getEmployerById);
module.exports = employerRouter;
