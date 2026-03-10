// import React, { useEffect, useState } from "react";
// import Tilt from "react-parallax-tilt";
// import AOS from "aos";
// import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Loader from "../CustomStyles/Loader";
// import CustomCursor from "../CustomStyles/CustomCursor";
// import { useAuth } from "../../context/AuthContext";
// const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showError, setShowError] = useState("");
//   const [showSuccess, setShowSuccess] = useState("");
//   const [showLogin, setShowLogin] = useState(false);
//   const [showforgot, setShowForgot] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const navigate = useNavigate();

//   const { login } = useAuth();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleEmail = (event) => {
//     setEmail(event.target.value.trim());
//     if (
//       event.target.value.length >= 10 &&
//       event.target.value.includes("@gmail.com")
//     )
//       setShowForgot(true);
//     else setShowForgot(false);
//   };

//   const handlePassword = (event) => {
//     if (event.target.value.length >= 5 && email.length >= 10)
//       setShowLogin(true);
//     else setShowLogin(false);
//     setPassword(event.target.value);
//   };

//   const handleForgot = async (e) => {
//     e.stopPropagation();
//     if (email.length === 0) {
//       setShowError("please enter email to send temporary password");
//       setShowSuccess("");
//     } else if (email.length <= 10 || !email.includes("@gmail.com")) {
//       setShowError("please enter a valid email");
//       setShowSuccess("");
//     } else {
//       try {
//         setLoader(true);
//         const response = await axios.put(
//           `http://localhost:8000/user/forgotPassword/${email}`
//         );
//         if (response.status === 200) {
//           setShowSuccess("temporary password sent to email");
//           setShowError("");
//         }
//       } catch (error) {
//         setShowError("error in sending temporary password to email");
//       } finally {
//         setLoader(false);
//       }
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     event.stopPropagation();

//     if (email.length === 0 || password.length === 0) {
//       setShowError("Enter email and password before login");
//       setShowSuccess("");
//       return;
//     } else if (email.length <= 10 || !email.includes("@gmail.com")) {
//       setShowError("Enter valid email address");
//       setShowSuccess("");
//       return;
//     }

//     setLoader(true);
//     try {
//       const result = await axios.post("http://localhost:8000/user/login", {
//         email,
//         password,
//       });

//       if (result.status === 200) {
//         const user = result.data.user;
//         const token = result.data.token;
//         console.log(token);
//         const audio = new Audio("/Success_Sound.mp3");
//         audio.play();

//         login({ user, token });
//       }
//     } catch (error) {
//       const audio = new Audio("/Error_Sound.mp3");
//       audio.play();
//       setShowError("Invalid email or Password");
//       setShowSuccess("");
//       if (error.response?.status === 410) {
//         setShowError(error.response.data.message);
//       }
//     } finally {
//       setLoader(false);
//     }
//   };

//   AOS.init({
//     duration: 300,
//     easing: "linear",
//     once: true,
//   });
//   return (
//     <>
//       <style>
//         {`
//         *{
//         transition:all 1s;
//         box-sizing:border-box;
//         user-select:none;
//         }
//       .inputs{
//       background:rgba(255,255,255,0.6);
//       border:1px solid white;
//       }
      
