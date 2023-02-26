import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const ManagePosting = (props) => {
  const { editing, data } = props;
  const [location, setLocation] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(location);
    console.log(position);
    console.log(description);
    console.log(expirationDate);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.showModalHandler}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {editing ? "Edit: Front-End Intern (ID #1)" : "Create Posting"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Position*</Form.Label>
            <Form.Control
              value={position}
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
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="0">Remote</option>
              <option value="1">Hybrid</option>
              <option value="2">In-Person</option>
              <option value="3">Custom</option>
            </Form.Control>
          </Form.Group>
          {location === "3" && (
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Location*</Form.Label>
              <Form.Control required />
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
