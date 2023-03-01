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
const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const employerSchema = new Schema({

    employerName:{
        type: String,
        required: true,
    },

    employerPassword:{
        type: String,
        required: true,
    },

    employerEmail:{
        type: String,
        required: true,
        unique: true,
    },

    organizationName:{
        type: String,
        required: true,
    },

    category:{
        type: String,
    },

    postings:{
        type:String,
    },


    applications:{
        type:String,
    }



});

module.exports = mongoose.model("employer", employerSchema);