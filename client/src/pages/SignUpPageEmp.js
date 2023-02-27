import React from "react";
import SignUp from "../components/SignUp/SignUp";
import { Container } from "react-bootstrap";
import "./pages.css";

const SignUpPageEmp = () => {
  return (
    <Container fluid>
      <div className="signUp">
        <SignUp typeSignUp="employer" />
      </div>
    </Container>
  );
};
export default SignUpPageEmp;
