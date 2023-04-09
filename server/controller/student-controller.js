//contain functions that controls the api calls
const Student = require("../model/student");
const bcrypt = require("bcrypt");

// [GET: GET ALL STUDENTS]

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

// [POST: ADD NEW STUDENT]

const addStudent = async (req, res, next) => {
  //to add a new Student without errors AKA post
  const { studentName, studentEmail, studentPassword } = req.body; // we post in the body of the API
  const takenEmail = await Student.findOne({ studentEmail: studentEmail });
  if (takenEmail) {
    return res.status(400).json({ err: "User already exists" });
  } else if (
    !studentName ||
    studentName.trim() === "" ||
    !studentEmail ||
    studentEmail.trim() === ""
  ) {
    return res.status(422).json({ err: "Invaild data, cannot add student" });
  } // return error message if data is wrong or missing
  else if (!studentPassword || studentPassword.length < 6) {
    return res
      .status(430)
      .json({ err: "Please enter a valid password: Must be > 6 characters" });
  }
  let student;
  const hashedPassword = await bcrypt.hash(studentPassword, 10);
  try {
    // defining a student
    student = new Student({
      studentName,
      studentEmail,
      studentPassword: hashedPassword,
    });
    student = await student.save(); // save function from mongo
  } catch (err) {
    return next(err);
  }
  if (!student) {
    return res.status(500).json({ err: "Cannot save the user due to error" });
  }
  return res.status(201).json({ student }); // 201 is everything goes well return a student Objs
};

// [PATCH: UPDATE STUDENT]

const updateStudent = async (req, res, next) => {
  const id = req.params.id;

  if(req.files){
  // coverLetters
  if (req.files.resume) {
    // if i submit
    const fs = require("fs");

    const path =
      "./server/controller/uploads/resumes/" + req.params.id + ".pdf"; //deletes old resume
    if (fs.existsSync(path)) {
      try {
        fs.unlinkSync(path);
        //resume removed
      } catch (err) {
        console.error(err);
      }
    }

    var resume = req.files.resume;

    resume.mv(path, function (err) {
      if (err) {
        res.send(err);
      }
    });
  }
 

  if (req.files.coverLetter) {
    // if i submit
    const fs = require("fs");

    const path =
      "./server/controller/uploads/coverLetters/" + req.params.id + ".pdf"; //deletes old coverLetter
    if (fs.existsSync(path)) {
      try {
        fs.unlinkSync(path);
        //coverLetter removed
      } catch (err) {
        console.error(err);
      }
    }

    var coverLetter = req.files.coverLetter;

    coverLetter.mv(path, function (err) {
      if (err) {
        res.send(err);
      }
    });
  }

  if (req.files.transcript) {
    // if i submit
    const fs = require("fs");

    const path =
      "./server/controller/uploads/transcripts/" + req.params.id + ".pdf"; //deletes old transcript
    if (fs.existsSync(path)) {
      try {
        fs.unlinkSync(path);
        //transcript removed
      } catch (err) {
        console.error(err);
      }
    }

    var transcript = req.files.transcript;

    transcript.mv(path, function (err) {
      if (err) {
        res.send(err);
      }
    });
  }
}

  const { studentName, studentEmail, studentPassword } = req.body;
  if (
    !studentPassword ||
    studentPassword.trim() === "" ||
    studentPassword.length < 6
  ) {
    return res.status(422).json({ err: "Please input a valid password" });
  }
  let stu;
  const hashedPassword = await bcrypt.hash(studentPassword, 10);
  try {
    stu = await Student.findByIdAndUpdate(id, {
      studentName,
      studentEmail,
      studentPassword: hashedPassword,
    });
  } catch (err) {
    return next(err);
  }
  if (!stu) {
    return res.status(500).json({ err: "unable to save the student info" });
  }
  return res.status(200).json({ message: "updated Successfully" });
};

// [DELETE: DELETE STUDENT]
// Only admin can delete users

const deleteStudent = async (req, res, next) => {
  // Should cascade
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
};

// [GET: GET STUDENT BY ID]

const getStudentById = async (req, res, next) => {
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
  return res.status(200).json({ stu });
};

exports.getAllStudents = getAllStudents;
exports.addStudent = addStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.getStudentById = getStudentById;
