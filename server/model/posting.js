const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postingSchema = new Schema({
  employerID: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("posting", postingSchema);
