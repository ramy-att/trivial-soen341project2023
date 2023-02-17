const Application = require("../model/application");

//GET START

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

const addApplication = async (req, res, next) => {
  const {
    studentID,
    studentResume,
    studentCoverLetter,
    extraDetailsForEmployerByStudent,
    applicationStatus,
  } = req.body; // we post in the body of the API
  if (
    !studentID &&
    studentID.trim() === ""
    ) {
    
    return res.status(422).json({ err: "Invaild data for application" });
  } // return error message if data is wrong or missing

  let application;
  try {
    // defining an application
    application = new Application({
      studentID, // = getStudentID()
      studentResume,
      studentCoverLetter,
      extraDetailsForEmployerByStudent,
      applicationStatus,
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

// POST ENDS
//PUT STARTS (update user)

const updateApplication = async (req, res, next) => {
  const id = req.params.id;
  const {
    studentID,
    studentResume,
    studentCoverLetter,
    extraDetailsForEmployerByStudent,
    applicationStatus,
  } = req.body; // we post in the body of the API
  if (
    !studentID &&
    studentID.trim() === ""
  ) {
    return res.status(422).json({ err: "Invaild data for job application" });
  } // return error message if data is wrong or missing
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
    return res.status(500).json({ err: "unable to save the application info" });
  }
  return res.status(200).json({ message: "updated Successfully" });
};
//PUT ENDS
//DELETE STARTS ****ONLY ADMIN AND application application OWNER CAN DELETE****
const deleteApplication = async (req, res, next) => {
  const id = req.params.id;
  let application;
  try {
    application = await Application.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!application) {
    return res.status(500).json({ err: "Unable to delete application" });
  }
  return res.status(200).json({ message: "application deleted successfully" });
}; //DELETE END ****ONLY ADMIN AND application OWNER CAN DELETE****
//GET application BY ID START
const getApplicationById = async (req, res, next) => {
  let id = req.params.id;
  let application;
  try {
    application = await Application.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!application) {
    return res.status(404).json({ err: "could NOT get application by ID" });
  }
  return res.status(200).json({ application });
};

exports.getAllApplications = getAllApplications;
exports.addApplication = addApplication;
exports.updateApplication = updateApplication;
exports.deleteApplication = deleteApplication;
exports.getApplicationById = getApplicationById;
