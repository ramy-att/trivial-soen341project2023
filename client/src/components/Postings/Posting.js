import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, FormControl, SelectOption, Table } from "react-bootstrap";
import ManagePosting from "./ManagePosting";
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
        <option value="In Review">In Review</option>
        <option value="Selected For Interview">Selected For Interview</option>
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
        resume: <button>Resume</button>,
        coverLetter: <button>Resume</button>,
        transcript: <button>Transcript</button>,
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
          alert("Assume you applied");
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
        <h1>CAE: Front-End Intern (ID: #{id})</h1>
        {actions()}
      </div>
      <div className="description-container">
        <div className="job-description">
          <h3>Job Description: </h3>
          {posting.description}

          {/* REMEBER TO DELETE THE COMMENETED OUT CODE AFTER IT'S NOT NEEDED */}

          {/* <p> */}
          {/* Aliqua magna pariatur eu anim sunt dolore anim in laboris nulla aute */}
          {/* pariatur id ea. Qui incididunt reprehenderit voluptate qui sint */}
          {/* laborum esse et mollit laborum veniam. Et enim reprehenderit ad do */}
          {/* sint. Sit aliqua velit ipsum ex sit.Qui pariatur aute sit dolor */}
          {/* aute. Excepteur ut incididunt et ad nulla amet ad sunt irure. Qui */}
          {/* officia enim labore quis proident et Lorem irure consequat proident */}
          {/* sint enim mollit. Incididunt excepteur laboris sint consectetur */}
          {/* aliqua sunt labore enim aute mollit irure dolore. Consectetur */}
          {/* laboris officia proident anim enim Lorem est aute occaecat veniam */}
          {/* qui. Aute aute qui voluptate anim Lorem duis. Culpa ullamco enim */}
          {/* anim aute adipisicing aliqua qui do nisi do nisi reprehenderit do. */}
          {/* Anim ad adipisicing sunt aute tempor mollit aute consequat sit */}
          {/* laboris laboris pariatur. Cupidatat pariatur officia velit nostrud */}
          {/* eu consectetur. Sint anim ad aute eiusmod magna. Veniam aute magna */}
          {/* nulla in est exercitation fugiat incididunt do sit ipsum Lorem. Ea */}
          {/* qui commodo non occaecat et tempor magna exercitation id et. Anim */}
          {/* culpa est eu ut in velit est cillum elit laborum dolor. Excepteur ut */}
          {/* ex do ea reprehenderit elit id voluptate eu. */}
          {/* </p> */}
          {/* <p> */}
          {/* Aliqua magna pariatur eu anim sunt dolore anim in laboris nulla aute */}
          {/* pariatur id ea. Qui incididunt reprehenderit voluptate qui sint */}
          {/* laborum esse et mollit laborum veniam. Et enim reprehenderit ad do */}
          {/* sint. Sit aliqua velit ipsum ex sit.Qui pariatur aute sit dolor */}
          {/* aute. Excepteur ut incididunt et ad nulla amet ad sunt irure. Qui */}
          {/* officia enim labore quis proident et Lorem irure consequat proident */}
          {/* sint enim mollit. Incididunt excepteur laboris sint consectetur */}
          {/* aliqua sunt labore enim aute mollit irure dolore. Consectetur */}
          {/* laboris officia proident anim enim Lorem est aute occaecat veniam */}
          {/* qui. Aute aute qui voluptate anim Lorem duis. Culpa ullamco enim */}
          {/* anim aute adipisicing aliqua qui do nisi do nisi reprehenderit do. */}
          {/* Anim ad adipisicing sunt aute tempor mollit aute consequat sit */}
          {/* laboris laboris pariatur. Cupidatat pariatur officia velit nostrud */}
          {/* eu consectetur. Sint anim ad aute eiusmod magna. Veniam aute magna */}
          {/* nulla in est exercitation fugiat incididunt do sit ipsum Lorem. Ea */}
          {/* qui commodo non occaecat et tempor magna exercitation id et. Anim */}
          {/* culpa est eu ut in velit est cillum elit laborum dolor. Excepteur ut */}
          {/* ex do ea reprehenderit elit id voluptate eu. */}
          {/* </p> */}
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
        <ManagePosting showModalHandler={showModalHandler} show />
      )}
      {applications()}
    </Container>
  );
};
export default Posting;
