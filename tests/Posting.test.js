const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const employer = require("../server/model/employer");
const app = require("../server/index");
const posting = require("../server/model/posting");
let mongoServer;

const employersData = [
    {
      employerName: "Employer 1",
      employerPassword: "employerpass",
      employerEmail: "emp1@emp1.com",
      organizationName: "emp1 company",
    },
    {
      employerName: "Employer 2",
      employerPassword: "employerpass",
      employerEmail: "emp2@emp2.com",
      organizationName: "emp2 company",
    },
    {
      employerName: "Employer 3",
      employerPassword: "employerpassword",
      employerEmail: "emp3@emp3.com",
      organizationName: "emp3 company",
    },
    {
      employerName: "Employer 4",
      employerPassword: "employerpassword",
      employerEmail: "emp4@emp4.com",
      organizationName: "emp4 company",
    },
  ];


const postingsData = [
  {
    employerID: "Employer1",
    description: "Posting1Employer1",
    title: "EMP1INTERN",
    expirationDate:"2020",
    location:"Remote",
  },
  {
    employerID: "Employer2",
    organizationName: "Employer2Company",
    description: "Posting1 Employer2",
    title: "EMP2 INTERN",
    expirationDate:"2021",
    location:"HYBRID",
  },
  {
    employerID: "Employer1",
    description: "Posting2 Employer1",
    title: "EMP1 INTERN2",
    expirationDate:"2022",
    location:"Remote2",
  },
  {
    employerID: "Employer2",
    description: "Posting2 Employer2",
    title: "EMP2 INTERN2",
    expirationDate:"2023",
    location:"HYBRID",
  },
  {
    employerID: "Employer1",
    description: "Posting3 Employer1",
    title: "EMP1 INTERN3",
    expirationDate:"2024",
    location:"Remote3",
  },
  {
    employerID: "Employer3",
    description: "Posting1 Employer3",
    title: "EMP3 INTERN",
    expirationDate:"2025",
    location:"ONSITEEE",
  },
];
beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start();

  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Posting tests", () => {
  it("Create posting", async () => {

    // add employer and set posting's employerID.
    let validEmployer = employersData[0];
    const employerResponse = await request(app).post("/employers").send(validEmployer);
    const { employer } = employerResponse.body; 
    //console.log(employer);
    postingsData[0].employerID=employer._id;

    expect(employerResponse.status).toBe(201); //extra check for employer

    let validPosting = postingsData[0];

    //console.log(validPosting);

    const response = await request(app).post("/postings").send(validPosting);
    const { posting } = response.body; // get the posting object from the response
    expect(response.status).toBe(201);
    expect(posting._id).toBeDefined();
    expect(posting.employerID).toBe(validPosting.employerID);
    expect(posting.organizationName).toBe(validEmployer.organizationName);
    expect(posting.description).toBe(validPosting.description);
    expect(posting.title).toBe(validPosting.title);
    expect(posting.expirationDate).toBe(validPosting.expirationDate);
    expect(posting.location).toBe(validPosting.location);
  });
  
  it("Delete posting", async () => {

    // Create employer to make a posting
    let validEmployer = employersData[1];
    const employerResponse = await request(app).post("/employers").send(validEmployer);
    const { employer } = employerResponse.body; 

    //Create a posting to test
    postingsData[1].employerID=employer._id;

    let employerID = employer._id;

    let validPosting = postingsData[1];

    const createResponse = await request(app).post("/postings").send(validPosting);
    const { newPosting } = createResponse.body; 

    console.log(newPosting);

    //delete posting
    const response = await request(app).delete(`/postings/${createResponse.body._id}`).send({employerID});
    expect(response.status).toBe(200);

    const deletedPosting = await posting.findById(newPosting._id);
    expect(deletedPosting).toBeNull();
  });
//   it("Get all employers", async () => {
//     const response = await request(app).get(`/employers`);
//     const { employer } = response.body; // get the employer object from the response

//     expect(response.status).toBe(200);
//     expect(employer[0].employerEmail).toBe("emp1@emp1.com");
//   });
//   it("Get employer", async () => {
//     let validEmployer = employersData[1];

//     const newEmployer = await employer(validEmployer);
//     await newEmployer.save();

//     const response = await request(app).get(`/employers/${newEmployer._id}`);
//     const { employer: employerObj } = response.body; // get the employer object from the response

//     expect(response.status).toBe(200);
//     expect(employerObj._id).toBeDefined();
//     expect(employerObj.employerName).toBe(validEmployer.employerName);
//     expect(employerObj.employerEmail).toBe(validEmployer.employerEmail);
//     expect(employerObj.organizationName).toBe(validEmployer.organizationName);
//   });
//   it("Update employer", async () => {
//     let validEmployer = employersData[2];
//     const newEmp = employersData[3];

//     const newEmployer = await employer(validEmployer);
//     await newEmployer.save();

//     const response = await request(app)
//       .patch(`/employers/${newEmployer._id}`)
//       .send(newEmp);

//     const { message } = response.body;

//     expect(response.status).toBe(200);
//     expect(message).toBe("updated Successfully");
//   });
});
