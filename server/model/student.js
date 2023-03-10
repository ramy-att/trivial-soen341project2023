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
  Coverletter: { type: Buffer },
});

module.exports = mongoose.model("student", studentSchema);
