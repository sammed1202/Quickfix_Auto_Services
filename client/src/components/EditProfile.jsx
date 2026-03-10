import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const EditProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "not-specified",
    profilePicture: "",
    city: "",
    state: "karnataka",
    userName: "",
    matitalStatus: "single",
    phoneNumber: "",
    dob: "",
    pincode: "",
    address: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user?.email) {
          console.warn("No user email found in context");
          return;
        }

        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/user/${user.email}`
        );

        const fetchedUser = response.data;
        setFormData({
          firstName: fetchedUser.firstName || "",
          lastName: fetchedUser.lastName || "",
          gender: "not-specified",
          profilePicture: fetchedUser.profilePicture || "",
          city: fetchedUser.city || "",
          state: "karnataka",
          userName: fetchedUser.userName || "",
          matitalStatus: "single",
          phoneNumber: fetchedUser.phoneNumber || "",
          dob: fetchedUser.dob || "",
          pincode: fetchedUser.pincode || "",
          address: fetchedUser.address || "",
        });

        if (fetchedUser.profilePicture) {
          setPreview(`http://localhost:8000/${fetchedUser.profilePicture}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!user?.email) {
        setError("User email not found");
        return;
      }

      setLoading(true);

      let filePath = formData.profilePicture;

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadResponse = await axios.post(
          "http://localhost:8000/upload",
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        filePath = uploadResponse.data.filePath || formData.profilePicture;
      }

      const updateData = {
        ...formData,
        profilePicture: filePath,
      };

      await axios.put(
        `http://localhost:8000/user/profile/${user.email}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setError(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user.email) {
    return (
      <Container style={styles.container}>
        <Alert variant="info" style={styles.alert}>
          Loading user data...
        </Alert>
      </Container>
    );
  }

  if (loading && Object.values(formData).every((val) => val === "")) {
    return (
      <Container style={styles.container}>
        <Alert variant="info" style={styles.alert}>
          Loading profile data...
        </Alert>
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card style={styles.card}>
            <Card.Header style={styles.cardHeader}>
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    border: "4px solid white",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    border: "4px solid white",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="bi bi-person"
                    style={{ fontSize: "2rem", color: "#764ba2" }}
                  ></i>
                </div>
              )}
              <h3 style={styles.title}>Edit Profile</h3>
              <p style={styles.subtitle}>Update your personal information</p>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert
                  variant="danger"
                  onClose={() => setError(null)}
                  dismissible
                  style={styles.alert}
                >
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" style={styles.alert}>
                  Profile updated successfully!
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>First Name</Form.Label>
                      <Form.Control
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        style={styles.input}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>Last Name</Form.Label>
                      <Form.Control
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={styles.input}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>Username</Form.Label>
                      <Form.Control
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        style={styles.input}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>Phone Number</Form.Label>
                      <Form.Control
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        style={styles.input}
                        pattern="[0-9]{10}"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>
                        Date of Birth
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        style={styles.input}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>
                        Profile Picture
                      </Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={styles.input}
                      />
                      <Form.Text muted>
                        Upload a new profile picture (JPEG, PNG)
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>Pincode</Form.Label>
                      <Form.Control
                        name="pincode"
                        type="number"
                        value={formData.pincode}
                        onChange={handleChange}
                        style={{ ...styles.input, width: "150px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>City</Form.Label>
                      <Form.Control
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        style={styles.input}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label style={styles.label}>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    style={{ ...styles.input, minHeight: "100px" }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end mt-4">
                  <Button
                    type="submit"
                    style={styles.button}
                    disabled={loading}
                    className="hover-effect"
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  container: {
    padding: "3rem 0",
    minHeight: "calc(100vh - 56px)",
  },
  card: {
    border: "none",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    marginTop:"70px"
  },
  cardHeader: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderBottom: "none",
    padding: "2rem",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontWeight: "700",
    margin: "0",
    fontSize: "2rem",
    letterSpacing: "0.5px",
  },
  subtitle: {
    opacity: "0.9",
    margin: "0.5rem 0 0",
    fontSize: "1rem",
    fontWeight: "400",
  },
  label: {
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "0.5rem",
    fontSize: "0.95rem",
  },
  input: {
    borderRadius: "10px",
    border: "2px solid #e2e8f0",
    padding: "0.75rem 1rem",
    fontSize: "0.95rem",
    transition: "all 0.3s",
    background: "#f8fafc",
    color: "#2d3748",
    "&:focus": {
      borderColor: "#667eea",
      boxShadow: "0 0 0 0.25rem rgba(102, 126, 234, 0.25)",
      background: "#fff",
    },
    "&:hover": {
      borderColor: "#a0aec0",
    },
  },
  button: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "50px",
    padding: "0.75rem 2.5rem",
    fontWeight: "600",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
    "&:disabled": {
      background: "#a0aec0",
    },
  },
  alert: {
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
};

export default EditProfile;
