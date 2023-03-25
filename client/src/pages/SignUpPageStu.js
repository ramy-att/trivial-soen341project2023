import React from "react";
import SignUp from "../components/SignUp/SignUp";
import { Container } from "react-bootstrap";
import "./pages.css";
import OurNav from "../components/NavBar/OurNav";
import Footer from "../components/Footer/Footer";
import { useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
const SignUpPageStu = () => {
  const userInfo = useContext(UserContext).userInfo;
  const history = useHistory();

  useEffect(() => {
    if (userInfo !== "nonAuth") {
      history.push("/job-postings");
    }
  }, []);
  return (
    <>
      <OurNav />
      <Container fluid>
        <div className="signUp">
          <SignUp typeSignUp="student" />
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default SignUpPageStu;
