// employer={
// 	"employerID": [mongoDB];
// 	"name": string, required;
// 	"email": email, unique, required;
// 	"password": password, required;
// 	"organizationName": string, required
// 	"category": engineering | business | .... // required categories?
// 	"postings": [...jobPostings]
// 	"applications": [...applications] filtered by applicantionInfo.company -> getByEmployer(exmployerID)
// }
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  applications: {
    type: String,
  },
});

module.exports = mongoose.model("employer", employerSchema);
