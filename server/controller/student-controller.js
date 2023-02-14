//contain functions that controls the api calls

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
  const { studentName, studentEmail, studentPassword } = req.body; // we post in the body of the API
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
//PUT STARTS
const updateStudent = async (req, res, next) => {
  const id = req.params.id;
  const { studentName, studentEmail, studentPassword } = req.body;
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
      studentPassword
    });
  } catch (err) {
    return next(err);
  }
  if (!stu) {
    return res.status(500).json({ err: "unable to save the student info" });
  }
  return res.status(200).json({message:"updated Successfully"});
};

exports.getAllStudents = getAllStudents;
exports.addStudent = addStudent;
exports.updateStudent = updateStudent;
//student is the model
//students is the controller
