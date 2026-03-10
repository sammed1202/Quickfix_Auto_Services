import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Alert, Modal } from "react-bootstrap";

const AdminApproveShopOwners = () => {
  const [shopOwners, setShopOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const fetchPendingShopOwners = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/admin/pending-shopowners");
      console.log(response.data)
      setShopOwners(response.data || []);
    } catch (error) {
      console.error("Error fetching shopowners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:8000/admin/approve-shopowner/${userId}`);
      setMessage(response.data.message);
      console.log(response.data)
      setShopOwners(prev => prev.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error approving shopowner:", error);
      setMessage("Failed to approve user");
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(`http://localhost:8000/${imageUrl}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };

  useEffect(() => {
    fetchPendingShopOwners();
  }, []);

  return (
    <Container style={{ padding: "30px", marginTop: "120px" }}>
      <h2>🛠️ Pending Shop Owner Approvals</h2>
      {message && <Alert variant="info">{message}</Alert>}
      {loading ? (
        <p>Loading...</p>
      ) : shopOwners.length === 0 ? (
        <p>No pending shop owners to approve.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shopOwners.map((owner) => (
              <tr key={owner._id}>
                <td style={{ height: "50px", width: "100px" }}>
                  <img 
                    style={{ 
                      height: "50px", 
                      width: "50px",
                      cursor: "pointer",
                      objectFit: "cover"
                    }} 
                    src={`http://localhost:8000/${owner.profilePicture}`} 
                    alt="Profile" 
                    onClick={() => handleImageClick(owner.profilePicture)}
                  />
                </td>
                <td>{owner.firstName} {owner.lastName}</td>
                <td>{owner.email}</td>
                <td>{owner.phoneNumber || "N/A"}</td>
                <td>{owner.address || "N/A"}</td>
                <td>
                  <Button variant="success" onClick={() => handleApprove(owner._id)}>
                    ✅ Approve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Image Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shop Owner Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Full Profile" 
              style={{ 
                maxWidth: "100%", 
                maxHeight: "70vh",
                borderRadius: "8px"
              }} 
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminApproveShopOwners;