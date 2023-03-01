import React, { useState , useEffect} from "react";
import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Employer.css";
import "./server/model/student"

export default function EditPage(props) {
  const { type = "student" | "employer" } = props;
  // [FORM STATES]
  const [organization, setOrganiztation] = useState("");
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [checks, setChecks] = useState({
    capitalLetter: false,
    lengthPassword: false,
    numbers: false,
  });


  const [transcription , setTranscription] = useState("");

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

  const verifyUser = async () => {
    const url2 = "http://localhost:3001/signin";
    const verifyReq = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch(url2, verifyReq);
      const result = await response.json();
      return { ...result };
    } catch (error) {}
  };



  function handlOrganizationChange(event) {
    setOrganiztation(event.target.value);
  }
  function handlUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlEmailChange(event) {
    setEmail(event.target.value);
  }
function   handlTranscritionChange(event) {
  setTranscription(event.target.value)
}
  function handleSubmission(event) {
    event.preventDefault();
    // Should get the return from backend
    if (checks.capitalLetter && checks.numbers && checks.lengthPassword) {
      setSubmitted("success");
    } else {
      setSubmitted("error");
    }
    // Clear the alert after 5 seconds
    setTimeout(() => {
      setSubmitted("");
    }, 5000);
  }
  function handlFileChange(event) {
    setFile(event.target.value);
  }


  return (
    <div className="editPage">
      <div className="alertContainer">
        {submitted === "success" ? (
          <Alert key="success" variant="success">
            Submission Success
          </Alert>
        ) : submitted === "error" ? (
          <Alert key="error" variant="danger">
            Error
          </Alert>
        ) : null}
      </div>
      <div className="editTitleContainer">
        <h1> Edit Your Profile!</h1>
      </div>
      <div className="formContainer">
        {type === "employer" ? (
          <Form onSubmit={handleSubmission} className="editProfile">
            <Form.Group
              className="username"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={username}
                onChange={handlUsernameChange}
              />
            </Form.Group>
            <Form.Group
              className="organization"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="SWE Inc."
                required
                value={organization}
                onChange={handlOrganizationChange}
              />
            </Form.Group>
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
              className="password"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={Validation}
              />
            </Form.Group>
            <div className="text-center">
              <Button className="submitButton" variant="primary" type="submit">
                Edit
              </Button>
            </div>
          </Form>
        ) : type === "student" ? (
          <Form onSubmit={handleSubmission} className="editProfile">
            <Form.Group
              className="username"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user.name}

                required
                value={username}
                onChange={handlUsernameChange}
              />
            </Form.Group>
            <Form.Group
              className="resume"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Resume</Form.Label>
              <Form.Control
                type="file"
                value={file}
                onChange={handlFileChange}
              />
            </Form.Group> 
            <Form.Group
              className="transcription"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>transcription</Form.Label>
              <Form.Control
                type="file"
                value={file}
                onChange={handlTranscritionChange}
              />
            </Form.Group>
            <Form.Group className="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                defaultValue={user.email}
                value={email}
                onChange={handlEmailChange}
              />
            </Form.Group>
            <Form.Group
              className="password"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={Validation}
              />
            </Form.Group>
            <div className="text-center">
              <Button className="submitButton" variant="primary" type="submit">
                Edit
              </Button>
            </div>
          </Form>
        ) : null}
      </div>
    </div>
  );
}
