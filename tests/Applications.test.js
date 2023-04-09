const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const {
  employersData,
  studentsData,
  applicationsData,
  postingsData,
} = require("./sampledata");
const app = require("../server/index");
let mongoServer;

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

describe("Employer tests", () => {
  it("Create Application", async () => {
    const addEmployer = await request(app)
      .post("/employers")
      .send(employersData[0]);
    const { employer } = addEmployer.body;
    expect(addEmployer.status).toBe(201);
    employersData[0].employerID = employer._id;
    postingsData[0].employerID = employer._id;

    const addStudent = await request(app)
      .post("/students")
      .send(studentsData[0]);
    const { student } = addStudent.body;
    expect(addStudent.status).toBe(201);
    studentsData[0].studentID = student._id;
    applicationsData[0].studentID = student._id;

    const addPosting = await request(app)
      .post("/postings")
      .send(postingsData[0]);
    const { posting } = addPosting.body;
    expect(addPosting.status).toBe(201);
    postingsData[0].postingID = posting._id;
    applicationsData[0].postingID = posting._id;

    const response = await request(app)
      .post("/applications")
      .send({ postingID: posting._id, studentID: student._id });
    const { application } = response.body; // get the employer object from the response
    expect(response.status).toBe(201);
    expect(application.studentEmail).toBe(studentsData[0].studentEmail);
    applicationsData[0].applicationID = application._id;
  });
  it("Delete Application", async () => {
    const response = await request(app)
      .delete(`/applications/${applicationsData[0].applicationID}`)
      .send({ studentID: applicationsData[0].studentID });
    expect(response.status).toBe(200);
  });
  it("Get all applications", async () => {
    const response = await request(app).get(`/applications`);
    const { application } = response.body; // get the employer object from the response

    expect(response.status).toBe(200);
  });
  it("Get application", async () => {
    const addResponse = await request(app).post("/applications").send({
      postingID: postingsData[0].postingID,
      studentID: studentsData[0].studentID,
    });
    const { application: newApplication } = addResponse.body; // get the employer object from the response

    applicationsData[0].applicationID = newApplication._id;

    const response = await request(app).get(
      `/applications/${newApplication._id}`
    );
    const { application: applicationObj } = response.body; // get the employer object from the response

    expect(response.status).toBe(200);
    expect(applicationObj._id).toBeDefined();
    expect(applicationObj.studentEmail).toBe(studentsData[0].studentEmail);
  });
  it("Get employer applications", async () => {
    let validEmployer = employersData[0];

    const response = await request(app).get(
      `/applications/posting/${postingsData[0].postingID}`
    );
    const { application } = response.body; // get the employer object from the response

    expect(response.status).toBe(200);
    // test here values
  });
  it("Get student applications", async () => {
    let validStudent = studentsData[0];

    const response = await request(app).get(
      `/applications/student/${validStudent.studentID}`
    );
    const { applications } = response.body; // get the employer object from the response

    expect(response.status).toBe(200);
    expect(applications[0].studentID).toBe(studentsData[0].studentID);
    expect(applications[0].postingID).toBe(postingsData[0].postingID);
  });
  it("Update application", async () => {
    const response = await request(app)
      .patch(`/applications/${applicationsData[0].applicationID}`)
      .send({ ...applicationsData[2] });

    expect(response.status).toBe(200);
  });
  it("Check if application exists", async () => {
    const response = await request(app).post(
      `/applications/stuPosting/${postingsData[0].postingID}`
    );
    const { applications } = await response;
    expect(response.status).toBe(200);
  });
});
//jest.setTimeout(30000)
