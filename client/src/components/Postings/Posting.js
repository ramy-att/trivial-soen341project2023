import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import EditPosting from "./EditPosting";
import { UserContext } from "../../App";
import { Trash, Pencil } from "react-bootstrap-icons";
import CreateApplication from "./CreateApplication";
import DataTable from "../DataTable/DataTable";

const Posting = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [posting, setPosting] = useState({});
  const [postingApps, setPostingApps] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const userInfo = useContext(UserContext);
  const history = useHistory();

  const getPostings = async () => {
    const url = `http://localhost:3001/postings/${id}`;
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
        setPosting(result.posting);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const getDisplayedData = (applications) => {
    const data = applications.map((application, idx) => {
      const app = {
        id: idx,
        name: application.studentName,
        email: application.studentEmail,
        resume: <button>Resume</button>,
        coverLetter: <button>Resume</button>,
        transcript: <button>Transcript</button>,
        status: application.applicationStatus,
      };
      return app;
    });
    setDisplayedData(data);
  };
  const getApplications = async () => {
    const url = `http://localhost:3001/applications/posting/${id}`;
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
        getDisplayedData(result.applications);
        setPostingApps(result.applications);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getPostings();
    if (userInfo && userInfo.type == "employer") {
      getApplications();
    }
  }, [userInfo]);

  const downloadFile = async (filename) => {
    const url = `/api/download/${filename}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const urlObj = window.URL || window.webkitURL;
    const objectUrl = urlObj.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    urlObj.revokeObjectURL(objectUrl);
  };
  //downloads file
  const fileDownloader = async (event) => {
    event.preventDefault();

    const url = "http://localhost:3001/file";
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: "640bed07ba4b4ab648528f29", //STUDENT ID
        type: "coverLetters", //type of file plural
      }),
    };
    try {
      const response = await fetch(url, req);
      const blob = await response.blob();
      const urlObj = window.URL || window.webkitURL;
      const objectUrl = urlObj.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "Mazen-Mohamed.pdf"; //STUDENT NAME
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      urlObj.revokeObjectURL(objectUrl);
      //console.log(response);
    } catch (error) {
      console.log("DOWNLOAD FILE FAILED");
      console.log(error);
    }
  };
  // ADD STATE: USER type
  const showModalHandler = () => {
    setShowModal((prev) => !prev);
  };
  const applications = () => {
    if (userInfo && userInfo.type === "employer") {
      return (
        <>
          <h3>Applications</h3>
          <DataTable
            header={[
              "#",
              "Name",
              "email",
              "Resume",
              "CV",
              "Transcsript",
              "Status",
            ]}
            pageWidth="100%"
            displayedData={displayedData}
            data={postingApps}
          />
        </>
      );
    }
  };
  const deletePosting = async () => {
    const url = `http://localhost:3001/postings/${id}`;
    const req = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employerID: userInfo.id,
      }),
    };
    try {
      const response = await fetch(url, req);
      const result = await response.json();
      if (!result.err) {
        history.push("/job-postings");
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const actions = () => {
    {
      /* Button will only appear for student, will replace with "check applciation" if already applied" */
    }
    return userInfo && userInfo.type === "student" ? (
      <button
        className="apply-posting-button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Apply
      </button>
    ) : userInfo && userInfo.type === "employer" ? (
      <div className="employer-actions">
        <Pencil
          className="edit-icon"
          size={30}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Edit
        </Pencil>
        <Trash
          className="delete-icon"
          size={30}
          onClick={() => deletePosting()}
        >
          Delete
        </Trash>
      </div>
    ) : null;
  };
  return (
    <Container fluid className="postings-page">
      <div className="title-container">
        <h1>
          {" "}
          {posting.organizationName}: {posting.title}
        </h1>
        {actions()}
      </div>
      <div className="description-container">
        <div className="job-description">
          <h3>Job Description: </h3>
          {posting.description}
        </div>
      </div>
      <div>
        <h3>Position Information</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Data</th>
              <th>#{id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Organization</td>
              <td>{posting.organizationName}</td>
            </tr>
            <tr>
              <td>Position</td>
              <td>{posting.title}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{posting.location}</td>
            </tr>
            <tr>
              <td>Deadline</td>
              <td>{posting.expirationDate}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      {showModal && userInfo && userInfo.type === "employer" && (
        <EditPosting showModalHandler={showModalHandler} show /> // since inside posting u only edit so pass editiing instead of manage posting
      )}
      {showModal && userInfo && userInfo.type === "student" && (
        <CreateApplication showModalHandler={showModalHandler} show />
      )}
      {applications()}
    </Container>
  );
};
export default Posting;
