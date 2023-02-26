import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../DataTable/DataTable.js";
import "./Postings.css";

const EmployerPostings = () => {
  const Manage = (
    <div>
      <span>
        Delete
      </span>
      <Link to="/job-postings/0" className="Manage-to-posts">
        Edit
      </Link>
    </div>
  );
  return (
    <Container fluid className="postingsPage">
      <h1>Browse Jobs</h1>
      <div className="table-cont">
        <DataTable
          header={[
            "#",
            "Manage",
            "Position",
            "Expiration Date",
            "Location",
          ]}
          data={[
            {
              Item0: "0",
              Manage: Manage,
              Item1: "FrontEnd Intern",
              Item2: "20-02-2023",
              Item3: "Remote",
            },
            {
              Item0: "1",
              Manage: Manage,
              Item1: "BackEnd Intern",
              Item2: "20-02-2023",
              Item3: "Remote",
            },
            {
              Item0: "2",
              Manage: Manage,
              Item1: "Business Analyst",
              Item2: "20-02-2023",
              Item3: "Remote",
            },
            {
              Item0: "3",
              Manage: Manage,
              Item1: "FulStack Intern",
              Item2: "20-02-2023",
              Item3: "Remote",
            },
          ]}
        />
      </div>
    </Container>
  );
};
export default EmployerPostings;
