import React from "react";

const BgAnimation = (props) => {
  return (
    <>
      <style>
        {`
            .cmp{
            height:10vh;
            width:10vh;
            background:white;
            position:absolute;
            bottom:-20vh;
            z-index:0;
            border-radius:1vh;
            }

            #one{
            left:5%; 
            animation:change 3s linear 0s infinite;
            
            }
            #two{
            left:18%; 
            animation:change 4s linear 1.2s infinite;
            z-index:-10;
            }
            #three{
            left:31%; 
            animation:change 4s linear 3s infinite;
            }
            #four{
            left:45%; 
            animation:change 4s linear 0.5s infinite;
            }
            #five{
            right:33%;  
            z-index:-10;
            
            animation:change 4s linear 2.5s infinite;
            }
            #six{
            right:18%; 
            animation:change 4s linear 1s infinite;
            }
            #seven{
            right:5%; 
        
            animation:change 3s linear 2s infinite;
            }
            @media (max-width:768px){
              .cmp{
                height:40px;
                width:40px;
              }
            }
              @media (min-width: 1024px) {
              .cmp {
                height:70px;
                width:70px;
              }
            }
            @keyframes change{
            
            100%{
            transform:rotate(180deg);
            bottom:110vh;
            background:${props.bg};
            }
            }
        `}
      </style>

      <div id="one" className="cmp"></div>
      <div id="two" className="cmp"></div>
      <div id="three" className="cmp"></div>
      <div id="four" className="cmp"></div>
      <div id="five" className="cmp"></div>
      <div id="six" className="cmp"></div>
      <div id="seven" className="cmp"></div>
    </>
  );
};

export default BgAnimation;
