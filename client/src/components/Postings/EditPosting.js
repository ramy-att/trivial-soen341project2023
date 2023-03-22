import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { UserContext } from "../../App.js";
import { useHistory, useParams } from "react-router-dom";

const ManagePosting = (props) => {
  const { showModalHandler, data } = props;
  const [location, setLocation] = useState();
  const [expirationDate, setExpirationDate] = useState("");
  const [description, setDescription] = useState("");
  const [posting, setPosting] = useState({});
  const [position, setPosition] = useState();
  const [edit, setEdit] = useState("");
  const userInfo = useContext(UserContext);
  const { id } = useParams();

  const editing = data ? true : false;
  // useEffect(() => {
  //   console.log(location);
  // }, [location]);
  useEffect(() => {
    getPostings();
  }, []);
  function handlPositionChange(event) {
    setPosition(event.target.value);
  }
  function handlDescriptionChange(event) {
    setDescription(event.target.value);
  }
  function handlLocationChange(event) {
    setLocation(event.target.value);
  }

  const addPosting = async (e) => {
    e.preventDefault();

    const url = `http://localhost:3001/postings`;
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // do we need the employer id and organization name ?? check the lines for employerid adn organ name
        employerID: userInfo.id,
        organizationName: userInfo.organizationName,
        description: description,
        title: position,
        expirationDate: expirationDate,
        location: location,
      }),
    };
    try {
      const response = await fetch(url, req);
      const result = await response.json();
      // if (!result.err) {
      // getData([...result.postings]);
      // setPostings([...result.postings]);
      // }
    } catch (error) {
      if (error) {
        console.log(error);
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
        setDescription(result.posting.description);
        setLocation(result.posting.location);
        setPosition(result.posting.title);
        setExpirationDate(result.posting.expirationDate);
        console.log("Hellooo");
        console.log(result);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const editPosting = async () => {
    const url = `http://localhost:3001/postings/${id}`;
    const req = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employerID: userInfo.id,
        organizationName: userInfo.organizationName,
        description: description,
        title: position,
        expirationDate: expirationDate,
        location: location,
      }),
    };
    try {
      const response = await fetch(url, req);
      const result = await response.json();
      if (!result.err) {
        // history.push("/job-postings");
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    //whatever below is for the edit postings
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={showModalHandler}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {editing ? "Edit: Front-End Intern (ID #1)" : "Create Posting"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={editPosting}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Position*</Form.Label>
            <Form.Control
              value={position}
              onChange={handlPositionChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Description*</Form.Label>
            <Form.Control
              value={description}
              placeholder="Bring cupcakes to the office."
              onChange={handlDescriptionChange}
              as="textarea"
              rows={4}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Expiration Date*</Form.Label>
            <Form.Control
              value={expirationDate}
              onChange={(e) => {
                setExpirationDate(e.target.value);
              }}
              type="date"
              required
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Location*</Form.Label>
            <Form.Control
              as="select"
              required
              value={location}
              onChange={handlLocationChange}
            >
              {/* Whenever u change the value from 0,1,2,3 to the actual names it gives us errors */}
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="In-Person">In-Person</option>
              <option value="custom">Custom</option>
            </Form.Control>
          </Form.Group>
          {location === "custom" && (
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Location*</Form.Label>
              <Form.Control required placeholder="Montreal" />
            </Form.Group>
          )}
          <div className="text-center">
            <button className="submit-application">Submit</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>

    // this is the one for creating new post so we don't lose it
    // <Modal
    // {...props}
    // size="lg"
    // aria-labelledby="contained-modal-title-vcenter"
    // centered
    // onHide={showModalHandler}
    // >
    // <Modal.Header closeButton>
    //   <Modal.Title id="contained-modal-title-vcenter">
    //     {editing ? "Edit: Front-End Intern (ID #1)" : "Create Posting"}
    //   </Modal.Title>
    // </Modal.Header>
    // <Modal.Body>
    //   <Form onSubmit={addPosting}>
    //     <Form.Group controlId="formFile" className="mb-3">
    //       <Form.Label>Position*</Form.Label>
    //       <Form.Control
    //         value={position}
    //         placeholder="Intern"
    //         onChange={(e) => {
    //           setPosition(e.target.value);
    //         }}
    //         required
    //       />
    //     </Form.Group>
    //     <Form.Group controlId="formFile" className="mb-3">
    //       <Form.Label>Description*</Form.Label>
    //       <Form.Control
    //         value={description}
    //         placeholder="Bring cupcakes to the office."
    //         onChange={(e) => {
    //           setDescription(e.target.value);
    //         }}
    //         as="textarea"
    //         rows={4}
    //       />
    //     </Form.Group>
    //     <Form.Group controlId="formFile" className="mb-3">
    //       <Form.Label>Expiration Date*</Form.Label>
    //       <Form.Control
    //         value={expirationDate}
    //         onChange={(e) => {
    //           setExpirationDate(e.target.value);
    //         }}
    //         type="date"
    //         required
    //       />
    //     </Form.Group>
    //     <Form.Group controlId="formFile" className="mb-3">
    //       <Form.Label>Location*</Form.Label>
    //       <Form.Control
    //         as="select"
    //         required
    //         value={location}
    //         onChange={(e) => {
    //           console.log(e.target.value);
    //           setLocation(e.target.value);
    //         }}
    //       >
    //         {/* Whenever u change the value from 0,1,2,3 to the actual names it gives us errors */}
    //         <option value="Remote">Remote</option>
    //         <option value="Hybrid">Hybrid</option>
    //         <option value="In-Person">In-Person</option>
    //         <option value="custom">Custom</option>
    //       </Form.Control>
    //     </Form.Group>
    //     {location === "custom" && (
    //       <Form.Group controlId="formFile" className="mb-3">
    //         <Form.Label>Location*</Form.Label>
    //         <Form.Control required placeholder="Montreal" />
    //       </Form.Group>
    //     )}
    //     <div className="text-center">
    //       <button className="submit-application">Submit</button>
    //     </div>
    //   </Form>
    // </Modal.Body>
    // </Modal>
  );
};
export default ManagePosting;
