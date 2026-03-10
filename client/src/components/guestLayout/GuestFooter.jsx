import React from "react";
import { Nav } from "react-bootstrap";
import { FaHeart,FaFacebook,FaYoutube,FaTwitter,FaInstagram,FaLinkedin } from "react-icons/fa";
export const GuestFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <style>
        {`
        *{
        transition:all 0.7s;
        }
/* Guest Footer Section */
.footer-section {
background-color:rgba(0, 0, 0, 1); /* Slightly darker background */
color: #fff;
position: relative;
bottom:0;
overflow: hidden;
text-align: center;
animation: fadeIn 1s ease-in-out;
}

/* Footer Logo */
.footer-logo {
font-size: 28px;
font-weight: bold;
color: #fff;
text-transform: uppercase;
letter-spacing: 2px;
text-decoration: none;
position: relative;
animation: slideInFromLeft 1.5s ease-in-out;
}
.footer-logo:hover {
color: #ff5c8d;
text-decoration: underline;
}
/* Footer Links */
.footer-links {
list-style: none;
padding: 0;
margin-top: 30px;
display: flex;
justify-content: center;
gap: 30px;
}
.footer-links li a {
color: #fff;
font-size: 16px;
text-decoration: none;
transition: color 0.3s ease-in-out;
}

/* Copyright Text */
.copyright-text {
text-align: center;
margin-top: 40px;
font-size: 14px;
}
/* Social Media Icons */
.social-icons {
display: flex;
justify-content: center;
gap: 20px;
}

.socialIcons{
color:white;
font-size:20px;
}
.socialIcons:hover{
transform:translateY(-7px);
}
.socialIcons:active{
opacity:0.6;
}
/* Animations */
@keyframes fadeIn {
from {
opacity: 0;
}
to {
opacity: 1;
}
}
@keyframes slideInFromLeft {
from {
transform: translateX(-100px);
opacity: 0;
}
to {
transform: translateX(0);
opacity: 1;
}
}
/* Responsive Styles */
@media (max-width: 768px) {
.footer-links {
flex-direction: column;
gap: 15px;
}
}
`}
      </style>
      <footer className="footer-section">
        <div className="container">
          {/* Footer Text and Links */}
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-text">
                {/* Footer Text Instead of Logo */}
                <div className="ft-logo">QuickFix</div>
                {/* Copyright Info */}
                <div className="copyright-text">
                  <p>
                    Copyright &copy; {currentYear} All rights reserved | Made
                    with <FaHeart /> 
                    by
                    <a
                      href="http://localhost:3000"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Colorlib"
                    >
                      {" "}
                      QuickFix
                    </a>
                  </p>
                </div>
                {/* Social Media Links */}
                <div className="social-icons">
                  <Nav className="justify-content-center">
                    <Nav.Link
                      href="https://facebook.com"
                      className="social-icon"
                      aria-label="Visit our Facebook"
                      target="_blank"
                      rel="noopener 
noreferrer"
                    >
                     <FaFacebook className="socialIcons"/>
                    </Nav.Link>
                    <Nav.Link
                      href="https://twitter.com"
                      className="social-icon"
                      aria-label="Visit our Twitter"
                      target="_blank"
                      rel="noopener 
noreferrer"
                    >
                      <FaTwitter className="socialIcons"/>
                    </Nav.Link>
                    <Nav.Link
                      href="https://linkedin.com"
                      className="social-icon"
                      aria-label="Visit our LinkedIn"
                      target="_blank"
                      rel="noopener 
noreferrer"
                    >
                      <FaLinkedin className="socialIcons"/>
                    </Nav.Link>
                    <Nav.Link
                      href="https://instagram.com"
                      className="social-icon"
                      aria-label="Visit our Instagram"
                      target="_blank"
                      rel="noopener 
noreferrer"
                    >
                      <FaInstagram className="socialIcons"/>
                    </Nav.Link>
                    <Nav.Link
                      href="https://youtube.com"
                      className="social-icon"
                      aria-label="Visit our YouTube"
                      target="_blank"
                      rel="noopener 
noreferrer"
                    >
                      <FaYoutube className="socialIcons"/>
                    </Nav.Link>
                  </Nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
