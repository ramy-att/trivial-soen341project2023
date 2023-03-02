const mongoose = require("mongoose");
const singlefile = require("../model/singlefile");
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
  resume : { type: [Schema.Types.ObjectId], ref: 'singlefile' },
  Coverletter: { type: [Schema.Types.ObjectId], ref: 'singlefile'  },
});

module.exports = mongoose.model("student", studentSchema);
//Student schema (Which is an object that contains all the student's info)
