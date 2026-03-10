import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Allbookings = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/user/booking/allhistory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch booking history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <>
    <h1 style={{marginTop:"150px",marginLeft:"250px"}}>All Bookings</h1>
      <div
        className="container mx-auto p-4"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {history.length === 0 ? (
          <p>No booking history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className=" bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Vehicle</th>
                  <th className="py-2 px-4 border-b">Issue</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Towing Needed</th>
                  <th className="py-2 px-4 border-b">Commission</th>
                  <th className="py-2 px-4 border-b">Shop Earnings</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      {booking.vehicleName}
                    </td>
                    <td className="py-2 px-4 border-b">{booking.issue}</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {booking.towingNeeded ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${booking.adminCommission}
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${booking.shopOwnerEarning}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Allbookings;
