import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { UserContext } from "../../App.js";

const ManagePosting = (props) => {
  const { showModalHandler, data } = props;
  const [location, setLocation] = useState("Remote");
  const [expirationDate, setExpirationDate] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");

  const userInfo = useContext(UserContext).userInfo;

  const editing = data ? true : false;
  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

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

  return (
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
        <Form onSubmit={addPosting}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Position*</Form.Label>
            <Form.Control
              value={position}
              placeholder="Intern"
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Description*</Form.Label>
            <Form.Control
              value={description}
              placeholder="Bring cupcakes to the office."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
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
              onChange={(e) => {
                console.log(e.target.value);
                setLocation(e.target.value);
              }}
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
  );
};
export default ManagePosting;
