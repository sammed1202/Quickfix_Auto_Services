import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import BookingMap from "./BookingMap"; // ✅ Make sure this is correctly imported

const ShopOwnerDashboard = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/shop/mybookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (bookingId, status, data = {}) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/shop/booking/${bookingId}/status`,
        { status, ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const promptScheduled = (bookingId) => {
    const time = prompt("Enter scheduled time (e.g. 4:00 PM)");
    if (time) {
      handleStatusUpdate(bookingId, "Scheduled", { scheduledTime: time });
    }
  };

  const promptRejection = (bookingId) => {
    const msg = prompt("Enter reason for rejection");
    if (msg) {
      handleStatusUpdate(bookingId, "Rejected", { rejectionMessage: msg });
    }
  };

  const getStatusMessage = (booking) => {
    if (!booking.seenByShop) return "⏳ Not yet seen";
    if (booking.status === "Pending") return "👀 Seen";
    if (booking.status === "Approved") return "✅ Approved";
    if (booking.status === "Scheduled")
      return `⏰ ${booking.scheduledTime || "Scheduled"}`;
    if (booking.status === "Rejected")
      return `❌ ${booking.rejectionMessage || "Rejected"}`;
    return "❓ Unknown";
  };

  return (
    <div style={{ background: "rgba(248, 248, 248, 1)" }}>
      <h2>📋 Booking Dashboard</h2>
      {selectedBooking &&
        selectedBooking.userLocation?.coordinates &&
        selectedBooking.shopId?.coordinates.coordinates &&
        selectedBooking.userLocation.coordinates.length === 2 &&
        selectedBooking.shopId.coordinates.coordinates.length === 2 &&
        !selectedBooking.userLocation.coordinates.includes(undefined) &&
        !selectedBooking.shopId.coordinates.coordinates.includes(undefined) && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                marginTop: "20px",
                width: "90vw",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 0 25px rgb(1,1,1,0.5)",
              }}
            >
              <BookingMap
                userCoords={{
                  lat: selectedBooking.userLocation.coordinates[1],
                  lng: selectedBooking.userLocation.coordinates[0],
                }}
                shopCoords={{
                  lat: selectedBooking.shopId.coordinates.coordinates[1],
                  lng: selectedBooking.shopId.coordinates.coordinates[0],
                }}
              />
            </div>
          </div>
        )}
      {bookings.length !== 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>#</th>
              <th>photo</th>
              <th>Vehicle</th>
              <th>Contact</th>
              <th>Issue</th>
              <th>Towing</th>
              <th>User</th>
              <th>Email</th>
              <th>Time</th>
              <th>Status</th>
              <th>payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={booking._id}>
                <td>{idx + 1}</td>
                
                <td>
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    src={`http://localhost:8000/${booking.user.profilePicture}`}
                    alt="user profile"
                    onClick={() => {
                      setModalImageSrc(
                        `http://localhost:8000/${booking.user.profilePicture}`
                      );
                      setShowImageModal(true);
                    }}
                  />
                </td>
                <td>{booking.vehicleName}</td>
                <td>{booking.user.phoneNumber}</td>
                <td>{booking.issue || "N/A"}</td>
                <td>{booking.towingNeeded ? "Yes" : "No"}</td>
                <td>
                  {booking.user?.firstName} {booking.user?.lastName}
                </td>
                <td>{booking.user?.email}</td>
                <td>{new Date(booking.createdAt).toLocaleString()}</td>
                <td>{getStatusMessage(booking)}</td>
                <td>
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    src={`http://localhost:8000${booking.paymentImage}`}
                    alt="payment"
                    onClick={() => {
                      setModalImageSrc(
                        `http://localhost:8000${booking.paymentImage}`
                      );
                      setShowImageModal(true);
                    }}
                  />
                </td>

                <td style={{ textAlign: "center" }}>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleStatusUpdate(booking._id, "Approved")}
                  >
                    Approve
                  </Button>{" "}
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => promptScheduled(booking._id)}
                  >
                    Schedule
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => promptRejection(booking._id)}
                  >
                    Reject
                  </Button>{" "}
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => {
                      console.log(
                        "User coords:",
                        booking.userLocation?.coordinates
                      );
                      console.log(
                        "Shop coords:",
                        booking.shopId?.coordinates.coordinates
                      );
                      setSelectedBooking(booking);
                    }}
                  >
                    View Map
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showImageModal && (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={() => setShowImageModal(false)} // Close on background click
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()} // Prevent closing on image click
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payment Screenshot</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowImageModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={modalImageSrc}
                  alt="Payment Screenshot"
                  style={{
                    width: "100%",
                    maxHeight: "70vh",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {bookings.length === 0 && (
        <div style={{ minHeight: "80vh" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translate(-50%)",
              left: "50%",
              color: "grey",
              fontSize: "20px",
            }}
          >
            Currently there are No Bookings
            <img src="./cargif.gif" height="100px" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopOwnerDashboard;
