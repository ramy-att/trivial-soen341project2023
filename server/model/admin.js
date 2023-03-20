// Admin={
// 	"AdminID": [mongoDB];
// 	"name": string, required;
// 	"email": email, unique, required;
// 	"password": password, required;
// }
// controllers: createAdmin() "POST" ; getAdmin() "GET"; updateAdmin() "PUT"; 
// client pages: profile page, 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  adminName: {
    type: String,
    required: true,
  },

  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },

  adminPassword: {
    type: String,
    required: true,
    minLength: 6,
  },
});

module.exports = mongoose.model("admin", adminSchema);
