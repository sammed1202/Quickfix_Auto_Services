import axios from "axios";
import { API_URL } from "../../api";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const AllAdmins = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      // Backend returns { users: [...] }
      setUsers(res.data.users);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      console.log(error);
    }
  };
  return (
    <>
      <style>
        {`
        
        @media (max-width:600){
        .theader{
        font-size:4vw;
        color:green;
        background:green;
        }
        }
        `}
      </style>
      <div>
        <div
          style={{
            margin: "0px",
            overflowX: "auto",
            padding: "40px",
          }}
        >
          <div style={{ marginTop: "100px" }}>
            <h1 style={{ textAlign: "center" }}>Admins</h1>
            <div
              style={{
                padding: "30px",
                border: "3px solid grey",
                borderRadius: "30px",
              }}
            >
              <Table
                style={{ textAlign: "left", whiteSpace: "nowrap" }}
                striped
                bordered
                hover
                responsive
              >
                <thead>
                  <tr style={{ fontWeight: "500", fontSize: "20px" }}>
                    <td>
                      <FaUserAlt /> User
                    </td>
                    <td>
                      <MdEmail /> Email
                    </td>
                    <td>
                      <IoIosCall />
                      Contact
                    </td>
                    <td>
                      <MdSignalWifiStatusbarConnectedNoInternet4 /> Status
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {users.map(
                    (user) =>
                      user.role === "Admin" && (
                        <tr key={user._id}>
                          <td>
                            {user.firstName} {user.lastName}
                          </td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>

                          {user.userStatus === "Active" ? (
                            <td
                              style={{
                                background: "rgb(166, 244, 144)",
                                textAlign: "center",
                              }}
                            >
                              Online
                            </td>
                          ) : (
                            <td
                              style={{
                                background: "rgb(244, 144, 144)",
                                textAlign: "center",
                              }}
                            >
                              Offline
                            </td>
                          )}
                        </tr>
                      ),
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllAdmins;
