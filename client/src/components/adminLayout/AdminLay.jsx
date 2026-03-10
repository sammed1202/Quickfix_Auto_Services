import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import { Outlet } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import FluidAnimation from "../CustomStyles/FluidAnimation";
import CustomCursor from "../CustomStyles/CustomCursor";

const AdminLay = () => {
  const [showOffline, setShowOffline] = useState(false);
  const handleOffline=()=>setShowOffline(true);
  const handleOnline=()=>setShowOffline(false);
  useEffect(() => {
    if(!navigator.onLine)setShowOffline(true);
    window.addEventListener('offline',handleOffline);
    window.addEventListener('online',handleOnline);
    return ()=>{
      window.removeEventListener('offline',handleOffline);
      window.removeEventListener('online',handleOnline);
    }
  }, []);
  
  return (
    <div>
      {showOffline && (
        <div
          style={{
            marginTop: "80px",
            height: "100%",
            padding: "10vw",
            width: "100vw",
            color: "red",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "rgb(34, 34, 36)",
            zIndex: "1000",
          }}
        >
          <h1 style={{ color: "white" }}>
            <MdSignalWifiStatusbarConnectedNoInternet4 />
            &nbsp; &nbsp;you are Offline......
          </h1>
          <pre
            style={{ color: "white", whiteSpace: "wrap", textAlign: "left" }}
          >
            <br></br>
            <strong>No internet</strong>
            <br></br>
            <br />
            Try:<br></br>
            <ul>
              <li>Checking the network cables, modem, and router</li>
              <li>Reconnecting to Wi-Fi</li>
              <li>Running Windows Network Diagnostics</li>
            </ul>
            <br></br>
            ERR_INTERNET_DISCONNECTED
          </pre>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      )}
      <div style={{marginTop:"-20px"}}>
      <AdminNavbar /></div>
      <div style={{minHeight:"100vh"}}>
      <Outlet />
      <CustomCursor color="skyblue" index='-100'/>
      </div>
      <div style={{ minWidth: "100vw" }}>
        <AdminFooter></AdminFooter>
      </div>
    </div>
  );
};

export default AdminLay;
