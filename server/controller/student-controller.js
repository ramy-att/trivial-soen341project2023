//contain functions that controls the api calls

const student = require("../model/student");
const Student = require("../model/student");

//get all the users from the database
//GET START
const getAllStudents = async (req, res, next) => {
  //find all the students in the database
  let students;
  try {
    //find function to find all the records from the doc from a query
    students = await Student.find();
  } catch (err) {
    return next(err);
  }
  if (!students) {
    return res.status(500).json({ err: "Internal Server Error" }); //checking if we dont have student (false/some error) return the respons to the server as 500
  }
  return res.status(200).json({ students });
};
//GET END
//POST START AKA create a new user
const addStudent = async (req, res, next) => {
  //to add a new Student without errors AKA post
  const { studentName, studentEmail, studentPassword, applications } = req.body; // we post in the body of the API
  if (
    !studentName &&
    studentName.trim() === "" &&
    !studentEmail &&
    studentEmail.trim() === "" &&
    !studentPassword &&
    studentPassword.length > 6
  ) {
    return res.status(422).json({ err: "Invaild data for student" });
  } // return error message if data is wrong or missing
  let student;
  try {
    // defining a student
    student = new Student({
      studentName,
      studentEmail,
      studentPassword,
      applications
    });
    student = await student.save(); // save function from mongo
  } catch (err) {
    return next(err);
  }
  if (!student) {
    return res.status(500).json({ err: "Cannot save the user due to error" });
  }
  return res.status(201).json({ student }); // 201 is everything goes well return a student Objs
}; // POST ENDS
//PUT STARTS (update user)
const updateStudent = async (req, res, next) => {
  const id = req.params.id;
  const { studentName, studentEmail, studentPassword, applications} = req.body;
  if (
    !studentName &&
    studentName.trim() === "" &&
    !studentEmail &&
    studentEmail.trim() === "" &&
    !studentPassword &&
    studentPassword.length > 6
  ) {
    return res.status(422).json({ err: "Invaild data for student" });
  }
  let stu;
  try {
    stu = await Student.findByIdAndUpdate(id, {
      studentName,
      studentEmail,
      studentPassword,
      applications
    });
  } catch (err) {
    return next(err);
  }
  if (!stu) {
    return res.status(500).json({ err: "unable to save the student info" });
  }
  return res.status(200).json({ message: "updated Successfully" });
};
//PUT ENDS
//DELETE STARTS ****ONLY ADMIN CAN DELETE****
const deleteStudent = async (req, res, next) => {
  const id = req.params.id;
  let stu;
  try {
    stu = await Student.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!stu) {
    return res.status(500).json({ err: "Unable to delete student" });
  }
  return res.status(200).json({ message: "Student deleted successfully" });
}; //DELETE END ****ONLY ADMIN CAN DELETE****
//GET STUDENT BY ID START
const getStudentById = async (req,res,next) => {
  let id = req.params.id;
  let stu;
  try {
    stu = await Student.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!stu) {
    return res.status(404).json({ err: "could NOT get student by ID" });
  }
  return res.status(200).json({stu});
};

exports.getAllStudents = getAllStudents;
exports.addStudent = addStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.getStudentById = getStudentById;

//student is the model
//students is the controller
