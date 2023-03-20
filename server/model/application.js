const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  studentID: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  organizationName: {
    type: String,
    required: false,
  },
  studentEmail: {
    type: String,
    required: false,
  },
  postingID: {
    type: String,
    required: true,
  },
  extraDetails: {
    type: String,
  },
  // Modifiable by the employer
  applicationStatus: {
    type: String,
    required: true, // once submitted make it "submitted"
  },
});

module.exports = mongoose.model("application", applicationSchema);
