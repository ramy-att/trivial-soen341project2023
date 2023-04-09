const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server/index");
const student = require("../server/model/student");
let mongoServer;

const studentsData = [
  {
    studentName: "student 1",
    studentPassword: "student1",
    studentEmail: "student1@student1.com",
  },
  {
    studentName: "student 2",
    studentPassword: "student2",
    studentEmail: "student2@student2.com",
  },
  {
    studentName: "student 3",
    studentPassword: "student3",
    studentEmail: "student3@student3.com",
    resume:null,
  },
  {
    studentName: "student 4",
    studentPassword: "student4",
    studentEmail: "student4@student4.com",
    resume:null,
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

describe("Student tests", () => {
  it("Create student", async () => {
    let validStudent = studentsData[0];
    const response = await request(app).post("/students").send(validStudent);
    const { student } = response.body; // get the employer object from the response
    expect(response.status).toBe(201);
    expect(student.studentName).toBe(validStudent.studentName);
    expect(student.studentEmail).toBe(validStudent.studentEmail);
    expect(student._id).toBeDefined();
  });
  it("Delete student", async () => {
    let validStudent = studentsData[1];

    const newStudnet = await student(validStudent);
    await newStudnet.save();
    const response = await request(app).delete(`/students/${newStudnet._id}`);
    expect(response.status).toBe(200);

    const deletedStudent = await student.findById(newStudnet._id);
    expect(deletedStudent).toBeNull();
  });
  it("Get all students", async () => {
    const response = await request(app).get(`/students`);
    const { students } = response.body; // get the employer object from the response

    expect(response.status).toBe(200);
    expect(students[0].studentEmail).toBe("student1@student1.com");
  });
  it("Get student", async () => {
    let validStudent = studentsData[1];

    const newStudent = await student(validStudent);
    await newStudent.save();

    const response = await request(app).get(`/students/${newStudent._id}`);
    const { stu: studentObj } = response.body; // get the employer object from the response
    //console.log(response.body);
    expect(response.status).toBe(200);
    expect(studentObj._id).toBeDefined();
    expect(studentObj.studentName).toBe(validStudent.studentName);
    expect(studentObj.studentEmail).toBe(validStudent.studentEmail);
  });
  it("Update student", async () => {
    let validStudent = studentsData[2];
    const newStu = studentsData[3];

    const newStudent = await student(validStudent);
    await newStudent.save();

    const response = await request(app)
      .patch(`/students/${newStudent._id}`)
      .send(newStu);

    const { message } = response.body;

    expect(response.status).toBe(200);
    expect(message).toBe("updated Successfully");
  });
});
