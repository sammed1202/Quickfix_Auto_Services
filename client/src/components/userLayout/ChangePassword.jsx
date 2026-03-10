import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import BgAnimation from "../CustomStyles/BgAnimation";
import Loader from "../CustomStyles/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState("");
  const [showError, setShowError] = useState("");
  const [color, setColor] = useState("blue");

  const handleOldPass = (e) => setOldPassword(e.target.value);
  const handleNewPass = (e) => setNewPassword(e.target.value);
  const handleConfirmPass = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 🔐 Password match check before hitting backend
    if (newPassword !== confirmPassword) {
      setShowError("New password and confirm password do not match.");
      setShowSuccess("");
      setColor("red");
      return;
    }

    try {
      setLoader(true);
      const result = await axios.post(
        `http://localhost:8000/user/changepassword`,
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status === 200) {
        setShowSuccess("Password changed successfully");
        setColor("green");
        setShowError("");
      }
    } catch (error) {
      setShowError(
        error.response?.data?.message || "Error in changing password"
      );
      setShowSuccess("");
      setColor("red");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {token ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
            padding: "2px",
            margin: "0px",
          }}
        >
          <div
            style={{
              maxHeight: "500px",
              maxWidth: "700px",
              minWidth: "350px",
              width: "60vw",
              padding: "5vh",
              overflow: "hidden",
              zIndex: "10",
              borderRadius: "0px 30px 0 30px",
              background: "rgba(255, 255, 255, 0.19)",
              backdropFilter: "blur(15px)",
              color: "white",
              border: "3px solid rgb(147, 142, 142)",
            }}
          >
            {loader && <Loader size="40px" border="4px" color="black" />}
            {showError && <Alert variant="danger">{showError}</Alert>}
            {showSuccess && <Alert variant="success">{showSuccess}</Alert>}
            <Container>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <h2 style={{ color: "black" }}>Change Password</h2>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Control
                      style={{ boxShadow: "0px 0px 10px grey" }}
                      type="password"
                      placeholder="Enter old password"
                      onChange={handleOldPass}
                      value={oldPassword}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Control
                      style={{ boxShadow: "0px 0px 10px grey" }}
                      type="password"
                      placeholder="Enter new password"
                      onChange={handleNewPass}
                      value={newPassword}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Control
                      style={{ boxShadow: "0px 0px 10px grey" }}
                      type="password"
                      placeholder="Confirm new password"
                      onChange={handleConfirmPass}
                      value={confirmPassword}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="text-center">
                    <Button type="submit">Done</Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
          <BgAnimation bg={color} />
        </div>
      ) : (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <h3>
            Not logged in but ready to change the password?
            <br /> We admire your confidence.
          </h3>
          <div>
            <br />
            <Button onClick={() => navigate("/login")}>Log-In</Button>
          </div>
        </span>
      )}
    </>
  );
};

export default ChangePassword;
