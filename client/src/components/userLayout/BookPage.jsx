// import React, { useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import { motion } from "framer-motion";
// import styled from "styled-components";

// // Styled components
// const Container = styled.div`
//   max-width: 600px;
//   margin: 2rem auto;
//   padding: 2rem;
//   background: white;
//   border-radius: 16px;
//   box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
// `;

// const Title = styled.h2`
//   color: #2c3e50;
//   margin-bottom: 1.5rem;
//   font-size: 1.8rem;
//   font-weight: 600;
//   position: relative;
//   padding-bottom: 0.5rem;

//   &::after {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 60px;
//     height: 3px;
//     background: linear-gradient(to right, #3498db, #2ecc71);
//     border-radius: 2px;
//   }
// `;

// const StyledForm = styled(Form)`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const FormGroup = styled(Form.Group)`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const FormLabel = styled(Form.Label)`
//   font-size: 0.95rem;
//   color: #2c3e50;
//   font-weight: 500;
// `;

// const FormControl = styled(Form.Control)`
//   padding: 0.8rem 1rem;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   font-size: 1rem;
//   transition: all 0.3s ease;

//   &:focus {
//     border-color: #3498db;
//     box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
//     outline: none;
//   }
// `;

// const FormSelect = styled(Form.Select)`
//   padding: 0.8rem 1rem;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   font-size: 1rem;
//   transition: all 0.3s ease;
//   appearance: none;
//   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
//   background-repeat: no-repeat;
//   background-position: right 0.75rem center;
//   background-size: 16px 12px;

//   &:focus {
//     border-color: #3498db;
//     box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
//     outline: none;
//   }
// `;

// const StyledCheckbox = styled(Form.Check)`
//   .form-check-input {
//     width: 1.2em;
//     height: 1.2em;
//     margin-top: 0.2em;
//     border: 2px solid #3498db;

//     &:checked {
//       background-color: #3498db;
//       border-color: #3498db;
//     }

//     &:focus {
//       box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25);
//     }
//   }

//   .form-check-label {
//     font-weight: 500;
//     color: #2c3e50;
//   }
// `;

// const SubmitButton = styled(Button).attrs({
//   variant: "primary",
// })`
//   padding: 0.8rem 1.5rem;
//   background: linear-gradient(to right, #3498db, #2ecc71);
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   font-weight: 500;
//   transition: all 0.3s ease;
//   align-self: flex-start;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     background: linear-gradient(to right, #2ecc71, #3498db);
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };

// const formItemVariants = {
//   hidden: { opacity: 0, x: -20 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.4,
//     },
//   },
// };

// const BookPage = () => {
//   const { id } = useParams();
//   const [vehicleName, setVehicleName] = useState("");
//   const [issue, setIssue] = useState("");
//   const [customIssue, setCustomIssue] = useState("");
//   const [towingNeeded, setTowingNeeded] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [towing, setTowing] = useState(false);
//   const [image, setImage] = useState(null);
//   const { token } = useAuth();
//   const { state } = useLocation();
//   const userCoords = state?.userCoords;
//   const formData = new FormData();
//   formData.append("shopId", id); 
//   formData.append("vehicleName", vehicleName);
//   formData.append("issue", issue);
//   formData.append("towing", towing);

//   if (image) formData.append("image", image);

//   const issues = [
//     "Puncture",
//     "Engine Failure",
//     "Battery Problem",
//     "Brake Issue",
//     "Oil Leakage",
//     "Other",
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const finalIssue = towingNeeded
//       ? "Towing Required"
//       : issue === "Other"
//       ? customIssue
//       : issue;

//     const bookingData = {
//       shopId: id,
//       vehicleName,
//       issue: finalIssue,
//       towingNeeded,
//       userLat: userCoords?.lat,
//       userLng: userCoords?.lng,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/shop/book",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Booking Success:", res.data);
//       alert("Booking submitted successfully!");
//       // Reset form after successful submission
//       setVehicleName("");
//       setIssue("");
//       setCustomIssue("");
//       setTowingNeeded(false);
//     } catch (error) {
//       console.error("Booking failed:", error);
//       alert("Booking failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Container>
//         <Title>📋 Book Service Form</Title>
//         <StyledForm onSubmit={handleSubmit}>
//           <motion.div variants={formItemVariants}>
//             <FormGroup>
//               <FormLabel>Vehicle Name</FormLabel>
//               <FormControl
//                 type="text"
//                 placeholder="Enter your vehicle name"
//                 value={vehicleName}
//                 onChange={(e) => setVehicleName(e.target.value)}
//                 required
//               />
//             </FormGroup>
//           </motion.div>

//           <motion.div variants={formItemVariants}>
//             <StyledCheckbox
//               type="checkbox"
//               label="Towing Needed?"
//               checked={towingNeeded}
//               onChange={(e) => {
//                 setTowingNeeded(e.target.checked);
//                 if (e.target.checked) {
//                   setIssue("");
//                   setCustomIssue("");
//                 }
//               }}
//             />
//           </motion.div>

//           {!towingNeeded && (
//             <>
//               <motion.div variants={formItemVariants}>
//                 <FormGroup>
//                   <FormLabel>Issue</FormLabel>
//                   <FormSelect
//                     value={issue}
//                     onChange={(e) => setIssue(e.target.value)}
//                     required
//                   >
//                     <option value="">-- Select an issue --</option>
//                     {issues.map((item, index) => (
//                       <option key={index} value={item}>
//                         {item}
//                       </option>
//                     ))}
//                   </FormSelect>
//                 </FormGroup>
//               </motion.div>

