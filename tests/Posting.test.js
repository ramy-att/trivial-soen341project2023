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
    postingId: "Posting 1",
    description: "Posting1Employer1",
    title: "EMP1INTERN",
    expirationDate: "2020",
    location: "Remote",
  },
  {
    employerID: "Employer2",
    postingId: "Posting 2",
    description: "Posting1 Employer2",
    title: "EMP2 INTERN",
    expirationDate: "2021",
    location: "HYBRID",
  },
  {
    employerID: "Employer1",
    postingId: "Posting 3",
    description: "Posting2 Employer1",
    title: "EMP1 INTERN2",
    expirationDate: "2022",
    location: "Remote2",
  },
  {
    employerID: "Employer2",
    postingId: "Posting 4",
    description: "Posting2 Employer2",
    title: "EMP2 INTERN2",
    expirationDate: "2023",
    location: "HYBRID",
  },
  {
    employerID: "Employer1",
    postingId: "Posting 5",
    description: "Posting3 Employer1",
    title: "EMP1 INTERN3",
    expirationDate: "2024",
    location: "Remote3",
  },
  {
    employerID: "Employer3",
    postingId: "Posting 6",
    description: "Posting1 Employer3",
    title: "EMP3 INTERN",
    expirationDate: "2025",
    location: "ONSITEEE",
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
    const employerResponse = await request(app)
      .post("/employers")
      .send(validEmployer);
    const { employer } = employerResponse.body;
    postingsData[0].employerID = employer._id; // set postingsData[0] employer ID to the correct value
    expect(employerResponse.status).toBe(201); //extra check for employer

    let validPosting = postingsData[0];

    const response = await request(app).post("/postings").send(validPosting);
    const { posting } = response.body; // get the posting object from the response

    postingsData[0].postingID = posting._id;

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
    // Delete Posting added above
    const employerID = postingsData[0].employerID;
    const postingID = postingsData[0].postingID;

    // delete posting
    const deleteResponse = await request(app)
      .delete(`/postings/${postingID}`)
      .send({ employerID });

    const deletedPosting = await posting.findById(postingID);

    expect(deleteResponse.status).toBe(200);
    expect(deletedPosting).toBeNull();
  });
    it("Get all postingss", async () => {
      postingsData[1].employerID = postingsData[0].employerID; 
      postingsData[2].employerID = postingsData[0].employerID; 
      postingsData[3].employerID = postingsData[0].employerID; 
      let validPosting = postingsData[1];

      console.log(validPosting);

      response = await request(app).post("/postings").send(validPosting);
      console.log(response.status);

      response = await request(app).get(`/postings`);
      const { posting } = response.body; // get the employer object from the response

      expect(response.status).toBe(200);
      console.log(response.body);
      expect(posting[0].description).toBe("Posting1 Employer2");
    });
    it("Get Posting", async () => {
      let validPosting = postingsData[2];


      var response = await request(app).post("/postings").send(validPosting);
      const { posting:newPosting } = response.body;

      response = await request(app).get(`/postings/${newPosting._id}`);
      const { posting: postingObj } = response.body; // get the employer object from the response

      expect(response.status).toBe(200);
      expect(postingObj._id).toBeDefined();
      expect(postingObj.organizationName).toBeDefined();
      expect(postingObj.employerID).toBe(validPosting.employerID);
      expect(postingObj.description).toBe(validPosting.description);
      expect(postingObj.title).toBe(validPosting.title);
      expect(postingObj.location).toBe(validPosting.location);
    });
    it("Update posting", async () => {
      let validPosting = postingsData[2];
      const newPos = postingsData[3];

      

      const newPosting = await posting(validPosting);
    
      console.log(newPosting);

      await newPosting.save();

      const response = await request(app)
        .patch(`/postings/${newPosting._id}`)
        .send(newPos);

      const { message } = response.body;

      expect(response.status).toBe(200);
      expect(message).toBe("Posting updated Successfully");
    });
    it("Update posting", async () => {
      let validPosting = postingsData[2];
      const newPos = postingsData[3];

      

      const newPosting = await posting(validPosting);
    
      console.log(newPosting);

      await newPosting.save();

      const response = await request(app)
        .patch(`/postings/${newPosting._id}`)
        .send(newPos);

      const { message } = response.body;

      expect(response.status).toBe(200);
      expect(message).toBe("Posting updated Successfully");
    });
});
