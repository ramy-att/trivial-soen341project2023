import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../DataTable/DataTable.js";
import "./Postings.css";
import { useEffect, useState } from "react";

const StudentPostings = () => {
  const [postings, setPostings] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  const getData = (postings) => {
    const data = postings.map((posting, idx) => {
      const post = {
        ID: idx,
        apply: (
          <Link to={`/job-postings/${posting._id}`} className="apply-to-posts">
            Apply
          </Link>
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
    const url = "http://localhost:3001/postings";
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
        getData([...result.posting]);
        setPostings([...result.posting]);
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
          data={postings}
          displayedData={displayedData}
        />
      </div>
    </Container>
  );
};
export default StudentPostings;
