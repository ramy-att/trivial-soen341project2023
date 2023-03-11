const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employerSchema = new Schema({
  employerName: {
    type: String,
    required: true,
  },
  employerPassword: {
    type: String,
    required: true,
  },
  employerEmail: {
    type: String,
    required: true,
    unique: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("employer", employerSchema);
