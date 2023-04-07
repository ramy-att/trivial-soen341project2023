const employersData = [
  {
    employerName: "Employer 1",
    employerID: "Employer 1",
    employerPassword: "employerpass",
    employerEmail: "emp1@emp1.com",
    organizationName: "emp1 company",
  },
  {
    employerName: "Employer 2",
    employerID: "Employer 2",
    employerPassword: "employerpass",
    employerEmail: "emp2@emp2.com",
    organizationName: "emp2 company",
  },
  {
    employerName: "Employer 3",
    employerID: "Employer 3",
    employerPassword: "employerpassword",
    employerEmail: "emp3@emp3.com",
    organizationName: "emp3 company",
  },
  {
    employerName: "Employer 4",
    employerID: "Employer 4",
    employerPassword: "employerpassword",
    employerEmail: "emp4@emp4.com",
    organizationName: "emp4 company",
  },
];
const studentsData = [
  {
    studentName: "Student1",
    studentEmail: "stu@conco.com",
    studentPassword: "studentPassword",
  },
  {
    studentName: "Student2",
    studentEmail: "stu2@conco.com",
    studentPassword: "student2Password",
  },
  {
    studentName: "Student3",
    studentEmail: "stu3@conco.com",
    studentPassword: "student3Password",
  },
  {
    studentName: "Student4",
    studentEmail: "stu4@conco.com",
    studentPassword: "student4Password",
  },
];
const postingsData = [
  {
    employerID: "Employer 1",
    postingID: "Posting 1",
    description: "Posting1Employer1",
    title: "EMP1INTERN",
    expirationDate: "2020",
    location: "Remote",
  },
  {
    employerID: "Employer 2",
    postingID: "Posting 2",
    organizationName: "Employer2Company",
    description: "Posting1 Employer2",
    title: "EMP2 INTERN",
    expirationDate: "2021",
    location: "HYBRID",
  },
  {
    employerID: "Employer 3",
    postingID: "Posting 3",
    description: "Posting2 Employer1",
    title: "EMP1 INTERN2",
    expirationDate: "2022",
    location: "Remote2",
  },
  {
    employerID: "Employer 4",
    postingID: "Posting 4",
    description: "Posting2 Employer2",
    title: "EMP2 INTERN2",
    expirationDate: "2023",
    location: "HYBRID",
  },
];
const applicationsData = [
  {
    studentID: "Student1",
    postingID: "Posting 1",
    applicationID: "id",
  },
  {
    studentID: "Student2",
    postingID: "Posting 2",
  },
  {
    studentID: "Student3",
    postingID: "Posting 3",
  },
  {
    studentID: "Student4",
    postingID: "Posting 4",
  },
];

exports.employersData = employersData;
exports.studentsData = studentsData;
exports.applicationsData = applicationsData;
exports.postingsData = postingsData;
