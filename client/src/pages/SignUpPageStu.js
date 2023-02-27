import React from "react";
import SignUp from "../components/SignUp/SignUp";
import { Container } from "react-bootstrap";
import "./pages.css";

const SignUpPageStu = () => {
  return (
    <Container fluid >
      <div className="signUp">
        <SignUp typeSignUp="student" />
      </div>
    </Container>
  );
};
export default SignUpPageStu;
