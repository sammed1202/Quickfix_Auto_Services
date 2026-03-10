import gsap from "gsap";
import { useEffect, useRef } from "react";

const CustomCursor = (props) => {
    const cursorRef=useRef(null);
  useEffect(() => {
    const cursorAnimate = (event) => {
        
      gsap.to(cursorRef.current, {
        x: event.x,
        y: event.y,
        ease:"none",
        
        duration:0
      });
    };
   
    window.addEventListener("mousemove",cursorAnimate);
   
    return ()=>window.removeEventListener("mousemove",cursorAnimate);
  },[]);

  return (
    <>
      <style>{`
    #main{
    height:100%;
    width:100%;
    position:fixed;
    z-index:${props.index};
    }
    #cursor{
    max-height:400px;
    max-width:400px;
    height:${props.size};
    width:${props.size};
    border-radius:50%;
    background:${props.color};
    z-index:${props.index};
    position:fixed;
    box-shadow:0px 0px 65px ${props.color};
    top:0;
    left:0;
    pointer-events:none;
    }

    
    `}</style>
      <div id="main" >
        <div id="cursor" ref={cursorRef}></div>
      </div>
    </>
  );
};

export default CustomCursor;
