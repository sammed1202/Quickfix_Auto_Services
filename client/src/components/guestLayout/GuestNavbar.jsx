// import React from "react";
// import { Container, Nav, Navbar } from "react-bootstrap";
// import { NavLink } from "react-router-dom";


// const GuestNavbar = () => {
  
//   const audio = new Audio("/NavbarSound.mp3");
//   const playsound=()=>{audio.currentTime=0.5;
//   audio.play();}
//   return (
//     <>
//       <style>
//         {`
//         *{
//          transition: all 0.3s linear;
//          box-sizing:border-box;
//         }

//         /* General Navbar Style */
//         .navbarStyle {
//             transition: all 0.3s ease;
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
//             color:rgb(246, 248, 248);
//             cursor:pointer;
//             padding: 0 5px;
            
            
//         }

//         /* Navigation Item Style */
//         .navItemStyle {
//             font-size: 20px;
//             padding:0px;
//             margin:15px 5px;
//             text-align:center;
//             transition: background 0.3s linear;
//             width:84px;
//             border-radius:0px;
//             border-bottom:2px solid transparent;
//             box-sizing:border-box;
//         }

//         /* Hover Effect for Navbar Items */
//         .navbar:hover {
//             background-color: #333;
//         }

//         .navbar .nav-item:hover {
//             color: rgb(255,255,255);
//             /* Change color on hover */
//             transform: scale(1.1);
//             transition:all 0.3s;
//            text-shadow:0 0 10px white;
//             /* Slightly enlarge the item on hover */
//         }
            

//         /* Logo Zoom Effect */
//         .zoomEffect {
//             transition: transform 0.3s ease;
//             /* Smooth transition */
//         }

//         .zoomEffect:hover {
//              transform: scale(1.6);
//             padding:2px;
//             border:2px solid transparent;
//             border-right:2px solid white;
//             border-left:2px solid white;

//             /* Zoom in the image by 80% */
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
//                 border-color: white;
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
//             text-transform:uppercase;
//             letter-spacing:6px;
//             font-size:2vw;
//             cursor:pointer;
//             }
            
//         `}
//       </style>
//       <div style={{width:'100vw'}}>
//       <Navbar
//         collapseOnSelect
//         expand="lg"
//         variant="dark"
//         bg="dark"
//         className="custom-navbar navbarStyle"
//       >
//         <Container>
//           {/* Logo Image inside Navbar.Brand */}
//           <Navbar.Brand
//             as={NavLink}
//             to="/home"
//             className="navbar-brand brandStyle"
//           >
//             <img
//               src="https://img.freepik.com/premium-vector/car-repair-icon-vector-illustration-car-cogwhee-isolated-background-service-sign-concept_993513-257.jpg" // Replace with your logo URL
//               alt="Let my space logo"
//               className="zoomEffect"
//               style={{
//                 width: "50px", // Adjust the width of the logo
//                 height: "50px", // Maintain aspect ratio
//                 borderRadius: "25px",
//                 objectFit: "cover",
//               }}
//             />
            
//             <span className="managementStyle"><div className="navImage">Quick Fix</div></span>
           
//           </Navbar.Brand>

//           <Navbar.Toggle
//             aria-controls="responsive-navbar-nav"
//             aria-label="Toggle navigation"
//           />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             {/* Aligning the navigation links to the right */}
//             <Nav className="ms-auto">
//               <Nav.Link
//                 as={NavLink}
//                 to="/home"
//                 className="nav-item navItemStyle"
//                 style={({ isActive }) => ({
//                   // backgroundImage: isActive ? "linear-gradient(60% transparent,rgba(242, 227, 153, 0.43))" : null,
//                   borderBottom: isActive ? "2px solid white" : null,
//                   color: isActive ? "white" : null,
                  
//                   textShadow:isActive?"0 0 10px white":null
//                 })}
//                 onClick={playsound}
//               >
//                Home
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/about"
//                 className="nav-item navItemStyle"
//                 style={({ isActive }) => ({
//                   // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
//                   borderBottom: isActive ? "2px solid white" : null,
                 
                  
//                   textShadow:isActive?"0 0 10px white":null
//                   })}
//                   onClick={playsound}
//               >
//                 About
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/services"
//                 className="nav-item navItemStyle"
//                 style={({ isActive }) => ({
//                   // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
//                   borderBottom: isActive ? "2px solid white" : null,
//                   color: isActive ? "white" : null,
                  
