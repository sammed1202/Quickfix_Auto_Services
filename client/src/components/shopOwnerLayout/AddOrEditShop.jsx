import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
const defaultServices = [
  { name: "Towing", price: "" },
  { name: "Puncture Repair", price: "" },
  { name: "Engine Repair", price: "" },
  { name: "Battery Replacement", price: "" },
  { name: "Oil Change", price: "" },
  { name: "Brake Check", price: "" },
];

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #3498db, #2ecc71);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(to right, #3498db, #2ecc71);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Button)`
  background: #ecf0f1;
  color: #2c3e50;
`;

const DangerButton = styled(Button)`
  background: #e74c3c;
`;

const ServiceItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  color: #2c3e50;
  margin: 1.5rem 0 1rem;
  font-size: 1.3rem;
`;

const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FileInputLabel = styled.label`
  padding: 0.8rem 1rem;
  background: #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #dfe6e9;
  }
`;

const LocationButton = styled(Button)`
  align-self: flex-start;
  margin-bottom: 1rem;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const AddOrEditShop = () => {
  const { token } = useAuth();
  const [shop, setShop] = useState({
    name: "",
    contact: "",
    location: "",
    timings: "",
  });

  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", price: "" });
  const [coords, setCoords] = useState([null, null]);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing shop info on load
  useEffect(() => {
    const fetchShop = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/shop/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const shopData = res.data;
        setShop({
          name: shopData.name || "",
          contact: shopData.contact || "",
          location: shopData.location || "",
          timings: shopData.timings || "",
        });
        if (!shopData.coordinates?.coordinates?.length) {
          alert(
            "⚠️ Coordinates not provided for this shop. Please use current location."
          );
        }
        setCoords(shopData.coordinates?.coordinates || [null, null]);

        if (shopData.services && Array.isArray(shopData.services)) {
          setServices(shopData.services);
        } else {
          setServices(defaultServices);
        }
      } catch (error) {
        console.error("❌ Failed to fetch shop data:", error);
        setServices(defaultServices); // fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchShop();
  }, [token]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords([longitude, latitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(
          "Could not get your location. Please ensure location services are enabled."
        );
      }
    );
  };

  const handleShopChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleNewServiceChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const addNewService = () => {
    if (newService.name && newService.price) {
      setServices([...services, newService]);
      setNewService({ name: "", price: "" });
    }
  };

  const deleteService = (index) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  const handleFileChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coords[0] || !coords[1]) {
      alert("Please use current location to set shop coordinates.");
      return;
    }

    const formData = new FormData();
    formData.append("name", shop.name);
    formData.append("contact", shop.contact);
    formData.append("location", shop.location);
    formData.append("timings", shop.timings);
    formData.append("coordinates", JSON.stringify(coords));
    formData.append("services", JSON.stringify(services));
    photos.forEach((photo) => formData.append("photos", photo));

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/shop",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("✅ Shop saved successfully!");
      }
    } catch (error) {
      console.error("❌ Error saving shop:", error);
      alert("Failed to save shop. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Title>Add / Edit Shop</Title>

        <Form onSubmit={handleSubmit}>
          <LocationButton
            type="button"
            onClick={getCurrentLocation}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>📍</span> Use Current Location
          </LocationButton>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Longitude</Label>
                <Input value={coords[0] || ""} disabled />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Latitude</Label>
                <Input value={coords[1] || ""} disabled />
              </FormGroup>
            </Col>
          </Row>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Shop Name</Label>
                  <Input
                    name="name"
                    value={shop.name}
                    onChange={handleShopChange}
                    placeholder="Enter shop name"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Contact Number</Label>
                  <Input
                    name="contact"
                    value={shop.contact}
                    onChange={handleShopChange}
                    placeholder="Enter contact number"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Shop Location</Label>
                  <Input
                    name="location"
                    value={shop.location}
                    onChange={handleShopChange}
                    placeholder="Enter shop address"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Working Hours</Label>
                  <Input
                    name="timings"
                    value={shop.timings}
                    onChange={handleShopChange}
                    placeholder="e.g., 9:00 AM - 6:00 PM"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label>Shop Photos</Label>
              <FileInputContainer>
                <FileInputLabel>
                  <span>📷</span> Choose Photos
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </FileInputLabel>
                {photos.length > 0 && (
                  <small>{photos.length} photo(s) selected</small>
                )}
              </FileInputContainer>
            </FormGroup>

            <SectionTitle>Shop Services</SectionTitle>

            <motion.div variants={containerVariants}>
              {services.map((service, index) => (
                <ServiceItem key={index} variants={itemVariants}>
                  <Input
                    value={service.name}
                    onChange={(e) =>
                      handleServiceChange(index, "name", e.target.value)
                    }
                    placeholder="Service name"
                    required
                    style={{ flex: 2 }}
                  />
                  <Input
                    value={service.price}
                    onChange={(e) =>
                      handleServiceChange(index, "price", e.target.value)
                    }
                    placeholder="Price"
                    required
                    style={{ flex: 1 }}
                  />
                  <DangerButton
                    type="button"
                    onClick={() => deleteService(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </DangerButton>
                </ServiceItem>
              ))}
            </motion.div>

            <SectionTitle>Add New Service</SectionTitle>
            <motion.div
              style={{ display: "flex", gap: "1rem" }}
              variants={itemVariants}
            >
              <Input
                name="name"
                value={newService.name}
                onChange={handleNewServiceChange}
                placeholder="Service name"
                style={{ flex: 2 }}
              />
              <Input
                name="price"
                value={newService.price}
                onChange={handleNewServiceChange}
                placeholder="Price"
                style={{ flex: 1 }}
              />
              <SecondaryButton
                type="button"
                onClick={addNewService}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Service
              </SecondaryButton>
            </motion.div>

            <Button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Shop & Services"}
            </Button>
          </motion.div>
        </Form>
      </Container>
    </motion.div>
  );
};

export default AddOrEditShop;
