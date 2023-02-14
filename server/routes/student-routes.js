//contain all the route structure of the server where the api will be called
const express = require("express");
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
} = require("../controller/student-controller");

const studentRouter = express.Router(); // contains all the request methods(get,post,put,delete)

studentRouter.get("/", getAllStudents); //get
studentRouter.post("/", addStudent); //create
studentRouter.put("/:id", updateStudent); //update
studentRouter.delete("/:id", deleteStudent);
studentRouter.get("/:id", getStudentById);
module.exports = studentRouter;
