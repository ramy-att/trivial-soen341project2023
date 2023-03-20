//contain all the route structure of the server where the api will be called
const express = require("express");
const {
  // all the functions we need for postings
  getAllPostings,
  addPosting,
  updatePosting,
  deletePosting,
  getPostingById,
  getEmployerPostings,
} = require("../controller/jobPosting-controller");

const postingRouter = express.Router(); // contains all the request methods(get,post,put,delete)

postingRouter.get("/", getAllPostings); //get
postingRouter.post("/", addPosting); //create
postingRouter.patch("/:id", updatePosting); //update
postingRouter.delete("/:id", deletePosting);
postingRouter.get("/:id", getPostingById);
postingRouter.get("/employer/:id", getEmployerPostings);

module.exports = postingRouter;
