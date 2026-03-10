import React from "react";

const FluidAnimation = () => {
  return (
    <>
      <style>
        {`
        
        #first{
        height:300%;
        width:300%;
       background-image:linear-gradient(
        45deg,
        rgba(236, 188, 188, 0.31),  
        rgba(255, 216, 61, 0.24),  
        rgba(107, 203, 120, 0.24), 
        rgba(141, 184, 245, 0.19),  
        rgba(132, 59, 98, 0.33),
        rgba(247, 110, 217, 0.17),
        rgba(227, 186, 92, 0.22),
        rgba(44, 255, 255, 0.18)
         
);

        box-shadow:0px 0px 20px rgba(235, 201, 63, 0.38);
        animation:rotate 6s linear infinite;
        scale:2;
        }
        @keyframes rotate{
        to{
            transform:rotate(360deg);
        }
        }
        `}
      </style>
      <div
        style={{
          height: "200%",
          width: "200%",
          background: "transparent",
          position: "fixed",
          zIndex: "-10",
          display: "flex",
          alignItems: "center",
          justifyContent:"center",
          margin:"-20vw"
        }}
      >
        <div className="cmp" id="first"></div>
      </div>
    </>
  );
};

export default FluidAnimation;
