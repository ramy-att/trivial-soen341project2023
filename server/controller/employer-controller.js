const Employer = require("../model/employer");
const bcrypt = require("bcrypt");

// [GET: GET ALL EMPLOYERS]

const getAllEmployers = async (req, res, next) => {
  let employer;
  try {
    employer = await Employer.find();
  } catch (err) {
    return next(err);
  }
  if (!employer) {
    return res.status(500).json({ err: "Internal Server Error" }); //checking if we dont have student (false/some error) return the respons to the server as 500
  }
  return res.status(200).json({ employer });
};

// [POST: ADD A NEW EMPLOYER]

const addEmployer = async (req, res, next) => {
  const { employerName, employerPassword, employerEmail, organizationName } =
    req.body; // we post in the body of the API
  const takenemployerEmail = await Employer.findOne({
    employerEmail: employerEmail,
  });
  if (takenemployerEmail) {
    return res.status(400).json({ err: "User already exists" });
  } else if (
    !employerName ||
    employerName.trim() === "" ||
    !employerEmail ||
    employerEmail.trim() === "" ||
    !organizationName ||
    organizationName.trim() === ""
  ) {
    return res.status(422).json({ err: "Invaild data, cannot add employer" });
  } // return error message if data is wrong or missing
  else if (!employerPassword || employerPassword.length < 6) {
    return res.status(430).json({
      err: "Please enter a valid employerPassword: Must be > 6 characters",
    });
  }
  let employer;
  const hashedEmployerPassword = await bcrypt.hash(employerPassword, 10);
  try {
    // defining an employer
    employer = new Employer({
      employerName,
      employerPassword: hashedEmployerPassword,
      employerEmail,
      organizationName,
    });
    employer = await employer.save(); // save function from mongo
  } catch (err) {
    return next(err);
  }

  if (!employer) {
    return res
      .status(500)
      .json({ err: "Cannot save the employer due to error" });
  }
  return res.status(201).json({ employer }); // 201 is everything goes well return a student Objs
};

// [PATCH: UDPATE EMPLOYER]

const updateEmployer = async (req, res, next) => {
  const id = req.params.id;
  const { employerName, employerPassword, employerEmail, organizationName } =
    req.body; // we post in the body of the API
  if (
    !employerPassword ||
    employerPassword.trim() === "" ||
    employerPassword.length < 6
  ) {
    return res
      .status(422)
      .json({ err: "Please input a valid employerPassword" });
  } // return error message if data is wrong or missing
  let employer;
  const hashedEmployerPassword = await bcrypt.hash(employerPassword, 10);
  try {
    employer = await Employer.findByIdAndUpdate(id, {
      employerName,
      employerPassword: hashedEmployerPassword,
      employerEmail,
      organizationName,
    });
  } catch (err) {
    return next(err);
  }
  if (!employer) {
    return res.status(500).json({ err: "unable to save the employer info" });
  }
  return res.status(200).json({ message: "updated Successfully" });
};

// [DELETE: DELETE EMPLOYER]
// ONLY ADMINS CAN DELETE USERS

const deleteEmployer = async (req, res, next) => {
  // Should cascade
  const id = req.params.id;
  let employer;
  try {
    employer = await Employer.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!employer) {
    return res.status(500).json({ err: "Unable to delete employer" });
  }
  return res.status(200).json({ message: "employer deleted successfully" });
};

// [GET: GET EMPLOYER BY ID]

const getEmployerById = async (req, res, next) => {
  let id = req.params.id;
  let employer;
  try {
    employer = await Employer.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!employer) {
    return res.status(404).json({ err: "could NOT get employer by ID" });
  }
  return res.status(200).json({ employer });
};

exports.getAllEmployers = getAllEmployers;
exports.addEmployer = addEmployer;
exports.updateEmployer = updateEmployer;
exports.deleteEmployer = deleteEmployer;
exports.getEmployerById = getEmployerById;
