const Application = require("../model/application");
const Student = require("../model/student");
const Posting = require("../model/posting");

// [GET: GET ALL THE APPLICATION]

const getAllApplications = async (req, res, next) => {
  let application;
  try {
    application = await Application.find();
  } catch (err) {
    return next(err);
  }
  if (!application) {
    return res.status(500).json({ err: "Internal Server Error" }); //checking if we dont have student (false/some error) return the respons to the server as 500
  }
  return res.status(200).json({ application });
};

// [POST: ADD A NEW APPLICATION]
const addApplication = async (req, res, next) => {
  const { studentID, postingID, extraDetails, applicationStatus } = req.body; // we post in the body of the API
  if (
    !studentID ||
    studentID.trim() === "" ||
    !postingID ||
    postingID.trim() === ""
  ) {
    return res.status(422).json({ err: "Invaild data for application" });
  } // return error message if data is wrong or missing
  let student;
  let postingInfo;
  try {
    student = await Student.findById(studentID);
    postingInfo = await Posting.findById(postingID);

    // defining an application
    application = new Application({
      studentID, // = getStudentID()
      studentName: student.studentName,
      studentEmail: student.studentEmail,
      organizationName: postingInfo.organizationName,
      title: postingInfo.title,
      postingID,
      extraDetails,
      applicationStatus: "Pending",
    });
    application = await application.save(); // save function from mongo
  } catch (err) {
    return next(err);
  }

  if (!application) {
    return res
      .status(500)
      .json({ err: "Cannot save the application due to error" });
  }
  return res.status(201).json({ application }); // 201 is everything goes well return a student Objs
};

// [PATCH: UPDATE AN APPLICATION]

const updateApplication = async (req, res, next) => {
  const id = req.params.id;
  const {
    studentID,
    studentResume,
    studentCoverLetter,
    extraDetailsForEmployerByStudent,
    applicationStatus,
  } = req.body; // we post in the body of the API
  let application;
  try {
    application = await Application.findByIdAndUpdate(id, {
      studentID,
      studentResume,
      studentCoverLetter,
      extraDetailsForEmployerByStudent,
      applicationStatus,
    });
  } catch (err) {
    return next(err);
  }
  if (!application) {
    return res.status(500).json({ err: "Unable to save the application info" });
  }
  return res.status(200).json({ message: "Application updated successfully!" });
};

// [DELETE: DELETE AN APPLICATION]
// ONLY ADMIN AND STUDENT CAN DELETE
const deleteApplication = async (req, res, next) => {
  const id = req.params.id;
  const student = req.body.studentID;

  let application;
  try {
    application = await Application.findById(id);
    // For now only allow student to delete this applciations
    if (student && application.studentID === student) {
      application = await Application.findByIdAndRemove(id);
    } else {
      return res.status(500).json({ err: "Permission Error" });
    }
  } catch (err) {
    return next(err);
  }
  if (!application) {
    return res.status(500).json({ err: "Unable to delete application" });
  }
  return res.status(200).json({ message: "Application deleted successfully" });
};

// [GET: GET APPLICATION BY ID]
const getApplicationById = async (req, res, next) => {
  let id = req.params.id;
  let application;
  try {
    application = await Application.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!application) {
    return res.status(404).json({ err: "Could not get application by ID" });
  }
  return res.status(200).json({ application });
};

const getPostingApplications = async (req, res, next) => {
  // /posting/:id
  let id = req.params.id;
  let applications;
  try {
    applications = await Application.find({ postingID: id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not fetch all applications" });
  }
  if (!applications) {
    return res
      .status(404)
      .json({ err: "Could not get applications by posting id" });
  }
  return res.status(200).json({ applications });
};

const getStudentApplications = async (req, res, next) => {
  // /student/:id
  let id = req.params.id;
  let applications;
  try {
    applications = await Application.find({ studentID: id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not fetch student applications" });
  }
  if (!applications) {
    return res
      .status(404)
      .json({ err: "Could not get applications by student id" });
  }
  return res.status(200).json({ applications });
};

exports.getAllApplications = getAllApplications;
exports.addApplication = addApplication;
exports.updateApplication = updateApplication;
exports.deleteApplication = deleteApplication;
exports.getApplicationById = getApplicationById;
exports.getPostingApplications = getPostingApplications;
exports.getStudentApplications = getStudentApplications;
