const Posting = require("../model/posting");

// [GET: GET AL POSTINGS]

const getAllPostings = async (req, res, next) => {
  let posting;
  try {
    posting = await Posting.find();
  } catch (err) {
    return next(err);
  }
  if (!posting) {
    return res.status(500).json({ err: "Internal Server Error" }); //checking if we dont have Posting (false/some error) return the respons to the server as 500
  }
  return res.status(200).json({ posting }); //if everything works return the postings
};

// [POST: ADD NEW POSTING]

const addPosting = async (req, res, next) => {
  const { employerID, description, title, expirationDate, location } = req.body; // we post in the body of the API
  if (
    !employerID ||
    employerID.trim() === "" ||
    !description ||
    description.trim() === "" ||
    !title ||
    title.trim() === "" ||
    !location ||
    location.trim() == "" ||
    !expirationDate ||
    expirationDate.trim() == ""
  ) {
    return res.status(422).json({ err: "Invaild data for job posting" });
  } // return error message if data is wrong or missing

  let posting;
  try {
    // defining a student
    posting = new Posting({
      employerID,
      description,
      title,
      expirationDate,
      location,
    });
    posting = await posting.save(); // save function from mongo
  } catch (err) {
    return next(err); // check for errors when trying to save or server
  }

  if (!posting) {
    return res
      .status(500)
      .json({ err: "Cannot save the posting due to error" });
  }
  return res.status(201).json({ posting }); // 201 is everything goes well return a student Objs
};

// [PUT: UPDATE POSTING]

const updatePosting = async (req, res, next) => {
  const id = req.params.id;
  const { description, title, expirationDate, location } = req.body; // we post in the body of the API
  let posting;
  try {
    posting = await Posting.findByIdAndUpdate(id, {
      description,
      title,
      expirationDate,
      location,
    });
  } catch (err) {
    return next(err);
  }
  if (!posting) {
    return res.status(500).json({ err: "unable to save the posting info" });
  }
  return res.status(200).json({ message: "Posting updated Successfully" });
};

// [DELETE: DELETE POSTING]
// ONLY ADMIN AND EMPLOYER CAN DELETE

const deletePosting = async (req, res, next) => {
  const id = req.params.id;
  const employer = req.body.employerID;

  let posting;
  try {
    posting = await Posting.findById(id);
    if (posting.employerID === employer) {
      posting = await Posting.findByIdAndRemove(id);
    } else {
      return res.status(500).json({ err: "Permission Error" });
    }
  } catch (err) {
    return next(err);
  }
  if (!posting) {
    return res.status(500).json({ err: "Unable to delete posting" });
  }
  return res.status(200).json({ message: "Posting deleted successfully" });
};
// [GET: GET BY ID]
const getPostingById = async (req, res, next) => {
  let id = req.params.id;
  let posting;
  try {
    posting = await Posting.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!posting) {
    return res.status(404).json({ err: "could NOT get posting by ID" });
  }
  return res.status(200).json({ posting });
};

// [GET: LET EMPLOYER GET HIS OWN POSTINGS]
const getEmployerPostings = async (req, res, next) => {
  // /postings/employer/:id
  let id = req.params.id;
  let postings;
  try {
    postings = await Posting.find({ employerID: id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not fetch all postings" });
  }
  if (!postings) {
    return res
      .status(404)
      .json({ err: "Could not get postings by employer id" });
  }
  return res.status(200).json({ postings });
};

exports.getAllPostings = getAllPostings;
exports.addPosting = addPosting;
exports.updatePosting = updatePosting;
exports.deletePosting = deletePosting;
exports.getPostingById = getPostingById;
exports.getEmployerPostings = getEmployerPostings;
