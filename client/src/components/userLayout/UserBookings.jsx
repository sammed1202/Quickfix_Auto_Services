import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const UserBookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8000/user/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetch();
    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = (booking) => {
    if (!booking.seenByShop) return "⏳ Waiting for shop to see your request...";
    if (booking.status === "Pending") return "👀 Seen by shop, awaiting action...";
    if (booking.status === "Approved") return "✅ Approved";
    if (booking.status === "Scheduled")
      return `⏰ Scheduled at ${booking.scheduledTime || booking.statusDetails?.message}`;
    if (booking.status === "Rejected")
      return `❌ Rejected: ${booking.rejectionMessage || booking.statusDetails?.message}`;
    return "❓ Unknown status";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>📋 My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr style={{ background: "#f0f0f0",textAlign:"center" }}>
              <th>Vehicle</th>
              <th>Issue</th>
              <th>Shop</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Booked On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} style={{ textAlign: "center", borderBottom: "1px solid #ccc" }}>
                <td>{b.vehicleName}</td>
                <td>{b.issue}</td>
                <td>{b.shopId?.name || "N/A"}</td>
                <td>{b.shopId?.location || "N/A"}</td>
                <td>{b.shopId?.contact || "N/A"}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
                <td>{getStatusMessage(b)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserBookings;
