//contain all the route structure of the server where the api will be called
const express = require('express');
const { getAllStudents, addStudent, updateStudent } = require('../controller/student-controller');

const studentRouter = express.Router();// contains all the request methods(get,post,put,delete)

studentRouter.get("/",getAllStudents);//get
studentRouter.post("/",addStudent);//create
studentRouter.put("/:id",updateStudent);//update

module.exports = studentRouter;