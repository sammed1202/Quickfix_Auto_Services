import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaCircleCheck, FaArrowRightLong } from "react-icons/fa6";
import CustomCursor from "../CustomStyles/CustomCursor";
const About = () => {
  const [size, setSize] = useState("20px");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <style>
        {` 
        /* About Section Styles */ 
        
        .about-section { 
          padding: 80px 0; 
          color: white; 
          opacity: 0; 
          animation: fadeIn 1s forwards; /* Fade-in effect for section */ 
        } 
 
        .about-section .container { 
          max-width: 1200px; 
          margin: 0 auto; 
        } 
 
        /* Section Title */ 
        .section-title h2 { 
          font-size: 38px;
           font-weight: 700; 
          margin-bottom: 20px; 
          text-transform: uppercase; 
          color: #4a90e2; 
          transition:all 0.4s ease; 
          animation: fadeIn 1s forwards; /* Fade-in effect for section title */ 
        } 
 
        .section-title h2:hover { 
          transform: scale(1.1); /* Slightly scale up on hover */ 
          color: #ff8c00; /* Change color to orange on hover */ 
        } 
 
        .section-title p { 
          font-size: 18px; 
          color:rgb(0, 0, 0); 
          text-align: center; 
          margin-bottom: 40px; 
          transition:all 0.4s ease; 
          animation: fadeIn 1s forwards 0.5s; /* Fade-in effect for paragraph */ 
        } 
 
        .section-title p:hover { 
          color:rgb(246, 157, 54); /* Change paragraph color to orange when hovered */
          scale:1.1;
          transition:all 0.4s ease; 
        } 
 
        .f-para { 
          font-style: ; 
          font-weight: 500; 
          
          transition:all 0.4s; 
          color:black;
          animation: fadeIn 1s forwards 1s; /* Fade-in effect for f-para */ 
        } 
          .f-para:hover{
          color:rgb(54, 67, 216);
          }
 
        
 
        /* About Video */ 
        .about-video { 
          margin-bottom: 30px; 
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
          border-radius: 10px; 
          transition:all 0.4s ease; 
          opacity: 0; 
          transform: translateY(50px); /* Start position (50px below) */
           animation: fadeIn 1s forwards 0s, slideUp 1s forwards 0s; /* Fade-in and slide-up effect */ 
        } 
 
        .about-video:hover { 
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */ 
          transform: scale(1.05); 
        } 
 
        .about-video iframe { 
          width: 100%; 
          height: 315px; 
          border-radius: 10px; 
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
          transition:all 0.4s ease; 
          opacity: 0; 
          animation: fadeIn forwards 0s; 
        } 
 
        .about-video:hover iframe { 
          transform: scale(1.05); /* Apply scale effect on hover */ 
        } 
 
        /* About Text */ 
        .about-text { 
          padding-left: 30px; 
          margin-top: 30px; 
          opacity: 0; 
          animation: fadeIn 1s forwards 0s; /* Fade-in effect for the text */ 
        } 
 
        .about-text h3 { 
          font-size: 26px; 
          font-weight: 600; 
          margin-bottom: 20px; 
          color: #4a3563; 
          transition:all 0.4s ease; 
        } 
 
        .about-text h3:hover { 
          transform: translateX(10px); /* Slide text on hover */ 
          color: #ff8c00; /* Change color to orange on hover */ 
        } 
 
        .about-text p { 
          font-size: 18px; 
          line-height: 1.8; 
         color: #634d4d; 
          transition:all 0.4s ease; 
        } 
 
        .about-text p:hover { 
          transform: scale(1.05); /* Slight scale on hover */ 
          color:rgb(255, 153, 0); /* Change color on hover */ 
        } 
 
        .features-list li{ 
          list-style: none; 
          padding: 4px; 
          margin:5px 0;
        } 
         
        .features-list li:hover { 
          translate:25px 0;
        } 
 
 
        /* CTA Button */ 
        .cta-button{ 
          display: inline-block; 
          padding: 15px 15px; 
          background-color:rgb(67, 226, 131); 
          color: black; 
          white-space:nowrap;
          
          overflow:hidden;
          text-transform: uppercase; 
          font-weight: 600; 
          border-radius: 10px; 
          text-decoration: none; 
          transition: all 0.4s ease; 
          animation: fadeIn 1s forwards; /* Fade-in effect for CTA button */ 
        } 
        .cta-button:hover { 
          background-color:rgb(246, 157, 54);  
          border-radius: 50px; 
          transition:all 0.4s ease;
          
          
        } 
 
        /* Responsive Design */ 
        @media (max-width: 991px) { 
          .about-video iframe { 
            height: 250px; 
          } 
 
          .section-title h2 { 
            font-size: 30px; 
          } 
 
          .about-text h3 { 
            font-size: 22px; 
          } 
 
          .about-text p { 
            font-size: 14px; 
          } 
 
         li{ 
            font-size: 14px;
          } 
        } 
          .icon_check{
          color:black;
          }
 
        @media (max-width: 768px) { 
          .about-video iframe { 
            height: 220px; 
          } 
 
          .about-text { 
            padding-left: 0; 
          } 
 
          .about-text h3 { 
            font-size: 20px; 
          } 
 
          .about-text p { 
            font-size: 14px; 
         } 
 
          .features-list li { 
            font-size: 14px; 
          } 
        } 
 
        /* Fade-In Animation */ 
        @keyframes fadeIn { 
          0% { 
            opacity: 1; 
          } 
          100% { 
            opacity: 1; 
          } 
        } 
 
        /* Slide-Up Animation */ 
        @keyframes slideUp { 
          0% { 
            transform: translateY(0px); /* Start 50px below */ 
          } 
          100% { 
            transform: translateY(-40px); /* End at normal position */ 
          } 
        } 
        `}
      </style>
      <section
        className="about-section spad"
        style={{
          transition: "none",
        }}
      >
        {/* <CustomCursor color="red" size={size} index="0" /> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center"
                onMouseEnter={() => setSize("220px")}
                onMouseLeave={() => setSize("20px")}
              >
                <h2>🚘 About Us: Revolutionizing Roadside Assistance</h2>
                <p className="f-para">
                  At Quick Fix, we make getting vehicle help easy and fast.
                  Whether your car breaks down due to a flat tire, engine
                  trouble, or battery issue, we connect you with nearby
                  mechanics ready to assist you immediately. Discover a seamless
                  experience and get back on the road with confidence!
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/n9yyfWrBUxE?si=eK5Mq-BsEhUl1ryW"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div
              className="col-lg-6"
              onMouseEnter={() => setSize("220px")}
              onMouseLeave={() => setSize("20px")}
            >
              <div className="about-text">
                <h3>🛠️ Get Instant Vehicle Help with Quick Fix</h3>
                <p>
                  We understand how frustrating a sudden vehicle breakdown can
                  be. Our mission is simple: to make roadside assistance
                  stress-free, fast, and reliable. With a growing network of
                  verified mechanical shops and service providers, we connect
                  drivers with the right experts—whether you need towing,
                  repairs, or emergency help. Join us in transforming how people
                  handle vehicle breakdowns.
                </p>
                <ul className="features-list">
                  <li>
                    <span className="icon_check">
                      <FaCircleCheck /> ⚙️ What Quick Fix Offers
                    </span>
                  </li>
                  <li>
                    <span className="icon_check">
                      <FaCircleCheck /> 🔧 Real-Time Mechanic Listings
                    </span>
                  </li>
                  <li>
                    <span className="icon_check">
                      <FaCircleCheck /> 🛡️ Verified Service Providers
                    </span>
                  </li>
                  <li>
                    <span className="icon_check">
                      <FaCircleCheck /> 💸 Transparent Pricing
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row text-center mt-5">
            <div>
              <Nav.Link className="cta-button" as={NavLink} to="/contact">
                Get started <FaArrowRightLong />
              </Nav.Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
