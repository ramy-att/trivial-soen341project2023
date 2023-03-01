const { timeStamp } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },

  studentEmail: {
    type: String,
    required: true,
    unique: true,
  },

  studentPassword: {
    type: String,
    required: true,
    minLength: 6,
  },
  resume: { type: String },
  Coverletter: { type: String },
},{timeStamp: true}); 

module.exports = mongoose.model("student", studentSchema);
//Student schema (Which is an object that contains all the student's info)
