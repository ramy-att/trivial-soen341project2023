import React from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const CreateApplication = (props) => {
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
          Apply to CAE: Front-End Intern (ID #1)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name*</Form.Label>
            <Form.Control type="email" required placeholder="Enter email" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address*</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Resume*</Form.Label>
            <Form.Control required type="file" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Cover Letter </Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Transcript</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <div className="text-center">
            <button className="submit-application">Submit</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default CreateApplication;
