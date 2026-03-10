import React from "react";
import { GuestHeader } from "./GuestHeader";
import { GuestFooter } from "./GuestFooter";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const GuestLayout = () => {
  
const routeList=['/home','/about','/services','/contact','/register','/login']
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(()=>{
    const handleShortcut=(event)=>{
      if(event.altKey && event.key.toLowerCase()==='h'){
        navigate('/home');
      }
      if(event.altKey && event.key.toLowerCase()==='a'){
        navigate('/about');
      }
      if(event.altKey && event.key.toLowerCase()==='s'){
        navigate('/services');
      }
      if(event.altKey && event.key.toLowerCase()==='c'){
        navigate('/contact');
      }
      if(event.altKey && event.key.toLowerCase()==='r'){
        navigate('/register');
      }
      if(event.altKey && event.key.toLowerCase()==='l'){
        navigate('/login');
      }

    }
    window.addEventListener('keydown',handleShortcut);
    return ()=> window.removeEventListener(
      'keydown',handleShortcut
    );
  });
  useEffect(()=>{
    const handleRoutes=(e)=>{
      if(e.ctrlKey){
      let currentPath=routeList.indexOf(location.pathname);
      console.log(currentPath);
      console.log("first");
      if(e.key==='ArrowRight'){
        if(currentPath===5)currentPath=-1
        navigate(`${routeList[currentPath+1]}`);
      }
      if( e.key==='ArrowLeft'){
        if(currentPath===0)currentPath=routeList.length;
        navigate(`${routeList[currentPath-1]}`);
      }
    }
  }
    window.addEventListener('keydown',handleRoutes);
    return ()=> window.removeEventListener('keydown',handleRoutes);
  },[location,navigate]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Fixed Header */}
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <GuestHeader />
      </div>
      {/* Main Content (Outlet) */}
      <div style={{ flex: 1, paddingTop: "60px", paddingBottom: "0px" }}>
        <Outlet />
        
        
      </div>
      {/* Fixed Footer */}
      <div
        style={{
          position: "float",
          bottom: 0,
          width: "100%",
          zIndex: 100,
          backgroundColor: "black",
          color: "white",
        }}
      >
        <GuestFooter />
      </div>
    </div>
  );
};
