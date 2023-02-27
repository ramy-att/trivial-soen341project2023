import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../DataTable/DataTable.js";
import "./Postings.css";

const StudentPostings = () => {
  const apply = (
    <Link to="/job-postings/0" className="apply-to-posts">
      Apply
    </Link>
  );
  return (
    <Container fluid className="postingsPage">
      <h1>Browse Jobs</h1>
      <div className="table-cont">
        <DataTable
          header={[
            "#",
            "Apply",
            "Organization",
            "Position",
            "Expiration Date",
            "Location",
          ]}
          data={[
            {
              Item0: "0",
              apply: apply,
              Item1: "CAE",
              Item2: "FrontEnd Intern",
              Item3: "20-02-2023",
              Item4: "Remote",
            },
            {
              Item0: "1",
              apply: apply,
              Item1: "Bombardier",
              Item2: "BackEnd Intern",
              Item3: "20-02-2023",
              Item4: "Remote",
            },
            {
              Item0: "2",
              apply: apply,
              Item1: "Deloitte",
              Item2: "Business Analyst",
              Item3: "20-02-2023",
              Item4: "Remote",
            },
            {
              Item0: "3",
              apply: apply,
              Item1: "Genetec",
              Item2: "FulStack Intern",
              Item3: "20-02-2023",
              Item4: "Remote",
            },
          ]}
        />
      </div>
    </Container>
  );
};
export default StudentPostings;
