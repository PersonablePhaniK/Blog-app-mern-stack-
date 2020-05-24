  
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Landing.css";

const Landing = () => (
   <Container
      style={{ height: "75vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
   >
      {" "}
      <Row className="mb-4">
         <p className="text-secondary h3"> Blog App(MERN-Stack)</p>
      </Row>
      <Row>
         <Col>
            <img src="https://www.freeiconspng.com/uploads/blogger-logo-icon-png-19.png" alt="node" className="img-fluid" />
            
         </Col>
         
      </Row>
      {
         "Click on Navbar Icon to view all Blogs"
      }
   </Container>
);

export default Landing;