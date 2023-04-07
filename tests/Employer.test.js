const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { employersData } = require("./sampledata");
const request = require("supertest");
const employer = require("../server/model/employer");
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
  it("Create employer", async () => {
    let validEmployer = employersData[0];
    const response = await request(app).post("/employers").send(validEmployer);
    const { employer } = response.body; // get the employer object from the response
    expect(response.status).toBe(201);
    expect(employer._id).toBeDefined();
    expect(employer.employerName).toBe(validEmployer.employerName);
    expect(employer.employerEmail).toBe(validEmployer.employerEmail);
    expect(employer.organizationName).toBe(validEmployer.organizationName);
  });
  it("Delete employer", async () => {
    let validEmployer = employersData[1];

    const newEmployer = await employer(validEmployer);
    await newEmployer.save();
    const response = await request(app).delete(`/employers/${newEmployer._id}`);
    expect(response.status).toBe(200);

    const deletedEmployer = await employer.findById(newEmployer._id);
    expect(deletedEmployer).toBeNull();
  });
  it("Get all employers", async () => {
    const response = await request(app).get(`/employers`);
    const { employer } = response.body; // get the employer object from the response

    expect(response.status).toBe(200);
    expect(employer[0].employerEmail).toBe("emp1@emp1.com");
  });
  it("Get employer", async () => {
    let validEmployer = employersData[1];

    const newEmployer = await employer(validEmployer);
    await newEmployer.save();

    const response = await request(app).get(`/employers/${newEmployer._id}`);
    const { employer: employerObj } = response.body; // get the employer object from the response

    expect(response.status).toBe(200);
    expect(employerObj._id).toBeDefined();
    expect(employerObj.employerName).toBe(validEmployer.employerName);
    expect(employerObj.employerEmail).toBe(validEmployer.employerEmail);
    expect(employerObj.organizationName).toBe(validEmployer.organizationName);
  });
  it("Update employer", async () => {
    let validEmployer = employersData[2];
    const newEmp = employersData[3];

    const newEmployer = await employer(validEmployer);
    await newEmployer.save();

    const response = await request(app)
      .patch(`/employers/${newEmployer._id}`)
      .send(newEmp);

    const { message } = response.body;

    expect(response.status).toBe(200);
    expect(message).toBe("updated Successfully");
  });
});
