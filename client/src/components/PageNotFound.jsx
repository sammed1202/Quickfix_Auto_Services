import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
    <style>
        {`
        button:hover{
        letter-spacing:2px;
        }
        
        `}
    </style>
      <div style={{ height: "100vh", backgroundPosition: "center" }}>
        <h1
          style={{
            position: "absolute",
            textTransform: "uppercase",
            color: "transparent",
            WebkitTextStroke: "2px grey",
            margin: "30px",
          }}
        >
          QuickFix
        </h1>
        <img
          src="/pageNotFound.jpg"
          alt="donut"
          style={{ height: "100%", width: "100%" }}
        />
        <img src="/kick-out.jpg" alt="" style={{objectFit:"cover",position:"absolute",left:"80%",height:"200px",width:"200px",top:"60%"}}/>
        <button
          className="button"
          style={{
            padding: "6px 22px",
            background: "black",
            color: "white",
            borderRadius: "4px",
            position: "absolute",
            left: "50%",
            top: "90vh",
            transform: "translate(-50%,-50%)",
          }}
          onClick={() => {
            navigate("/home");
          }}
        >
         <AiFillHome /> &nbsp;Home&nbsp;<FaArrowRightLong />
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
