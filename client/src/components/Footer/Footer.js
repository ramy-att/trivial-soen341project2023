import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <div className="footerCol">
              <h1>Jobify</h1>
              <div>
                <span className="slogan">Get Your Dream Job!</span>
                <p className="footerLeft">
                  <span className="copyRight">© Copyright 2023</span>
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="footerCol">
              <h1>Navigation</h1>
              <div className="footerSection">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://online.hbs.edu/blog/post/how-to-land-your-dream-job"
                >
                  Get Your Dream Job
                  <BoxArrowUpRight
                    style={{ marginBottom: "5px", marginLeft: "5px" }}
                    size={15}
                  />
                </a>
                <br />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.concordia.ca/students/success/career-planning/career-counselling.html"
                >
                  ConcU Career Couselling
                  <BoxArrowUpRight
                    style={{ marginBottom: "5px", marginLeft: "5px" }}
                    size={15}
                  />
                </a>
                <br />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="footerCol">
              <h1>Team</h1>
              <div className="footerSection">
                <p>Tarek Elalfi - Mario Elshaer</p>
                <p>Khaled Saleh - Ramy Attalla</p>
                <p>Mazen Mohamed - Ziad</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Footer;
