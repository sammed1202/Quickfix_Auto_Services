import React, { useState, useEffect } from "react";
import AOS from "aos";
import axios from "axios";
import { Form } from "react-bootstrap";
import Loader from "../CustomStyles/Loader";
const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  AOS.init({
    duration: 300,
    easing: "ease-in-out",
    once: true,
  });
  const [formData, setformData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loader, setLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/contact",
        formData
      );
      if (response.status === 200) {
        setShowSuccess(true);
        setShowError(false);
        console.log("data saved successfully");
        console.log("form submitted:", formData);
      } else {
        console.log("error in saving data");
        setShowSuccess(false);
        setShowError(true);
      }
    } catch (error) {
      setShowSuccess(false);
      setShowError(true);
      console.log("error in saving data,error in try block");
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <style>
        {`
/* Contact Section Styles */
.contact {
padding: 80px 0;
color: #333;
}
.contact .section-title h2 {
font-size: 38px;
font-weight: 700;
text-transform: uppercase;
margin-bottom: 20px;
}
.contact .section-title p {
font-size: 18px;
color: #777;
margin-bottom: 40px;
text-align: center;
font-style: italic;
}
/* Info Item */
.info-item {
text-align: center;
background-color: #fff;
border-radius: 10px;
padding: 20px;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
transition: all 0.2s ease;
}
.info-item:hover {
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}
.info-item i {
font-size: 30px;
color: #00bfae;
margin-bottom: 15px;
}
.info-item h3 {
font-size: 24px;
font-weight: 600;
color: #333;
}
.info-item p {
font-size: 16px;
color: #555;
}
/* Google Map */
iframe {
border-radius: 10px;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
/* Contact Form */
.php-email-form input,
.php-email-form textarea {
border-radius: 10px;
padding: 15px;
border: 1px solid #ddd;
width: 100%;
font-size: 16px;
margin-bottom: 20px;
box-sizing: border-box;
}

/* Responsive Design */
@media (max-width: 991px) {
.info-item {
margin-bottom: 30px;
}
.container {
padding: 0 15px;
}
iframe {
height: 300px;
}
}
@media (max-width: 768px) {
.contact .section-title h2 {
font-size: 30px;
}
.info-item {
margin-bottom: 30px;
}
iframe {
height: 300px;
}
}
@media (max-width: 576px) {
.contact .section-title h2 {
font-size: 24px;
}
}
.sendbtn{
padding:10px 30px;
height:50px;
border:1px solid rgba(150, 150, 150, 0.46);
border-radius:5px;
color:black;
background:white;
}
.sendbtn:hover{
background:rgb(0, 153, 255);
border-radius:25px;
color:white;
}

`}
      </style>
      <section id="contact" className="contact section">
        <div className="container section-title text-center" data-aos="fade-up">
          <h2>📞 Contact Us for Vehicle Assistance</h2>
          <p className="f-para">
            Quick Fix connects you with verified mechanical shops near your
            location for fast and reliable assistance. Whether it’s a flat tire,
            engine trouble, battery issue, or towing support — we’re here to
            make your breakdown experience smooth and stress-free.
          </p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div
                className="info-item d-flex flex-column justify-content-center align-items-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <i className="bi bi-geo-alt"></i>
                <h3>QuickFix Office Location</h3>
                <p>
                  QuickFix Headquarters 123 Rental Street, Property City, NY
                  123456
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="info-item d-flex flex-column justify-content-center align-items-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <i className="bi bi-geo-telephone"></i>
                <h3>Call Us</h3>
                <p>+91 6362460082</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="info-item d-flex flex-column justify-content-center align-items-center"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <i className="bi bi-envelope"></i>
                <h3>Email Us</h3>
                <p>quickfix@gmail.com</p>
              </div>
            </div>
          </div>
          <br />
          <div
            className="row gy-4 mt-1"
            style={{
              background:
                "linear-gradient(to bottom, rgba(1,1,1, 0.2) 70%, rgba(239, 239, 239, 1) 100%)",
                borderRadius:"20px",
                overflow:"hidden"
            }}
          >
            {/* Video Column */}
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{
                position: "relative",
                overflow: "hidden",
                height: "500px",
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  minWidth: "100%",
                  minHeight: "100%",
                  width: "auto",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src="./carvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Form Column */}
            <div className="col-lg-6">
              <form
                onSubmit={handleSubmit}
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay="400"
                style={{
                  padding: "2rem",
                  background: "transparent",
                  borderRadius: "8px",

                  height: "100%",
                }}
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        marginBottom: "1rem",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        marginBottom: "1rem",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        marginBottom: "1rem",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        marginBottom: "1rem",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div className="col-12">
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        marginBottom: "1rem",
                        fontSize: "14px",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <div className="col-md-12 text-center">
                    {loader && (
                      <div className="loading">
                        <Loader />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="sendbtn"
                      style={{
                        background:
                          "linear-gradient(to right, #3498db, #2ecc71)",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "1rem",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                        marginTop: "1rem",
                        width: "100%",
                      }}
                    >
                      Send Message
                    </button>

                    {showSuccess && (
                      <div
                        style={{
                          color: "green",
                          fontSize: "16px",
                          marginTop: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Your message has been sent. Thank You!
                      </div>
                    )}

                    {showError && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "16px",
                          marginTop: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Error in saving data. Please try again.
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <br />
          <br />
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29126.31562328689!2d74.46262685046669!3d16.25587485483899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc093ea3b2d7157%3A0x58670f775c160f63!2sSankeshwar%2C%20Karnataka!5e1!3m2!1sen!2sin!4v1747831973842!5m2!1sen!2sin"
              title="Google maps Location"
              style={{ border: 0, width: "100%", height: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
