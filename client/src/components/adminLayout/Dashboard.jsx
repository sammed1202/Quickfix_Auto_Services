import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaBan } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
const Dashboard = () => {
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [shopOwnerCount, setShopOwnerCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [showOffline, setShowOffline] = useState(false);
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
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserStats();
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      if (!navigator.onLine) {
        setShowOffline(true);
      }
      const res = await axios.get("http://localhost:8000/user");
      console.log("users",res.data);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (user) => {
    let conf = window.confirm("Are you sure you want to Ban this user!");
    if (conf) {
      try {
        console.log(user.email);
        const delres = await axios.delete(
          `http://localhost:8000/admin/deluser?email=${user.email}`
        );
        const spamres = await axios.post(
          `http://localhost:8000/admin/spam?email=${user.email}`
        );
        console.log("added to spammer", spamres.status);
        console.log("user delete status", delres.status);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchUserStats = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/dashboard");
      const users = res.data.users;

      let totalUsers = 0;
      let shopOwners = 0;
      let online = 0;
      let offline = 0;

      users.forEach((user) => {
        if (user.role === "User") totalUsers++;
        if (user.role === "ShopOwner") shopOwners++;
        if (user.userStatus === "Active") online++;
        if (user.userStatus === "Inactive") offline++;
      });

      setUserCount(totalUsers);
      setShopOwnerCount(shopOwners);
      setOnlineCount(online);
      setOfflineCount(offline);
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    }
  };

  return (
    <>
      <style>
        {`
          .status {
            height: 180px;
            width: 250px;
            padding: 10px;
            background-image: linear-gradient(135deg, white, skyblue);
            border-radius: 10px;
            box-shadow: 0px 0px 20px grey;
            display: grid;
            justify-content: center;
            align-items: center;
            text-align: center;
          }

          .status h1 {
            font-size: 50px;
            margin: 0;
          }

          .label {
            font-size: 20px;
            font-weight: bold;
          }

          .dashboard-header {
            margin: 120px 0 30px -30px;
            color: black;
            display: inline-block;
            padding: 10px 50px;
            border-radius: 0 45px 45px 0px;
          }

          .status-wrapper {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            gap: 20px;
            padding: 0 30px;
          }
        `}
      </style>

      <>
        <h1 className="dashboard-header">User & Shop Owner Status</h1>
        <div className="status-wrapper">
          <div className="status" id="users">
            <h1>{userCount}</h1>
            <div className="label">Users</div>
          </div>
          <div className="status" id="shopowners">
            <h1>{shopOwnerCount}</h1>
            <div className="label">Shop Owners</div>
          </div>
          <div className="status" id="online">
            <h1>{onlineCount}</h1>
            <div className="label">Online</div>
          </div>
          <div className="status" id="offline">
            <h1>{offlineCount}</h1>
            <div className="label">Offline</div>
          </div>
          <div className="status" id="offline">
            <h1>{history.length*20}</h1>
            <div className="label">Total Revenue ₹</div>
          </div>
        </div>
      </>

      <div
        style={{
          padding: "25px",
          borderRadius: "30px",
          minWidth: "200px",
          marginTop: "50px",
        }}
      >
        <h3>Shops Owners</h3>
        <Table
          id="usersTable"
          style={{ textAlign: "left", whiteSpace: "nowrap" }}
          striped
          bordered
          hover
          responsive
        >
          <thead>
            <tr style={{ fontWeight: "500", fontSize: "20px" }}>
              <td>
                <FaUserAlt /> &nbsp;User
              </td>
              <td>
                <MdEmail /> &nbsp;Email
              </td>
              <td>
                <IoIosCall /> &nbsp;Contact
              </td>
              <td>
                <FaLocationDot /> &nbsp;City
              </td>
              <td>
                <MdSignalWifiStatusbarConnectedNoInternet4 /> &nbsp;Status
              </td>
              <td>
                <FaBan /> &nbsp;Action
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user, index) =>
                user.role === "ShopOwner" && (
                  <tr key={user._id}>
                    <td>
                      {user.firstName} &nbsp;{user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.city || user.address}</td>
                    {user.userStatus === "Active" && (
                      <td
                        style={{
                          background: "rgba(166, 244, 144, 0.65)",
                          textAlign: "center",
                        }}
                      >
                        Online
                      </td>
                    )}
                    {user.userStatus === "Inactive" && (
                      <td
                        style={{
                          background: "rgba(244, 144, 144, 0.65)",
                          textAlign: "center",
                        }}
                      >
                        Offline
                      </td>
                    )}
                    {user.userStatus === "Pending" && (
                      <td
                        style={{
                          background: "rgba(255, 248, 57, 0.65)",
                          textAlign: "center",
                        }}
                      >
                        pending
                      </td>
                    )}
                    <td
                      style={{
                        cursor: "pointer",
                        color: "red",
                        background: "white",
                        textAlign: "center",
                      }}
                      onClick={() => handleDelete(user)}
                    >
                      Ban
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Dashboard;
