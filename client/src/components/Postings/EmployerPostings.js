import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../DataTable/DataTable.js";
import { PlusCircle, Trash, Pencil } from "react-bootstrap-icons";
import ManagePosting from "./ManagePosting.js";
import "./Postings.css";

const EmployerPostings = () => {
  const [showModal, setShowModal] = useState(false);
  console.log("EmployerPostings");
  const Manage = (
    <div className="manageCell">
      <Trash size={20} className="delete-icon" />
      <Link to="/job-postings/0" className="Manage-to-posts">
        <Pencil size={20} className="edit-icon" />
      </Link>
    </div>
  );
  const showModalHandler = () => {
    setShowModal(false);
  };
  return (
    <Container fluid className="postingsPage">
      <h1>Browse Jobs</h1>
      <div className="table-cont">
        <DataTable
          header={["#", "Manage", "Position", "Expiration Date", "Location"]}
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
              Item1: "FullStack Intern",
              Item2: "20-02-2023",
              Item3: "Remote",
            },
          ]}
        />
        <div className="add-more-container">
          <PlusCircle
            size={30}
            onClick={() => {
              setShowModal(true);
            }}
            className="add-more-icon"
          />
        </div>
        {showModal && (
          <ManagePosting showModalHandler={showModalHandler} show />
        )}
      </div>
    </Container>
  );
};
export default EmployerPostings;
