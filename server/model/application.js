// application={
// 	"applicationID": [mongoDB];
// 	"postingID": jobPostingID;
// 	"applicantionInfo": {name, email};
// 	"organizationName": string;
// 	"status": underReview | interview | selected | rejected;
// 	"applicationPackage": {resume, coverLetter, Transcript}
// }
const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const applicationSchema = new Schema({

    /*
    Mazen- Student ID: 10'
    Student Clicks Apply on Posting #69
    
    System Creates new Application

    Application {
        Application ID= 36;
        StudentID= 10;
        ...
        .
    }

    System Adds new Application's ID to Posting #69

    Posting #69{
        Applications =+ "36";
    }

    Employer can view Applications on his Posting

    Employer{
        Postings: 69,???;
    }

    */

    studentID:{ //Get Student ID
        type: String,
        required: true,
    },

    studentResume:{
        type: Buffer,
       // required: true,
    },

    studentCoverLetter:{
        type: Buffer,
    },

    extraDetailsForEmployerByStudent:{
        type: String,
    },

    //Employer can change Application Status
    applicationStatus:{
        type: String,
    }

});

module.exports = mongoose.model("application", applicationSchema);