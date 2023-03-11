const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  studentID: {
    type: String,
    required: true,
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
