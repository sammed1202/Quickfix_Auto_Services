import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaBan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CgProfile } from "react-icons/cg";
import { Container, Alert, Modal } from "react-bootstrap";
const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showOffline, setShowOffline] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
  const handleOnline = () => {
    setShowOffline(false);
  };
  const handleOffline = () => {
    setShowOffline(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      if (!navigator.onLine) {
        setShowOffline(true);
      }
      const res = await axios.get("http://localhost:8000/user");
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
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
  const handlePdfDownload = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: "#usersTable" });
    doc.save("Users of QuickFix.pdf");
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
      {showOffline && (
        <div style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
          <h3>You are Offline!</h3>
        </div>
      )}

      <div
        style={{
          margin: "50px",
          marginTop: "100px",
          overflowX: "auto",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: "40px",
            margin: "30px 0",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Users</h1>
          <Button onClick={handlePdfDownload}>Get PDF</Button>
        </div>
        <div
          style={{
            border: "3px solid grey",
            padding: "25px",
            borderRadius: "30px",
            minWidth: "200px",
          }}
        >
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
                  <CgProfile />
                </td>
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
                  user.role === "User" && (
                    <tr key={user._id}>
                      <td style={{ height: "50px", width: "100px" }}>
                        <img
                          style={{
                            height: "50px",
                            width: "50px",
                            cursor: "pointer",
                            objectFit: "cover",
                          }}
                          src={`http://localhost:8000/${user.profilePicture}`}
                          alt="Profile"
                          onClick={() => handleImageClick(user.profilePicture)}
                        />
                      </td>
                      <td>
                        {user.firstName} &nbsp;{user.lastName}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.city}</td>
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
                  borderRadius: "8px",
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
      </div>
    </>
  );
};

export default AllUsers;
