import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./OurNav.css";

const OurNav = (props) => {
  const { type = "student" } = props;
  return (
    <Navbar collapseOnSelect expand="sm" className="ourNav">
      <Container fluid className="cont">
        <Link className="logo" href="#home">Jobify</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {type == "student" ? (
            <Nav className="me-auto navLeft">
              <Link href="#features">Postings</Link>
              <Link href="#features">Applications</Link>
              <Link href="#features">Profile</Link>
            </Nav>
          ) : (
            <h1>hello</h1>
          )}
          <Nav className="navRight">
            <Link eventKey={2} href="#memes" className="signInOut">
             Sign Out
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default OurNav;
