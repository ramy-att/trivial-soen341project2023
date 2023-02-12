//contain all the route structure of the server where the api will be called
const express = require('express');
const { getAllStudents } = require('../controller/student-controller');

const studentRouter = express.Router();// contains all the request methods(get,post,put,delete)

router.get("/",getAllStudents);

module.exports = studentRouter;