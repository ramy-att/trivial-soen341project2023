import React from "react";
import SignIn from "../components/SignIn/SignIn";
import { Container } from "react-bootstrap";
import "./pages.css";
import OurNav from "../components/NavBar/OurNav";
import Footer from "../components/Footer/Footer";
const SignInPage = () => {
  return (
    <>
      <OurNav />
      <Container fluid>
        <div className="signIn">
          <SignIn />
        </div>
      </Container>
      <Footer/>
    </>
  );
};
export default SignInPage;
