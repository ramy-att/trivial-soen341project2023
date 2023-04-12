import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";

const EditPosting = (props) => {
  const { showmodalhandler, editposting } = props;
  const [location, setLocation] = useState();
  const [cusLocation, setCusLocation] = useState();
  const [expirationDate, setExpirationDate] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState();

  const { id } = useParams();
  const userInfo = useContext(UserContext).userInfo;

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
  function handlCusLocationChange(event) {
    setCusLocation(event.target.value);
    setLocation(cusLocation);
  }

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
        setDescription(result.posting.description);
        setLocation(result.posting.location);
        setPosition(result.posting.title);
        setExpirationDate(result.posting.expirationDate);
      }
    } catch (error) {}
  };
  const updatePosting = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/postings/${id}`;
    const req = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // no need for them to be sent keep them in case we need to change that later.
        // employerID: userInfo.id,
        // organizationName: userInfo.organizationName,
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
        showmodalhandler();
        editposting({
          organizationName: userInfo.organizationName,
          employerID: userInfo.id,
          _id: id,
          description: description,
          title: position,
          expirationDate: expirationDate,
          location: location,
        });
      }
    } catch (error) {
      if (error) {
      }
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={showmodalhandler}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Posting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updatePosting}>
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
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="In-Person">In-Person</option>
              <option value="custom">Custom</option>
            </Form.Control>
          </Form.Group>
          {location === "custom" && (
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Location*</Form.Label>
              <Form.Control
                required
                placeholder="Montreal"
                value={cusLocation}
                onChange={handlCusLocationChange}
              />
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
export default EditPosting;
