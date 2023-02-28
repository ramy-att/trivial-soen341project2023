import React from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "../Buttons/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const [showSignUpButtons, setShowSignUpButtons] = useState(false);

  return (
    <Container fluid>
      <div className="home">
        <h1 className="title">Jobify</h1>
        <h2 className="subTitle">Career Opportunities</h2>
        <div className="buttons">
          <Link to="/SignIn" className="Link">
            <Button type="authen">Sign In</Button>
          </Link>
          <Button
            type="authen"
            onClick={() => setShowSignUpButtons(!showSignUpButtons)}
          >
            Sign Up
          </Button>
        </div>
        {showSignUpButtons && (
          <div className="buttons">
            <Link to="/signup-emp" className="Link">
              <Button type="authen">Employer</Button>
            </Link>
            <Link to="/signup-stu" className="Link">
              <Button type="authen">Student</Button>
            </Link>
          </div>
        )}
        <p className="copyright">
          @ Copyright 2023 Ramy Attalla - Tarek Elalfi - Mario Elshaer - Khaled
          Saleh - Ziad Taufeek - Mazen Mohamed
        </p>
      </div>
    </Container>
  );
};
export default Landing;
