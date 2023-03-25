import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, FormControl, Button, Table } from "react-bootstrap";
import EditPosting from "./EditPosting";
import { UserContext } from "../../App";
import { Trash, Pencil } from "react-bootstrap-icons";
import DataTable from "../DataTable/DataTable";

const Posting = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [posting, setPosting] = useState({});
  const [postingApps, setPostingApps] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const userInfo = useContext(UserContext);
  const history = useHistory();
  const [application, setApplication] = useState({});

  const getStatus = async () => {
    if (userInfo) {
      const url = `http://localhost:3001/applications/stuPosting/${id}`;
      const req = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentID: userInfo.id, //STUDENT ID
        }),
      };
      try {
        const response = await fetch(url, req);
        const result = await response.json();
        setApplication(result.applications);
        if (!result.err) {
          console.log(result);
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    }
  };

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

  const applying = async () => {
    const url = `http://localhost:3001/applications`;
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentID: userInfo.id, //STUDENT ID
        postingID: id,
      }),
    };
    try {
      console.log(posting);
      const response = await fetch(url, req);
      const result = await response.json();
      if (!result.error) {
        history.push("/job-postings");
        alert(
          "Congratulations! You will now be redirected to the posting page"
        );
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  // Download file
  const fileDownloader = async (studentID, studentName, type) => {
    const url = "http://localhost:3001/file";
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: studentID, //STUDENT ID
        type: type, //type of file plural
      }),
    };
    try {
      const response = await fetch(url, req);
      if (response.status === 404) {
        // File not found
        alert("Student has not uploaded this information");
        return;
      }
      const blob = await response.blob();
      const urlObj = window.URL || window.webkitURL;
      const objectUrl = urlObj.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${studentName}_${type}.pdf`; //STUDENT FILE
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      urlObj.revokeObjectURL(objectUrl);
    } catch (error) {
      console.log("DOWNLOAD FILE FAILED");
      console.log(error);
    }
  };
  const ApplicationStatus = (props) => {
    const { currentApplication, applications } = props;
    const [value, setValue] = useState(
      applications[currentApplication].applicationStatus
    );

    const changeAppStatus = async (evt) => {
      const status = evt.target.value;
      const id = applications[currentApplication]._id;
      setValue(status);

      const url = `http://localhost:3001/applications/${id}`;
      const req = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationStatus: status,
        }),
      };
      try {
        const response = await fetch(url, req);
        const result = await response.json();
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    };

    return (
      <FormControl
        as="select"
        onChange={(evt) => changeAppStatus(evt)}
        value={value}
      >
        <option value="Pending">Pending</option>
        <option value="Reviewing">In Review</option>
        <option value="Selected">Selected For Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Accepted">Accepted</option>
      </FormControl>
    );
  };
  const getDisplayedData = (applications) => {
    const data = applications.map((application, idx) => {
      const app = {
        id: idx,
        name: application.studentName,
        email: application.studentEmail,
        resume: (
          <Button
            className="downloadButton"
            onClick={() =>
              fileDownloader(
                application.studentID,
                application.studentName,
                "resumes"
              )
            }
          >
            Download
          </Button>
        ),
        coverLetter: (
          <Button
            className="downloadButton"
            onClick={() =>
              fileDownloader(
                application.studentID,
                application.studentName,
                "coverLetters"
              )
            }
          >
            Download
          </Button>
        ),
        transcript: (
          <Button
            className="downloadButton"
            onClick={() =>
              fileDownloader(
                application.studentID,
                application.studentName,
                "transcripts"
              )
            }
          >
            Download
          </Button>
        ),
        status: (
          <ApplicationStatus
            applications={applications}
            currentApplication={idx}
          />
        ),
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
        getDisplayedData([...result.applications]);
        setPostingApps([...result.applications]);
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
    } else {
      getStatus();
    }
    // console.log(application);
  }, [userInfo]);

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
    const stuActions = () => {
      if (application.length === 0) {
        return (
          <button className="apply-posting-button" onClick={applying}>
            Apply
          </button>
        );
      } else if (application) {
        return (
          <span
            className={`applicationStatus ${application[0]?.applicationStatus}`}
          >
            {application[0]?.applicationStatus}
          </span>
        );
      }
    };
    return userInfo && userInfo.type === "student" ? (
      stuActions()
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
    <>
      {/* {showAlert && (
        <Alert variant="success">
          You have uploaded your application successfully. Goodluck!
        </Alert>
      )} */}
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
          <EditPosting showModalHandler={showModalHandler} show />
        )}
        {applications()}
      </Container>
    </>
  );
};
export default Posting;
