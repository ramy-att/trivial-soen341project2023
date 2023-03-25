import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./OurNav.css";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";

const OurNav = () => {
  const userContext = useContext(UserContext);
  const userInfo = userContext.userInfo;
  const userAuthenticated = !userInfo === "nonAuth";
  const history = useHistory();

  const signOut = () => {
    localStorage.removeItem("token");
    userContext.signOut();
    history.push("/");
  };

  return (
    <Navbar collapseOnSelect expand="md" className="ourNav">
      <Container fluid>
        <NavLink
          className="logo"
          exact
          to={userAuthenticated ? "/job-postings" : "/"}
        >
          Jobify
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {userInfo && userInfo.type === "student" ? (
            <Nav className="me-auto navLeft">
              <NavLink exact to="/job-postings" activeClassName="highlighted">
                Postings
              </NavLink>
              <NavLink
                exact
                to="/job-applications"
                activeClassName="highlighted"
              >
                Applications
              </NavLink>
              <NavLink
                exact
                to="/edit-profile-student"
                activeClassName="highlighted"
              >
                Profile
              </NavLink>
            </Nav>
          ) : userInfo && userInfo.type === "employer" ? (
            <Nav className="me-auto navLeft">
              <NavLink exact to="/job-postings" activeClassName="highlighted">
                Postings & Applications
              </NavLink>
              <NavLink
                exact
                to="/edit-profile-employer"
                activeClassName="highlighted"
              >
                Profile
              </NavLink>
            </Nav>
          ) : userInfo && userInfo.type === "admin" ? (
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
          ) : !userInfo ? (
            <Nav className="me-auto navLeft"></Nav>
          ) : null}
          <Nav>
            {userInfo !== "nonAuth" ? (
              <Button className="sign-out" onClick={signOut}>
                Sign Out
              </Button>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default OurNav;
