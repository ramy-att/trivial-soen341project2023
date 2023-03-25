import React from "react";
import SignIn from "../components/SignIn/SignIn";
import { Container } from "react-bootstrap";
import "./pages.css";
import OurNav from "../components/NavBar/OurNav";
import Footer from "../components/Footer/Footer";
import { useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";

const SignInPage = () => {
  const userInfo = useContext(UserContext);
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
        <div className="signIn">
          <SignIn />
        </div>
      </Container>
      <Footer />
    </>

  );
};
export default SignInPage;