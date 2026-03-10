import React from "react";

const Loader = (props) => {
  return (
    <>
      <style>
        {`
        .parent{
        display:grid;
        justify-content:center;
        align-items:center;

        }
         .loader{
        display:flex;
        justify-content:space-between;
        align-items:center;
        }
        
        .piece{
            height:${props.size};
            width:${props.size};
            border:${props.border} solid ${props.color};
            margin:2px;
            box-sizing:border-box;
        }
        .left{
        animation:leftAnime 1s linear infinite;
        }
         .center{
        animation:centerAnime 1s linear infinite;
        }
         .right{
        animation:rightAnime 1s linear infinite;
        }
        @keyframes centerAnime{
            0%{
                border-radius:2px;
                
            }
            33%{
                border-radius:50%;
                transform:translateY(-30px);
            }
            100%{
                border-radius:2px;
                
            }       
        }
        @keyframes leftAnime{
            0%{
                border-radius:2px;
                transform:rotate(180deg);
            }
            33%{
                border-radius:2px;
                transform:rotate(0deg);
            }
            66%{
                border-radius:0 50%;
            }
            100%{
                border-radius:2px;
            }       
        }
        @keyframes rightAnime{
            0%{
                border-radius:2px;
                transform:rotate(-180deg);
            }
            33%{
                border-radius:2px;
                transform:rotate(0deg);
            }
            66%{
                border-radius:50% 0;
            }
            100%{
                border-radius:2px;
            }       
        }
        
        `}
      </style>
      <div className="parent">
        <div className="loader">
          <div className="piece left"></div>
          <div className="piece center"></div>
          <div className="piece right"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
