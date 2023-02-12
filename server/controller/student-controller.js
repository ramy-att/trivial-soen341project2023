//contain functions that controls the api calls

const student = require("../model/student");

//get all the users from the database
const getAllStudents = async (req, res, next) => {
  //find all the students in the database
  let students;
  try {
    //find function to find all the records from the doc from a query
    students = await student.find();
  } catch (err) {
    return next(err);
  }
  if (!students) {
    return res.status(500).json({ message: "Internal Server Error" }); //checking if we dont have student (false/some error) return the respons to the server as 500
  }
  return res.status(200).json({students});
};
exports.getAllStudents = getAllStudents;
//student is the model
//students is the controller