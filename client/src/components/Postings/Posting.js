import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import ManagePosting from "./ManagePosting";
import { UserContext } from "../../App";
import { Trash, Pencil } from "react-bootstrap-icons";
import CreateApplication from "./CreateApplication";
import DataTable from "../DataTable/DataTable";

const Posting = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const userInfo = useContext(UserContext);

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
  }
  //downloads file
  const fileDownloader = async (event) =>{
    event.preventDefault();
    
    const url = "http://localhost:3001/file";
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: '640bed07ba4b4ab648528f29', //STUDENT ID
        type:'coverLetters' //type of file plural
      }),
    };
    try {
      const response = await fetch(url, req);
      const blob = await response.blob();
      const urlObj = window.URL || window.webkitURL;
      const objectUrl = urlObj.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = 'Mazen-Mohamed.pdf'; //STUDENT NAME
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
            data={[
              {
                Item0: "0",
                Item1: "Aiman Hanna",
                Item2: "aiman@hanna.com",
                Item3: <form onSubmit={fileDownloader}> <input type="submit" value="Transcript"/></form>,
                Item4: "",
                Item5: "",
                Item6: "Rejected",
              },
              {
                Item0: "1",
                Item1: "Aiman Hanna",
                Item2: "aiman@hanna.com",
                Item3: "",
                Item4: "",
                Item5: "",
                Item6: "Rejected",
              },
              {
                Item0: "2",
                Item1: "Aiman Hanna",
                Item2: "aiman@hanna.com",
                Item3: "",
                Item4: "",
                Item5: "",
                Item6: "Rejected",
              },
              {
                Item0: "3",
                Item1: "Aiman Hanna",
                Item2: "aiman@hanna.com",
                Item3: "",
                Item4: "",
                Item5: "",
                Item6: "Rejected",
              },
            ]}
          />
        </>
      );
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
        <Trash className="delete-icon" size={30}>
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
          <p>
            Aliqua magna pariatur eu anim sunt dolore anim in laboris nulla aute
            pariatur id ea. Qui incididunt reprehenderit voluptate qui sint
            laborum esse et mollit laborum veniam. Et enim reprehenderit ad do
            sint. Sit aliqua velit ipsum ex sit.Qui pariatur aute sit dolor
            aute. Excepteur ut incididunt et ad nulla amet ad sunt irure. Qui
            officia enim labore quis proident et Lorem irure consequat proident
            sint enim mollit. Incididunt excepteur laboris sint consectetur
            aliqua sunt labore enim aute mollit irure dolore. Consectetur
            laboris officia proident anim enim Lorem est aute occaecat veniam
            qui. Aute aute qui voluptate anim Lorem duis. Culpa ullamco enim
            anim aute adipisicing aliqua qui do nisi do nisi reprehenderit do.
            Anim ad adipisicing sunt aute tempor mollit aute consequat sit
            laboris laboris pariatur. Cupidatat pariatur officia velit nostrud
            eu consectetur. Sint anim ad aute eiusmod magna. Veniam aute magna
            nulla in est exercitation fugiat incididunt do sit ipsum Lorem. Ea
            qui commodo non occaecat et tempor magna exercitation id et. Anim
            culpa est eu ut in velit est cillum elit laborum dolor. Excepteur ut
            ex do ea reprehenderit elit id voluptate eu.
          </p>
          <p>
            Aliqua magna pariatur eu anim sunt dolore anim in laboris nulla aute
            pariatur id ea. Qui incididunt reprehenderit voluptate qui sint
            laborum esse et mollit laborum veniam. Et enim reprehenderit ad do
            sint. Sit aliqua velit ipsum ex sit.Qui pariatur aute sit dolor
            aute. Excepteur ut incididunt et ad nulla amet ad sunt irure. Qui
            officia enim labore quis proident et Lorem irure consequat proident
            sint enim mollit. Incididunt excepteur laboris sint consectetur
            aliqua sunt labore enim aute mollit irure dolore. Consectetur
            laboris officia proident anim enim Lorem est aute occaecat veniam
            qui. Aute aute qui voluptate anim Lorem duis. Culpa ullamco enim
            anim aute adipisicing aliqua qui do nisi do nisi reprehenderit do.
            Anim ad adipisicing sunt aute tempor mollit aute consequat sit
            laboris laboris pariatur. Cupidatat pariatur officia velit nostrud
            eu consectetur. Sint anim ad aute eiusmod magna. Veniam aute magna
            nulla in est exercitation fugiat incididunt do sit ipsum Lorem. Ea
            qui commodo non occaecat et tempor magna exercitation id et. Anim
            culpa est eu ut in velit est cillum elit laborum dolor. Excepteur ut
            ex do ea reprehenderit elit id voluptate eu.
          </p>
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
              <td>CAE</td>
            </tr>
            <tr>
              <td>Position</td>
              <td>Front-End Intern</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>Remote</td>
            </tr>
            <tr>
              <td>Deadline</td>
              <td>20-02-2023</td>
            </tr>
          </tbody>
        </Table>
      </div>
      {showModal && userInfo && userInfo.type === "employer" && (
        <ManagePosting showModalHandler={showModalHandler} show />
      )}
      {showModal && userInfo && userInfo.type === "student" && (
        <CreateApplication showModalHandler={showModalHandler} show />
      )}
      {applications()}
    </Container>
  );
};
export default Posting;
