const Posting = require("../model/posting");

//GET START

const getAllPostings = async (req, res, next) => {

  let posting;
  try {
    posting= await Posting.find();
  } catch (err) {
    return next(err);
  }
  if (!posting) {
    return res.status(500).json({ err: "Internal Server Error" }); //checking if we dont have student (false/some error) return the respons to the server as 500
  }
  return res.status(200).json({ posting });
};



const addPosting = async (req, res, next) => {

  const { description, title, expirationDate, location } = req.body; // we post in the body of the API
  if (
    !description &&
    description.trim() === "" &&
    !title &&
    title.trim() === "" &&
    !location &&
    location.trim()==""&&
    !expirationDate &&
    expirationDate.trim()==""
  ) {
    return res.status(422).json({ err: "Invaild data for job posting" });
  } // return error message if data is wrong or missing


  let posting;
  try {
    // defining a student
    posting = new Posting({
      description,
      title,
      expirationDate,
      location
    });
    posting = await posting.save(); // save function from mongo
  } catch (err) {
    return next(err);
  }



  if (!posting) {
    return res.status(500).json({ err: "Cannot save the posting due to error" });
  }
  return res.status(201).json({ posting }); // 201 is everything goes well return a student Objs
}; 


// POST ENDS
//PUT STARTS (update user)

const updatePosting = async (req, res, next) => {
  const id = req.params.id;
  const { description, title, expirationDate, location } = req.body; // we post in the body of the API
  if (
    !description &&
    description.trim() === "" &&
    !title &&
    title.trim() === "" &&
    !location &&
    location.trim()==""&&
    !expirationDate &&
    expirationDate.trim()==""
  ) {
    return res.status(422).json({ err: "Invaild data for job posting" });
  } // return error message if data is wrong or missing
  let posting;
  try {
    posting = await Posting.findByIdAndUpdate(id, {
        description,
        title,
        expirationDate,
        location
    });
  } catch (err) {
    return next(err);
  }
  if (!posting) {
    return res.status(500).json({ err: "unable to save the posting info" });
  }
  return res.status(200).json({ message: "updated Successfully" });
};
//PUT ENDS
//DELETE STARTS ****ONLY ADMIN AND EMPLOYER POSTING OWNER CAN DELETE****
const deletePosting = async (req, res, next) => {
  const id = req.params.id;
  let posting;
  try {
    posting = await Posting.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!posting) {
    return res.status(500).json({ err: "Unable to delete posting" });
  }
  return res.status(200).json({ message: "Posting deleted successfully" });
}; //DELETE END ****ONLY ADMIN AND POSTING OWNER CAN DELETE****
//GET POSTING BY ID START
const getPostingById = async (req,res,next) => {
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
  return res.status(200).json({stu});
};

exports.getAllPostings = getAllPostings;
exports.addPosting = addPosting;
exports.updatePosting = updatePosting;
exports.deletePosting = deletePosting;
exports.getPostingById = getPostingById;

//student is the model
//students is the controller