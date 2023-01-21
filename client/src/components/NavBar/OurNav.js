import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./OurNav.css";

const OurNav = (props) => {
  const { type = "student" | "employer" | "admin" | "nonAuth" } = props;
  const [toggled, setToggled] = useState(false);

  const signOut = () => {
    // TODO: Implement Later
  };

  return (
    <Navbar
      onToggle={() => setToggled(!toggled)}
      collapseOnSelect
      expand="md"
      className="ourNav"
    >
      <Container fluid>
        <NavLink className="logo" exact to="/signin">
          Jobify
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {type === "student" ? (
            <Nav className="me-auto navLeft">
              <NavLink exact to="/signin" activeClassName="highlighted">
                Postings
              </NavLink>
              <NavLink exact to="/" activeClassName="highlighted">
                Applications
              </NavLink>
              <NavLink exact to="/" activeClassName="highlighted">
                Profile
              </NavLink>
            </Nav>
          ) : type === "employer" ? (
            <Nav className="me-auto navLeft">
              <NavLink exact to="/signin" activeClassName="highlighted">
                Postings
              </NavLink>
              <NavLink exact to="/" activeClassName="highlighted">
                Profile
              </NavLink>
            </Nav>
          ) : type === "admin" ? (
            <Nav className="me-auto navLeft">
              <NavLink exact to="/signin" activeClassName="highlighted">
                Applications
              </NavLink>
              <NavLink exact to="/signin" activeClassName="highlighted">
                Postings
              </NavLink>
              <NavLink exact to="/" activeClassName="highlighted">
                Profiles
              </NavLink>
            </Nav>
          ) : type === "nonAuth" ? (
            <Nav className="me-auto navLeft"></Nav>
          ) : null}
          <Nav>
            {type !== "nonAuth" ? (
              <Button className="sign-out" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <>
                <NavLink exact to="/" activeClassName="highlighted">
                  Sign In
                </NavLink>
                <NavLink exact to="/" activeClassName="highlighted">
                  Sign Out
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default OurNav;
