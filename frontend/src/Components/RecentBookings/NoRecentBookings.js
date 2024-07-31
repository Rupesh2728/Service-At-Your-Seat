import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NoRecentBookings = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col lg = "auto">
            <p style={{ color: "gold", fontSize: "2rem" }}>
              OOPS...No Recent Bookings Done...!!!
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NoRecentBookings;