//               {issue === "Other" && (
//                 <motion.div
//                   variants={formItemVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   <FormGroup>
//                     <FormLabel>Describe the Issue</FormLabel>
//                     <FormControl
//                       type="text"
//                       placeholder="Describe the problem"
//                       value={customIssue}
//                       onChange={(e) => setCustomIssue(e.target.value)}
//                       required
//                     />
//                   </FormGroup>
//                 </motion.div>
//               )}
//             </>
//           )}
//           <label htmlFor="image">Payment Screenshot (100 Rupees)</label>
//           <input
//             type="file"
//             name="image"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//           <motion.div
//             variants={formItemVariants}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <SubmitButton type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Submit Booking"}
//             </SubmitButton>
//           </motion.div>
//         </StyledForm>
//       </Container>
//     </motion.div>
//   );
// };

// export default BookPage;
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import styled from "styled-components";

// Razorpay script loader
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #3498db, #2ecc71);
    border-radius: 2px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled(Form.Label)`
  font-size: 0.95rem;
  color: #2c3e50;
  font-weight: 500;
`;

const FormControl = styled(Form.Control)`
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const FormSelect = styled(Form.Select)`
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const StyledCheckbox = styled(Form.Check)`
  .form-check-input {
    width: 1.2em;
    height: 1.2em;
    margin-top: 0.2em;
    border: 2px solid #3498db;

    &:checked {
      background-color: #3498db;
      border-color: #3498db;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25);
    }
  }

  .form-check-label {
    font-weight: 500;
    color: #2c3e50;
  }
`;

const SubmitButton = styled(Button).attrs({
  variant: "primary",
})`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(to right, #3498db, #2ecc71);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to right, #2ecc71, #3498db);
  }

  &:active {
    transform: translateY(0);
  }
`;

const formItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const BookPage = () => {
  const { id } = useParams();
  const [vehicleName, setVehicleName] = useState("");
  const [issue, setIssue] = useState("");
  const [customIssue, setCustomIssue] = useState("");
  const [towingNeeded, setTowingNeeded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const { token } = useAuth();
  const { state } = useLocation();
  const userCoords = state?.userCoords;

  const issues = [
    "Puncture",
    "Engine Failure",
    "Battery Problem",
    "Brake Issue",
    "Oil Leakage",
    "Other",
  ];

  // Generate receipt image locally
  const generateReceiptImage = (paymentId) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 500, 300);
      ctx.fillStyle = "#000";
      ctx.font = "20px Arial";
      ctx.fillText("Payment Receipt", 180, 40);
      ctx.font = "16px Arial";
      ctx.fillText(`Payment ID: ${paymentId}`, 50, 100);
      ctx.fillText(`Amount: ₹100`, 50, 140);
      ctx.fillText(`Date: ${new Date().toLocaleString()}`, 50, 180);
      canvas.toBlob((blob) => {
        const file = new File([blob], "payment_receipt.png", {
          type: "image/png",
        });
        resolve(file);
      });
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_xc7S1DH28iB6RI", 
      amount: 100 * 100, // paise
      currency: "INR",
      name: "QuickFix Service",
      description: "Service Booking Payment",
      handler: async function (response) {
        const receiptFile = await generateReceiptImage(response.razorpay_payment_id);
        setImage(receiptFile);
        alert("Payment successful!");
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalIssue = towingNeeded
      ? "Towing Required"
      : issue === "Other"
      ? customIssue
      : issue;

    const formData = new FormData();
    formData.append("shopId", id);
    formData.append("vehicleName", vehicleName);
    formData.append("issue", finalIssue);
    formData.append("towingNeeded", towingNeeded);
    formData.append("userLat", userCoords?.lat);
    formData.append("userLng", userCoords?.lng);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/shop/book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Booking Success:", res.data);
      alert("Booking submitted successfully!");
      setVehicleName("");
      setIssue("");
      setCustomIssue("");
      setTowingNeeded(false);
      setImage(null);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Container>
        <Title>📋 Book Service Form</Title>
        <StyledForm onSubmit={handleSubmit}>
          <motion.div variants={formItemVariants}>
            <FormGroup>
              <FormLabel>Vehicle Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter your vehicle name"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                required
              />
            </FormGroup>
          </motion.div>

          {!towingNeeded && (
            <>
              <motion.div variants={formItemVariants}>
                <FormGroup>
                  <FormLabel>Issue</FormLabel>
                  <FormSelect
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    required
                  >
                    <option value="">-- Select an issue --</option>
                    {issues.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>
              </motion.div>

              {issue === "Other" && (
                <motion.div variants={formItemVariants} initial="hidden" animate="visible">
                  <FormGroup>
                    <FormLabel>Describe the Issue</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Describe the problem"
                      value={customIssue}
                      onChange={(e) => setCustomIssue(e.target.value)}
                      required
                    />
                  </FormGroup>
                </motion.div>
              )}
            </>
          )}
<Button variant="success" type="button" onClick={handlePayment}>
            Pay ₹100
          </Button>
          <label htmlFor="image">Payment Screenshot (₹100)</label>
          <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />

          

          <motion.div variants={formItemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </SubmitButton>
          </motion.div>
        </StyledForm>
      </Container>
    </motion.div>
  );
};

export default BookPage;
