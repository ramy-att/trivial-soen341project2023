import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Employer.css";

export default function EditPage(props) {
  const { type = "student" | "employer" } = props;

  // [FORM STATES]
  const [organization, setOrganiztation] = useState("");
  const [files, setFiles] = useState({ resume: null });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    verifyUser();
  }, []);

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
      if (result.user.type == "student") {
        setUsername(result.user.name);
        setEmail(result.user.email);
        setId(result.user.id);
      }
      if (result.user.type == "employer") {
        setUsername(result.user.name);
        setEmail(result.user.email);
        setId(result.user.id);
        setOrganiztation(result.user.organizationName);
      }
      setOrganiztation(result.user.organizationName);
      return result;
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
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const reSignin = async () => {
    const url = "http://localhost:3001/signin";
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    try {
      const response = await fetch(url, req);
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
      } else {
      }
    } catch (error) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "student") {
      const url = `http://localhost:3001/students/${id}`;

      const formData = new FormData(); // create form-data object

      // Student data
      files.resume && formData.append("resume", files.resume);
      files.coverLetter && formData.append("coverLetter", files.coverLetter);
      files.transcript && formData.append("transcript", files.transcript);
      password && formData.append("studentPassword", password);
      email && formData.append("studentEmail", email);
      username && formData.append("studentName", username);

      const req = {
        method: "PATCH",
        body: formData,
      };
      try {
        const response = await fetch(url, req);
        const result = await response.json();
        localStorage.removeItem("token");

        if (result.err) {
          setSubmitted("error");
        } else {
          reSignin();
          verifyUser();
          setSubmitted("success");
        }
        setTimeout(() => {
          setSubmitted("");
        }, 5000);
      } catch (error) {}
    }
    if (type === "employer") {
      const url = `http://localhost:3001/employers/${id}`;
      const req = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employerName: username,
          employerEmail: email,
          employerPassword: password,
          organizationName: organization,
        }),
      };
      try {
        const response = await fetch(url, req);
        const result = await response.json();
        localStorage.removeItem("token");

        if (result.err) {
          setSubmitted("error");
        } else {
          reSignin();
          verifyUser();
          setSubmitted("success");
        }
        setTimeout(() => {
          setSubmitted("");
        }, 5000);
      } catch (error) {}
    }
  };

  const handleResumeUpload = async (event) => {
    const resumeFile = event.target.files[0];
    setFiles({ ...files, resume: resumeFile });
  };
  const handleTranscriptUpload = async (event) => {
    const transcriptFile = event.target.files[0];
    setFiles({ ...files, transcript: transcriptFile });
  };
  const handleClUpload = async (event) => {
    const coverFile = event.target.files[0];
    setFiles({ ...files, coverLetter: coverFile });
  };
  return (
    <div className="editPage">
      <div className="alertContainer">
        {submitted === "success" ? (
          <Alert key="success" variant="success">
            You have updated your information successfully!!
          </Alert>
        ) : submitted === "error" ? (
          <Alert key="error" variant="danger">
            There has been an error with your update. Please try again
          </Alert>
        ) : null}
      </div>
      <div className="editTitleContainer">
        <h1> Edit Your Profile!</h1>
      </div>
      <div className="formContainer">
        {type === "employer" ? (
          <Form onSubmit={handleSubmit} className="editProfile">
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
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <div className="text-center">
              <Button className="submitButton" variant="primary" type="submit">
                Edit
              </Button>
            </div>
          </Form>
        ) : type === "student" ? (
          <Form onSubmit={handleSubmit} className="editProfile">
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
              className="resume"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Resume</Form.Label>
              <Form.Control type="file" onChange={handleResumeUpload} />
            </Form.Group>
            <Form.Group
              className="transcription"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Transcipt</Form.Label>
              <Form.Control type="file" onChange={handleTranscriptUpload} />
            </Form.Group>
            <Form.Group
              className="transcription"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control type="file" onChange={handleClUpload} />
            </Form.Group>
            <Form.Group className="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
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
                onChange={handlePasswordChange}
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
