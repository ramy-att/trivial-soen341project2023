import React from "react";
import Container from "react-bootstrap/esm/Container";
import "./Landing.css";
const Landing = () => {
  return (
    <Container fluid>
      <div className="home">
        <h1>Jobify</h1>
        <h2>Career Opportunities</h2>
        <button>Hello</button>
        <button>Hello</button>
        <button>Hello</button>
        <button>Hello</button>
        <p className="copyright">
            @ Copyright 2023 Ramy Attalla - Tarek Elalfi - Mario Elshaer - Khaled Saleh - Ziad Taufeek - Mazen Mohamed 
        </p>
      </div>
    </Container>
  );
};
export default Landing;
