const Employer = require("../model/employer");
const bcrypt = require("bcrypt");

//GET START

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

const addEmployer = async (req, res, next) => {
  const {
    name,
    password,
    email,
    organizationName,
    category,
    postings,
    applications,
  } = req.body; // we post in the body of the API
  const takenEmail = await Employer.findOne({ email: email });
  if (takenEmail) {
    return res.status(400).json({ err: "User already exists" });
  } else if (
    !name ||
    name.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !organizationName ||
    organizationName.trim() === ""
  ) {
    return res.status(422).json({ err: "Invaild data, cannot add employer" });
  } // return error message if data is wrong or missing
  else if (!password || password.length < 6) {
    return res
      .status(430)
      .json({ err: "Please enter a valid password: Must be > 6 characters" });
  }
  let employer;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // defining an employer
    employer = new Employer({
      name,
      password: hashedPassword,
      email,
      organizationName,
      category,
      postings,
      applications,
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

// POST ENDS
//PUT STARTS (update user)

const updateEmployer = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    password,
    email,
    organizationName,
    category,
    postings,
    applications,
  } = req.body; // we post in the body of the API
  if (
    !name ||
    name.trim() === "" ||
    !password ||
    email.trim() === "" ||
    !organizationName ||
    organizationName.trim() === ""
  ) {
    return res.status(422).json({ err: "Invaild data for job employer" });
  } // return error message if data is wrong or missing
  else if (!password || password.length < 6) {
     return res.status(430).json({ err: "Please enter a valid password: Must be more than 6 characters" });
  }
  let employer;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    employer = await Employer.findByIdAndUpdate(id, {
      name,
      password: hashedPassword,
      email,
      organizationName,
      category,
      postings,
      applications,
    });
  } catch (err) {
    return next(err);
  }
  if (!employer) {
    return res.status(500).json({ err: "unable to save the employer info" });
  }
  return res.status(200).json({ message: "updated Successfully" });
};
//PUT ENDS
//DELETE STARTS ****ONLY ADMIN AND EMPLOYER employer OWNER CAN DELETE****
const deleteEmployer = async (req, res, next) => {
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
}; //DELETE END ****ONLY ADMIN AND employer OWNER CAN DELETE****
//GET employer BY ID START
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
