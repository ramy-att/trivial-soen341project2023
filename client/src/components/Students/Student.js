
import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Student.css"


export default function Student() {
    // [FORM STATES]
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState("");
    const [checks, setChecks] = useState({
      capitalLetter: false,
      lengthPassword: false,
      numbers: false,
    });
  
    function Validation(event) {
      const password = event.target.value;
      const capitalLetterCheck = /[A-Z]/.test(password);
      const numbersCheck = /[0-9]/.test(password);
      const lengthCheck = password.length > 8;
      setPassword(password);
      setChecks({
        capitalLetter: capitalLetterCheck,
        lengthPassword: lengthCheck,
        numbers: numbersCheck,
      });
    }
    function handlFileChange(event) {
      setFile(event.target.value);
    }
    function handlUsernameChange(event) {
      setUsername(event.target.value);
    }
    function handlEmailChange(event) {
      setEmail(event.target.value);
    }
    function handleSubmission(event) {
      event.preventDefault();
      if (checks.capitalLetter && checks.numbers && checks.lengthPassword) {
        setSubmitted("success");
  
      } else {
        setSubmitted("error");
      }
    }
    
    
  
    return (
      
      <div>
        {submitted === "success" ? (
          <Alert key="sucess" variant="success">
            Successfully Updated Profile!
          </Alert>
        ) : submitted === "error" ? (
          <Alert key="sucess" variant="danger">
            Errors!
          </Alert>
        ) : null}
        <Form onSubmit={handleSubmission}>
          <Form.Group className="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={handlEmailChange}
            />
          </Form.Group>
          <Form.Group
            className="username"
            // controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              required
              value={username}
              onChange={handlUsernameChange}
            />
          </Form.Group>
          <Form.Group
            className="organization"
            // controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              required
              value={file}
              onChange={handlFileChange}
            />
          </Form.Group>
          <Form.Group
            className="password"
            // controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={Validation}
            />
          </Form.Group>
          <Button className="submitButton" variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </div>
    )}
  
  