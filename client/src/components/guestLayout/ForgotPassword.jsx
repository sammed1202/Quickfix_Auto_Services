import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const ForgotPassword = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-6" controlId="exampleForm.ControlInput1">
              <h2>Forgot Password </h2>
              <br></br>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-6" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Enter email or phone number"
              /><br></br>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-6" controlId="exampleForm.ControlInput1">
              <Button>Get-Link</Button>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
