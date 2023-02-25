import React from "react";
import SignUp from "../components/SignUp/SignUp";
import { Container } from "react-bootstrap";
import "./pages.css";

const SignUpPage = () => {
  return (
    <Container fluid className="">
      <div className="signUp">
        <SignUp type="employer" />
      </div>
    </Container>
  );
};
export default SignUpPage;
