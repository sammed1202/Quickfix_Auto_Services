import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
export const ShopOwnerNavbar = () => {
  const audio = new Audio("/NavbarSound.mp3");
  const { token } = useAuth();
  const handleLogout = async () => {
    await axios.put(
      "http://localhost:8000/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // if using httpOnly cookie or CORS
      }
    );
  };
  const playsound = () => {
    audio.currentTime = 0.5;
    audio.play();
  };

  return (
    <>
      <style>
        {`
        * {
          transition: all 0.3s linear;
          box-sizing: border-box;
        }

        .navbarStyle {
          transition: all 0.3s ease;
        }

        .brandStyle {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .textAnimationStyle {
          font-size: 24px;
          font-weight: bold;
          margin-left: 25px;
          transition: transform 0.3s ease;
        }

        .textAnimationStyle:hover {
          transform: scale(1.2);
        }

        .eventStyle {
          padding-right: 20px;
          font-size: 32px;
          color: #ff5733;
          padding: 0 5px;
        }

        .managementStyle {
          color: rgb(246, 248, 248);
          cursor: pointer;
          padding: 0 5px;
        }

        .navItemStyle {
          font-size: 18px;
          color:rgb(240,240,240,0.6);
          margin: 15px 5px;
          text-align: center;
          transition: background 0.3s linear;
          border-radius: 0px;
          border-bottom: 2px solid transparent;
          box-sizing: border-box;
        }

        .navbar:hover {
          background-color: #333;
        }

        .navbar .nav-item:hover {
          color: white;
          transform: scale(1.1);
          transition: all 0.3s;
          text-shadow: 0 0 10px white;
        }

        .zoomEffect {
          transition: transform 0.3s ease;
        }

        .zoomEffect:hover {
          transform: scale(1.6);
          padding: 2px;
          border: 2px solid transparent;
          border-right: 2px solid white;
          border-left: 2px solid white;
        }

        .navImage {
          font-family: dafont;
          text-transform: uppercase;
          letter-spacing: 6px;
          font-size: 2vw;
          cursor: pointer;
        }

        @media (max-width: 992px) {
          .navbar-brand span {
            font-size: 20px;
          }

          .navbar .nav-item {
            font-size: 14px;
          }
        }

        @media (max-width: 576px) {
          .navbar-brand span {
            font-size: 18px;
          }

          .navbar .nav-item {
            font-size: 12px;
          }
        }
        `}
      </style>

      <div style={{ width: "100vw" }}>
        <Navbar
          collapseOnSelect
          expand="lg"
          style={{background:"black",color:"white"}}
          className="custom-navbar navbarStyle"
        >
          <Container>
            <Navbar.Brand
              as={NavLink}
              to="/shop-owner"
              className="navbar-brand brandStyle"
            >
              <img
                src="https://img.freepik.com/premium-vector/car-repair-icon-vector-illustration-car-cogwhee-isolated-background-service-sign-concept_993513-257.jpg"
                alt="QuickFix Shop Logo"
                className="zoomEffect"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "25px",
                  objectFit: "cover",
                }}
              />
              <span className="managementStyle">
                <div className="navImage">QuickFix</div>
              </span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link
                  as={NavLink}
                  to="/shop-owner"
                  end // <- ADD THIS LINE
                  className="nav-item navItemStyle"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "2px solid white" : null,
                    color: isActive ? "white" : null,
                    textShadow: isActive ? "0 0 10px white" : null,
                  })}
                  onClick={playsound}
                >
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/shop-owner/bookings"
                  className="nav-item navItemStyle"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "2px solid white" : null,
                    color: isActive ? "white" : null,
                    textShadow: isActive ? "0 0 10px white" : null,
                  })}
                  onClick={playsound}
                >
                  Bookings
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/shop-owner/changepassword"
                  className="nav-item navItemStyle"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "2px solid white" : null,
                    color: isActive ? "white" : null,
                    textShadow: isActive ? "0 0 10px white" : null,
                  })}
                  onClick={playsound}
                >
                  Changepassword
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/shop-owner/add-shop"
                  className="nav-item navItemStyle"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "2px solid white" : null,
                    color: isActive ? "white" : null,
                    textShadow: isActive ? "0 0 10px white" : null,
                  })}
                  onClick={playsound}
                >
                  My Shop
                </Nav.Link>
                  <Nav.Link
                  as={NavLink}
                  to="/shop-owner/profile"
                  className="nav-item navItemStyle"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "2px solid white" : null,
                    color: isActive ? "white" : null,
                    textShadow: isActive ? "0 0 10px white" : null,
                  })}
                  onClick={playsound}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/home"
                  className="nav-item navItemStyle"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "2px solid white" : null,
                    color: isActive ? "white" : null,
                    textShadow: isActive ? "0 0 10px white" : null,
                  })}
                  onClick={() => {
                    handleLogout();
                    playsound();
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};
