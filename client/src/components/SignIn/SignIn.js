import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import e from "express";
const SignIn = () => {
  const [
    name,
    setName,
    email,
    setEmail,
    showSignUpButtons,
    setShowSignUpButtons,
  ] = useState(false);
  const [password, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //That so we don't lose our state
    console.log(email);
  };
  return (
    <div className="form_login">
      <form>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="Name"
            placeholder="Full Name"
            id="Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            id="email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
          />
        </Form.Group>
      </form>
    </div>
  );
};

export default SignIn;
