// import React from "react";
// import { Container, Nav, Navbar } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// const AdminNavbar = () => {
//   const { token } = useAuth();
//   const audio = new Audio("/NavbarSound.mp3");
//   const playsound = () => {
//     audio.currentTime = 0.5;
//     audio.play();
//   };

//   const handleLogout = async () => {
//     await axios.put(
//       "http://localhost:8000/user/logout",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true, // if using httpOnly cookie or CORS
//       }
//     );
//   };
//   return (
//     <>
//       <style>
//         {`
//         /* General Navbar Style */
//         .navbarStyle {
//             transition: all 0.3s ease;
//             position:fixed;
//             width:100%;
//             top:0;
//             z-index:10000;
//             /* Smooth transition for hover effects */
//         }

//         /* Logo and Text Alignment */
//         .brandStyle {
//             display: flex;
//             align-items: center;
//             gap: 15px;
//             /* Add gap between logo and text */
//         }

//         /* Text Animation for Event Management */
//         .textAnimationStyle {
//             font-size: 24px;
//             font-weight: bold;
//             margin-left: 25px;  
//             transition: transform 0.3s ease;
//             /* Smooth transition for zoom effect */
//         }

//         .textAnimationStyle:hover {
//             transform: scale(1.2);
//             /* Zoom in the text by 20% on hover */
//         }

//         /* Individual Style for Event and Management Text */
//         .eventStyle {
//             padding-right: 20px;
//             font-size: 32px;
//             color: #ff5733;
//             /* Event color (red-orange) */
//             padding: 0 5px;
//         }

//         .managementStyle {
//             color: #33c1ff;
//             /* Management color (blue) */
//             padding: 0 5px;
//         }

//         /* Navigation Item Style */
//         .navItemStyle {
//             font-size: 20px;
//             padding: 15px;
//             transition: all 0.3s ease;
//         }

//         /* Hover Effect for Navbar Items */
//         .navbar:hover {
//             background-color: #333;
//         }

//         .navbar .nav-item:hover {
//             color: #ffcc00;
//             /* Change color on hover */
//             transform: scale(1.1);
//             /* Slightly enlarge the item on hover */
//         }

//         /* Logo Zoom Effect */
//         .zoomEffect {
//             transition: transform 0.3s ease;
//             /* Smooth transition */
//         }

        

//         /* Keyframes for Typing Animation */
//         @keyframes typing {
//             0% {
//                 width: 0;
//             }

//             100% {
//                 width: 14em;
//             }
//         }

//         /* Keyframes for Blinking Cursor Effect */
//         @keyframes blink {
//             50% {
//                 border-color: transparent;
//             }
//         }

//         /* Media Queries for Responsiveness */
//         @media (max-width: 992px) {
//             .navbar-brand span {
//                 font-size: 20px;
//                 /* Reduce font size on smaller screens */
//             }

//             .navbar .nav-item {
//                 font-size: 14px;
//                 /* Smaller nav item font size on mobile */
//             }
//         }

//         @media (max-width: 576px) {
//             .navbar-brand span {
//                 font-size: 18px;
//                 /* Reduce font size even further on extra small screens */
//             }

//             .navbar .nav-item {
//                 font-size: 12px;
//                 /* Even smaller nav item font size on extra small screens */
//             }
//         }
//             .navImage{
//             font-family:dafont;
//             color:white;
//             text-transform:uppercase;
//             letter-spacing:6px;
//             font-size:2vw;
//             cursor:pointer;
//             }
            
//             .ms-auto{
//             gap:10px;
//             }
//             .imgCont{
//                 border:4px solid transparent;
//                 border-left:4px solid white;
//                 border-right:4px solid white;
//                 border-radius:50%;
//                 padding:2px;
//                 animation:rotateCont 5s linear infinite;
//             }
//             .logoImg{
//             animation:rotateImg 5s linear infinite;
//             }
//                 @keyframes rotateCont{
//                 100%{
//                 transform:rotate(360deg);
//                 }
//                 }
//                  @keyframes rotateImg{
//                 to{
//                 transform:rotate(-360deg);
//                 }
//                 }
//         `}
//       </style>
//       <Navbar
//         collapseOnSelect
//         expand="lg"
//         variant="dark"
//         bg="dark"
//         className="custom-navbar navbarStyle"
//       >
//         <Container>
//           <Navbar.Brand
//             as={NavLink}
//             to="/admin/dashboard"
//             className="navbar-brand brandStyle"
//           >
//             <div className="imgCont">
//               <img
//                 src="https://i.pinimg.com/736x/aa/e7/ec/aae7ec42232faba3ecd375b04eeb9d93.jpg"
//                 alt="My"
//                 className="zoomEffect logoImg"
//                 style={{
//                   width: "50px",
//                   height: "50px",
//                   borderRadius: "50%",
//                 }}
//               />
//             </div>
//             <span className="managementStyle">
//               <div className="navImage">Quick Fix</div>
//             </span>
//           </Navbar.Brand>

