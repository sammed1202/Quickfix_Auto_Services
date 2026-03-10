import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "../guestLayout/Login"
import BgAnimation from "../CustomStyles/BgAnimation"
const Feedback = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    // window.scrollTo(0,0);
    fetchFeedbacks();
  }, []);
  const fetchFeedbacks = async () => {
    const res = await axios.get("http://localhost:8000/contact/feedback");
    setFeedback(res.data.feedbacks.reverse());
    console.log(feedback);
  };
  return (
    <div>
      <style>
        {`
            .tableContainer{
            overflow-x:auto;
            width:90vw;
            margin:auto;
            margin-top:100px;
            padding:20px;
            text-align:center;
           
            border-radius:20px;
            }

            

            tr{
                height:50px;
            }
            tr:hover{
            scale:1.04;
            }
            .thead:hover{
                scale:1;
            }
            
            `}
      </style>

        <div className="tableContainer" style={{background:"transparent"}}>
          <h1 style={{ marginBottom: "40px" }}>Feedbacks</h1>
          <div style={{padding:"30px",border:"3px solid grey",borderRadius:"30px"}}>
            <Table striped bordered hover responsive>
              <thead>
                <tr
                  className="thead"
                  style={{
                    fontWeight: "700",
                    fontSize: "20px",
                    textAlign: "left",
                  }}
                >
                  <td>Sl no</td>
                  <td>Name</td>
                  <td>E-mail</td>
                  <td>Subject</td>
                  <td>Message</td>
                </tr>
              </thead>
              <tbody>
                {feedback.map((feedback, index) => (
                  <tr key={feedback._id}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "left" }}>{feedback.name}</td>
                    <td style={{ textAlign: "left" }}>{feedback.email}</td>
                    <td style={{ textAlign: "left" }}>{feedback.subject}</td>
                    <td style={{ textAlign: "left", width: "30vw" }}>
                      {feedback.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      
      
    </div>
  );
};

export default Feedback;