//                   textShadow:isActive?"0 0 10px white":null
//                   })}
//                   onClick={playsound}
//               >
//                 Services
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/contact"
//                 className="nav-item navItemStyle"
//                 style={({ isActive }) => ({
//                   // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
//                   borderBottom: isActive ? "2px solid white" : null,
//                   color: isActive ? "white" : null,
                  
//                   textShadow:isActive?"0 0 10px white":null
//                   })}
//                   onClick={playsound}
//               >
//                Contact
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/register"
//                 className="nav-item navItemStyle"
//                 style={({ isActive }) => ({
//                     // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
//                     borderBottom: isActive ? "2px solid white" : null,
//                     color: isActive ? "white" : null,
                    
//                     textShadow:isActive?"0 0 10px white":null
//                   })}
//                   onClick={playsound}
//               >
//                 Register
//               </Nav.Link>
//               <Nav.Link
//                 as={NavLink}
//                 to="/login"
//                 className="nav-item navItemStyle"
//                 style={({ isActive }) => ({
//                   // backgroundImage: isActive ? "linear-gradient(transparent,rgba(242, 227, 153, 0.43))" : null,
//                   borderBottom: isActive ? "2px solid white" : null,
//                   color: isActive ? "white" : null,
//                   textShadow:isActive?"0 0 10px white":null
//                   })}
//                   onClick={playsound}
//               >
//                 Login
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar></div>
//     </>
//   );
// };

// export default GuestNavbar;



import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled components
const StyledNavbar = styled(Navbar)`
  background:black;
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

const LogoImage = styled(motion.img)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all 0.3s ease;
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
  padding-bottom: 0.75rem 0 0.75rem 0 !important;
  color: rgba(255, 255, 255, 0.8) !important;
  position: relative;
  transition: all 0.3s ease;
  font-weight: 500;
  margin: 0 5px;
  text-align: center;
  width: 84px;
  border-radius: 0;
  box-sizing: border-box;
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
    text-shadow: 0 0 10px white;

    &:before {
      width: 100%;
    }
  }

  &.active {
    color: #fff !important;
    font-weight: 600;
    text-shadow: 0 0 10px white;

    &:before {
      width: 100%;
      background: white;
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
const logoVariants = {
  initial: { rotate: 0, borderColor: 'transparent' },
  hover: { 
    rotate: 360, 
    scale: 1.2,
    borderRightColor: 'white',
    borderLeftColor: 'white',
    transition: { duration: 0.5 }
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    }
  }
};

const GuestNavbar = () => {
  const audio = new Audio("/NavbarSound.mp3");
  
  const playsound = () => {
    audio.currentTime = 0.5;
    audio.play();
  };

  return (
    <StyledNavbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/home">
          <BrandContainer>
            <LogoImage
              src="https://img.freepik.com/premium-vector/car-repair-icon-vector-illustration-car-cogwhee-isolated-background-service-sign-concept_993513-257.jpg"
              alt="Quick Fix Logo"
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
            />
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
          <Nav className="ms-auto">
            <NavItem
              as={NavLink}
              to="/home"
              onClick={playsound}
              variants={navItemVariants}
            >
              Home
            </NavItem>
            <NavItem
              as={NavLink}
              to="/about"
              onClick={playsound}
              variants={navItemVariants}
            >
              About
            </NavItem>
            <NavItem
              as={NavLink}
              to="/services"
              onClick={playsound}
              variants={navItemVariants}
            >
              Services
            </NavItem>
            <NavItem
              as={NavLink}
              to="/contact"
              onClick={playsound}
              variants={navItemVariants}
            >
              Contact
            </NavItem>
            <NavItem
              as={NavLink}
              to="/register"
              onClick={playsound}
              variants={navItemVariants}
            >
              Register
            </NavItem>
            <NavItem
              as={NavLink}
              to="/login"
              onClick={playsound}
              variants={navItemVariants}
            >
              Login
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default GuestNavbar;