//           <Navbar.Toggle
//             aria-controls="responsive-navbar-nav"
//             aria-label="Toggle navigation"
//           />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link
//                 as={NavLink}
//                 to="/admin/dashboard"
//                 className="nav-item navItemStyle"
//                 onClick={playsound}
//               >
//                 Dashboard
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/admin/pending_shops"
//                 className="nav-item navItemStyle"
//                 onClick={playsound}
//               >
//                 Pending Shops
//               </Nav.Link>
//               {/* <Nav.Link as={NavLink} to="/admin/contentmanagement" className="nav-item navItemStyle" >Content Management</Nav.Link> */}
//               <Nav.Link
//                 as={NavLink}
//                 to="/admin/users"
//                 className="nav-item navItemStyle"
//                 onClick={playsound}
//               >
//                 Users
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/admin/admins"
//                 className="nav-item navItemStyle"
//                 onClick={playsound}
//               >
//                 Admins
//               </Nav.Link>

//               <Nav.Link
//                 as={NavLink}
//                 to="/admin/feedback"
//                 className="nav-item navItemStyle"
//                 onClick={playsound}
//               >
//                 Feedbacks
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/admin/changepassword"
//                 className="nav-item navItemStyle"
//                 onClick={playsound}
//               >
//                 changepassword
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/home"
//                 className="nav-item navItemStyle"
//                 onClick={() => {
//                   handleLogout();
//                   playsound();
//                 }}
//               >
//                 Logout
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default AdminNavbar;


import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled components
const StyledNavbar = styled(Navbar)`
  background: black;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10000;
  padding: 0.5rem 0;

  &:hover {
    background:black;
  }
`;

const BrandContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LogoContainer = styled(motion.div)`
  border: 4px solid transparent;
  border-left: 4px solid white;
  border-right: 4px solid white;
  border-radius: 50%;
  padding: 2px;
`;

const LogoImage = styled(motion.img)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const BrandText = styled(motion.div)`
  font-family: 'Montserrat', sans-serif;
  color: white;
  text-transform: uppercase;
  letter-spacing: 6px;
  font-size: 1.5rem;
  cursor: pointer;
  background: linear-gradient(to right, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const NavItem = styled(motion(Nav.Link))`
  font-size: 1rem;
  padding: 0.5rem 0.7rem !important;
  color: white !important;
  position: relative;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration:none;
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, #3498db, #2ecc71);
    transition: all 0.3s ease;
  }

  &:hover {
    color: #fff !important;
    transform: translateY(-2px);

    &:before {
      width: 100%;
    }
  }

  &.active {
    color: #2ecc71 !important;
    font-weight: 600;

    &:before {
      width: 100%;
    }
  }
`;

const ToggleButton = styled(Navbar.Toggle)`
  border-color: rgba(255, 255, 255, 0.5) !important;

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
`;

// Animation variants
const logoContainerVariants = {
  initial: { rotate: 0 },
  animate: { rotate: 360, transition: { duration: 8, repeat: Infinity, ease: "linear" } }
};

const logoImageVariants = {
  initial: { rotate: 0 },
  animate: { rotate: -360, transition: { duration: 8, repeat: Infinity, ease: "linear" } }
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const brandTextVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 }
  }
};

const AdminNavbar = () => {
  const { token } = useAuth();
  const audio = new Audio("/NavbarSound.mp3");

  const playsound = () => {
    audio.currentTime = 0.5;
    audio.play();
  };

  const handleLogout = async () => {
    await axios.put(
      "http://localhost:8000/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  };

  return (
    <StyledNavbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/admin/dashboard">
          <BrandContainer>
            <LogoContainer
              variants={logoContainerVariants}
              initial="initial"
              animate="animate"
            >
              <LogoImage
                src="https://img.freepik.com/premium-vector/car-repair-icon-vector-illustration-car-cogwhee-isolated-background-service-sign-concept_993513-257.jpg"
                alt="Quick Fix Logo"
                variants={logoImageVariants}
                initial="initial"
                animate="animate"
              />
            </LogoContainer>
            <BrandText
              variants={brandTextVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              Quick Fix
            </BrandText>
          </BrandContainer>
        </Navbar.Brand>

        <ToggleButton aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" style={{ gap: "10px" }}>
            <NavItem
              as={NavLink}
              to="/admin/dashboard"
              onClick={playsound}
              variants={navItemVariants}
            >
              Dashboard
            </NavItem>
            <NavItem
              as={NavLink}
              to="/admin/all-bookings"
              onClick={playsound}
              variants={navItemVariants}
            >
              Bookings
            </NavItem>
            <NavItem
              as={NavLink}
              to="/admin/pending_shops"
              onClick={playsound}
              variants={navItemVariants}
            >
              Pending Shops
            </NavItem>
            <NavItem
              as={NavLink}
              to="/admin/users"
              onClick={playsound}
              variants={navItemVariants}
            >
              Users
            </NavItem>
            <NavItem
              as={NavLink}
              to="/admin/admins"
              onClick={playsound}
              variants={navItemVariants}
            >
              Admins
            </NavItem>
            <NavItem
              as={NavLink}
              to="/admin/feedback"
              onClick={playsound}
              variants={navItemVariants}
            >
              Feedbacks
            </NavItem>
            <NavItem
              as={NavLink}
              to="/admin/changepassword"
              onClick={playsound}
              variants={navItemVariants}
            >
              Change Password
            </NavItem>
             <NavItem
              as={NavLink}
              to="/admin/profile"
              onClick={playsound}
              variants={navItemVariants}
            >
              Profile
            </NavItem>
            <NavItem
              as={NavLink}
              to="/home"
              onClick={() => {
                handleLogout();
                playsound();
              }}
              variants={navItemVariants}
              style={{ color: "#e74c3c !important" }}
            >
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default AdminNavbar;