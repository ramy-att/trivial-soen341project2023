const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postingSchema = new Schema({
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

  applications:{ // Students Applications IDs;
    // "ID1 for Student 10, ID2 for Student 11, sadasdasdsad"
    type:String,
  }
});

module.exports = mongoose.model("posting", postingSchema);
