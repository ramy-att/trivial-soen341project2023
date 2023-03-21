import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../DataTable/DataTable.js";
import { PlusCircle, Trash, Pencil } from "react-bootstrap-icons";
import ManagePosting from "./ManagePosting.js";
import "./Postings.css";
import { UserContext } from "../../App.js";

const EmployerPostings = () => {
  const [showModal, setShowModal] = useState(false);
  const [postings, setPostings] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  const userInfo = useContext(UserContext);

  const getData = (postings) => {
    const data = postings.map((posting, idx) => {
      const post = {
        ID: idx,
        manage: (
          <div className="manageCell">
            <Trash size={20} className="delete-icon" />
            <Link
              to={`/job-postings/${posting._id}`}
              className="Manage-to-posts"
            >
              <Pencil size={20} className="edit-icon" />
            </Link>
          </div>
        ),
        organizationName: posting.organizationName,
        title: posting.title,
        expirationDate: posting.expirationDate,
        location: posting.location,
      };
      return post;
    });
    setDisplayedData([...data]);
  };
  const getPostings = async () => {
    const url = `http://localhost:3001/postings/employer/${userInfo.id}`;
    const req = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, req);
      const result = await response.json();
      if (!result.err) {
        getData([...result.postings]);
        setPostings([...result.postings]);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getPostings();
  }, []);

  const showModalHandler = () => {
    setShowModal(false);
  };
  return (
    <Container fluid className="postingsPage">
      <h1>Browse Jobs</h1>
      <div className="table-cont">
        <DataTable
          header={["#", "Manage", "Position", "Expiration Date", "Location"]}
          data={postings}
          displayedData={displayedData}
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
