import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Form, Alert, Button, Container, Nav } from "react-bootstrap";
import { Navigate, NavLink } from "react-router-dom";
import AOS from "aos";
import { motion } from "framer-motion";
import CustomCursor from "../CustomStyles/CustomCursor";
import styled from "styled-components";

// Styled Components
const RegisterContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 900px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, #ff7e5f, #feb47b);
  }
`;

const Title = styled.h2`
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ff7e5f, #feb47b);
    border-radius: 2px;
  }
`;

const StyledFormControl = styled(Form.Control)`
  border-radius: 8px;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ff7e5f;
    box-shadow: 0 0 0 0.25rem rgba(255, 126, 95, 0.25);
  }
`;

const StyledSelect = styled(Form.Select)`
  border-radius: 8px;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ff7e5f;
    box-shadow: 0 0 0 0.25rem rgba(255, 126, 95, 0.25);
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 126, 95, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const VerifyButton = styled(Button)`
  background: linear-gradient(90deg, #4b6cb7, #182848);
  border: none;
  border-radius: 8px;
  padding: 12px 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(75, 108, 183, 0.4);
  }
`;

const ImagePreview = styled(motion.img)`
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
`;

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const [loader, setLoader] = useState(false);
  const [validated, setValidated] = useState(false);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [spammer, setSpammer] = useState();
  
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    emailVerification: "",
    phoneNumber: "",
    profilePicture: "",
    pincode: "",
    address: "",
    userName: "",
    password: "",
    confirmPassword: "",
    userStatus: "Inactive",
    role: "User",
    gender: "not-specified",
    state: "Karnataka",
    country: "India",
    dob: "2000-01-01",
    maritalStatus: "Single"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleVerify = async () => {
    if (registerData.email.includes("@gmail.com")) {
      setLoader(true);
      try {
        const res = await axios.post(`http://localhost:8000/user/verifyEmail`, {
          email: registerData.email,
        });
        const audio = new Audio("/Success_Sound.mp3");
        audio.currentTime = 1;
        audio.play();
        setSuccessMessage("Email Verification Code sent");
        Navigate("/login");
      } catch (error) {
        const audio = new Audio("/Error_Sound.mp3");
        audio.currentTime = 0.5;
        audio.play();
      }
    } else {
      alert("Enter valid email to get verification code");
    }
    setLoader(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        alert("Please upload a valid image file");
        setImage(null);
        setImagePreview(null);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity()) {
      try {
        const spammer = await axios.post("http://localhost:8000/user/spam", {
          email: registerData.email,
        });
        if (spammer) setSpammer(true);
      } catch (error) {
        setError("Error in Spam check");
      }

      if (spammer) {
        setError("You are banned from this site");
      } else {
        try {
          let filePath = "";
          if (image) {
            const formData = new FormData();
            formData.append("file", image);
            const uploadResponse = await axios.post(
              "http://localhost:8000/upload",
              formData,
              { headers: { "Content-type": "multipart/form-data" } }
            );
            filePath = uploadResponse.data.filePath || "";
          }

          const updateRegisterData = { ...registerData, profilePicture: filePath };
          const registerResponse = await axios.post(
            "http://localhost:8000/user",
            updateRegisterData
          );

          if (registerResponse.status === 201) {
            setSuccessMessage("User registered successfully");
            setError("");
            const audio = new Audio("/Success_Sound.mp3");
            audio.currentTime = 1;
            audio.play();
            setRegisterData({
              firstName: "",
              lastName: "",
              email: "",
              emailVerification: "",
              phoneNumber: "",
              profilePicture: "",
              pincode: "",
              address: "",
              userName: "",
              password: "",
              confirmPassword: "",
              userStatus: "Inactive",
              role: "User",
              gender: "not-specified",
              state: "Karnataka",
              country: "India",
              dob: "2000-01-01",
              maritalStatus: "Single"
            });
            setImage("");
            setImagePreview(null);
          } else if (registerResponse.status === 420) {
            setError("Invalid Verification Code");
            const audio = new Audio("/Error_Sound.mp3");
            audio.currentTime = 0.5;
            audio.play();
          } else {
            setError("Error registering user. Please try again.");
            setSuccessMessage("");
            const audio = new Audio("/Error_Sound.mp3");
            audio.currentTime = 0.5;
            audio.play();
          }
        } catch (error) {
          setError(error.response?.data?.message || "Registration failed. Please try again.");
          const audio = new Audio("/Error_Sound.mp3");
          audio.currentTime = 0.5;
          audio.play();
          setSuccessMessage("");
        }
      }
    }
  };

  return (
    <RegisterContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CustomCursor color="#ff7e5f" size="20px" index="0" />

      <FormContainer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        data-aos="fade-up"
        style={{ filter: loader ? "blur(2px)" : "none" }}
      >
        <Title>Create Your Account</Title>
        
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success" dismissible onClose={() => setSuccessMessage("")}>
            {successMessage}
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="firstName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <StyledFormControl
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleChange}
                  required
                  pattern="[a-zA-Z]{2,20}"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid first name (2-20 characters)
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName" className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <StyledFormControl
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={8}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <StyledFormControl
                  type="email"
                  placeholder="your@email.com"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Label>Verification</Form.Label>
              <VerifyButton onClick={handleVerify} className="mb-3">
                Get Code
              </VerifyButton>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="verificationCode" className="mb-3">
                <Form.Label>Verification Code</Form.Label>
                <StyledFormControl
                  type="number"
                  placeholder="Enter code"
                  name="emailVerification"
                  value={registerData.emailVerification}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the code
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="phoneNumber" className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <StyledFormControl
                  type="tel"
                  placeholder="Phone number"
                  name="phoneNumber"
                  value={registerData.phoneNumber}
                  onChange={handleChange}
                  required
                  pattern="[6789][0-9]{9}"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid 10-digit number starting with 6-9
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="role" className="mb-3">
                <Form.Label>Account Type</Form.Label>
                <StyledSelect
                  name="role"
                  value={registerData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Role --</option>
                  <option value="User">User</option>
                  <option value="ShopOwner">Shop Owner</option>
                </StyledSelect>
                <Form.Control.Feedback type="invalid">
                  Please select a role
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="userName" className="mb-3">
                <Form.Label>Username</Form.Label>
                <StyledFormControl
                  type="text"
                  placeholder="Username"
                  name="userName"
                  value={registerData.userName}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={8}>
              <Form.Group controlId="address" className="mb-3">
                <Form.Label>Address</Form.Label>
                <StyledFormControl
                  type="text"
                  placeholder="Your address"
                  name="address"
                  value={registerData.address}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your address
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="pincode" className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <StyledFormControl
                  type="text"
                  placeholder="Pincode"
                  name="pincode"
                  value={registerData.pincode}
                  onChange={handleChange}
                  required
                  minLength={6}
                  maxLength={6}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid pincode
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={8}>
              <Form.Group controlId="profilePicture" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <StyledFormControl
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please upload a profile picture
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              {imagePreview && (
                <ImagePreview
                  src={imagePreview}
                  alt="Preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <StyledFormControl
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <Form.Control.Feedback type="invalid">
                  Password must be at least 6 characters
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <StyledFormControl
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <Form.Control.Feedback type="invalid">
                  Passwords must match
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6} className="d-flex align-items-center">
              <Nav.Link as={NavLink} to="/login" className="text-muted">
                Already have an account? Login
              </Nav.Link>
            </Col>
            <Col md={6}>
              <StyledButton type="submit" className="mt-0">
                Register Now
              </StyledButton>
            </Col>
          </Row>
        </Form>
      </FormContainer>

      {loader && (
        <LoadingOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <img 
              src="https://i.pinimg.com/originals/3c/48/a1/3c48a142c4f250cbebe25de3fb6d6764.gif" 
              alt="Loading..." 
              style={{ width: "150px", height: "150px" }}
            />
          </motion.div>
        </LoadingOverlay>
      )}
    </RegisterContainer>
  );
};

export default Register;