//       .scaleonhover:hover{
//           transition:all 1s;
//           scale:1.07;
//       }
//       `}
//       </style>
//       <CustomCursor color="rgba(255, 255, 255, 1)" size="20px" index="0" />
//       <div
//         style={{
//           height: "100vh",
//           // width:`${props.width}`,
//           display: "grid",
//           placeItems: "center",
//           background: props.bg
//             ? `${props.bg}`
//             : "url(https://i.pinimg.com/736x/1c/ba/38/1cba385973e8c92e544865751b5c5bb3.jpg)",
//           backgroundSize: "cover",
//         }}
//         className="cont"
//       >
//         <Tilt
//           tiltMaxAngleX={10}
//           tiltMaxAngleY={10}
//           scale={1.05}
//           tiltReverse={true}
//           gyroscope={true}
//           gyroscopeMinAngleX={-45}
//           gyroscopeMaxAngleX={45}
//           gyroscopeMinAngleY={-45}
//           gyroscopeMaxAngleY={45}
//         >
//           <Form onSubmit={handleSubmit}>
//             <Container
//               style={{
//                 borderRadius: "20px",
//                 backdropFilter: "blur(8px)",
//                 background: "rgba(1,1,1,0.3)",
//                 padding: "30px",
//                 width: "80vw",
//                 maxWidth: "540px",
//                 border: "2px solid white",
//                 zIndex: "1000",
//                 boxShadow: "0px 0px 40px black",
//               }}
//               data-aos="zoom-in"
//             >
//               {showError && (
//                 <Alert variant="danger" dismissible>
//                   {showError}
//                 </Alert>
//               )}
//               {showSuccess && (
//                 <Alert variant="success" dismissible>
//                   {showSuccess}
//                 </Alert>
//               )}
//               {loader && (
//                 <Loader size="30px" border="6px" color="rgb(0, 0, 0)" />
//               )}
//               <Row>
//                 <Col md={4}>
//                   <Form.Group controlId="exampleForm.ControlInput1">
//                     <h2
//                       className="scaleonhover"
//                       style={{
//                         color: "white",
//                         fontFamily: "dafontSword",
//                         textShadow: "0px 0px 15px black",
//                       }}
//                     >
//                       Log-In
//                     </h2>
//                     <br></br>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <Form.Group controlId="username">
//                     <Form.Control
//                       className="inputs"
//                       type="text"
//                       placeholder="Enter email"
//                       name="email"
//                       value={email}
//                       onChange={handleEmail}
//                       required
//                     />
//                     <br></br>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <Form.Group controlId="password">
//                     <Form.Control
//                       className="inputs"
//                       type="password"
//                       placeholder="Enter Password"
//                       name="password"
//                       value={password}
//                       onChange={handlePassword}
//                     />
//                     <br></br>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 {showforgot && (
//                   <button
//                     className="scaleonhover"
//                     type="button"
//                     style={{
//                       color: "white",
//                       background: "transparent",
//                       border: "none",
//                       textDecoration: "underline",
//                     }}
//                     onClick={handleForgot}
//                   >
//                     Forgot Password?
//                   </button>
//                 )}
//                 {showLogin && (
//                   <Button
//                     variant="primary"
//                     className="scaleonhover"
//                     type="submit"
//                     onClick={handleSubmit}
//                   >
//                     Log-In
//                   </Button>
//                 )}
//                 {/* <Nav.Link as={NavLink} to={"/register"} className="scaleonhover" style={{color:"white",lineHeight:'37px',textDecoration:'underline'}}>
//                 Create your account
//                 </Nav.Link> */}
//               </div>
//             </Container>
//           </Form>
//         </Tilt>
//       </div>
//     </>
//   );
// };

// export default Login;
import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaSignInAlt } from "react-icons/fa";
import { Button, Col, Container, Form, Row, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../CustomStyles/Loader";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");
  const [showSuccess, setShowSuccess] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmail = (event) => {
    setEmail(event.target.value.trim());
    if (
      event.target.value.length >= 10 &&
      event.target.value.includes("@gmail.com")
    )
      setShowForgot(true);
    else setShowForgot(false);
  };

  const handlePassword = (event) => {
    if (event.target.value.length >= 5 && email.length >= 10)
      setShowLogin(true);
    else setShowLogin(false);
    setPassword(event.target.value);
  };

  const handleForgot = async (e) => {
    e.stopPropagation();
    if (email.length === 0) {
      setShowError("Please enter email to send temporary password");
      setShowSuccess("");
    } else if (email.length <= 10 || !email.includes("@gmail.com")) {
      setShowError("Please enter a valid email");
      setShowSuccess("");
    } else {
      try {
        setLoader(true);
        const response = await axios.put(
          `http://localhost:8000/user/forgotPassword/${email}`
        );
        if (response.status === 200) {
          setShowSuccess("Temporary password sent to email");
          setShowError("");
        }
      } catch (error) {
        setShowError("Error in sending temporary password to email");
      } finally {
        setLoader(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (email.length === 0 || password.length === 0) {
      setShowError("Enter email and password before login");
      setShowSuccess("");
      return;
    } else if (email.length <= 10 || !email.includes("@gmail.com")) {
      setShowError("Enter valid email address");
      setShowSuccess("");
      return;
    }

    setLoader(true);
    try {
      const result = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      if (result.status === 200) {
        const user = result.data.user;
        const token = result.data.token;
        login({ user, token });
      }
    } catch (error) {
      setShowError("Invalid email or Password");
      setShowSuccess("");
      if (error.response?.status === 410) {
        setShowError(error.response.data.message);
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-sm" style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">
              <FaSignInAlt className="me-2" />
              Login
            </h2>
            <p className="text-muted">Please enter your credentials</p>
          </div>

          {showError && (
            <Alert variant="danger" dismissible onClose={() => setShowError("")}>
              {showError}
            </Alert>
          )}

          {showSuccess && (
            <Alert variant="success" dismissible onClose={() => setShowSuccess("")}>
              {showSuccess}
            </Alert>
          )}

          {loader && (
            <div className="text-center my-3">
              <Loader size="30px" border="6px" color="#0d6efd" />
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-3">
              {showForgot && (
                <Button
                  variant="link"
                  className="text-decoration-none p-0"
                  onClick={handleForgot}
                >
                  Forgot password?
                </Button>
              )}
              
              {showLogin && (
                <Button variant="primary" type="submit" className="px-4">
                  <FaSignInAlt className="me-2" />
                  Login
                </Button>
              )}
            </div>

            <div className="text-center mt-3">
              <p className="text-muted">
                Don't have an account?{" "}
                <Button variant="link" className="p-0 text-decoration-none" onClick={() => navigate("/register")}>
                  Register here
                </Button>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;