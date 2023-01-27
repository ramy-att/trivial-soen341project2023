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