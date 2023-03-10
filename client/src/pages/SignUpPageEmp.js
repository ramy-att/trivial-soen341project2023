import React from "react";
import SignUp from "../components/SignUp/SignUp";
import { Container } from "react-bootstrap";
import "./pages.css";
import OurNav from "../components/NavBar/OurNav";
import Footer from "../components/Footer/Footer";

const SignUpPageEmp = () => {
  return (
    <>
    <OurNav/>
    <Container fluid>
      <div className="signUp">
        <SignUp typeSignUp="employer" />
      </div>
    </Container>
    <Footer/>
    </>
  );
};
export default SignUpPageEmp;
