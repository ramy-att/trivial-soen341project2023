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
  },
  {
    studentName: "student 4",
    studentPassword: "student4",
    studentEmail: "student4@student4.com",
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
