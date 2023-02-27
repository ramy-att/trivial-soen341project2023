import React from "react";
import SignIn from "../components/SignIn/SignIn";
import { Container } from "react-bootstrap";
import "./pages.css";
const SignInPage = () => {
  return (
    <Container fluid>
      <div className="signIn">
        <SignIn />
      </div>
    </Container>
  );
};
export default SignInPage;
