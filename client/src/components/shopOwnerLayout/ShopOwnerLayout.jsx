import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShopOwnerNavbar } from "./ShopOwnerNavbar";
import { GuestFooter } from "../guestLayout/GuestFooter";

// List of navigable routes
const routeList = [
  "/shop-owner",
  "/shop-owner/add-shop",
  "/shop-owner/services",
  "/shop-owner/bookings",
  "/shop-owner/notifications",
  "/shop-owner/profile"
];

export const ShopOwnerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Handle ALT + key shortcuts
  useEffect(() => {
    const handleShortcut = (event) => {
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case "d":
            navigate("/shop-owner");
            break;
          case "m":
            navigate("/shop-owner/add-shop");
            break;
          case "s":
            navigate("/shop-owner/services");
            break;
          case "b":
            navigate("/shop-owner/bookings");
            break;
          case "n":
            navigate("/shop-owner/notifications");
            break;
          case "p":
            navigate("/shop-owner/profile");
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [navigate]);

  // 🔁 Ctrl + Arrow Navigation
  useEffect(() => {
    const handleRoutes = (e) => {
      if (e.ctrlKey) {
        let currentPathIndex = routeList.indexOf(location.pathname);

        if (e.key === "ArrowRight") {
          if (currentPathIndex === routeList.length - 1) currentPathIndex = -1;
          navigate(routeList[currentPathIndex + 1]);
        }
        if (e.key === "ArrowLeft") {
          if (currentPathIndex === 0) currentPathIndex = routeList.length;
          navigate(routeList[currentPathIndex - 1]);
        }
      }
    };

    window.addEventListener("keydown", handleRoutes);
    return () => window.removeEventListener("keydown", handleRoutes);
  }, [location, navigate]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Fixed Header */}
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <ShopOwnerNavbar />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, paddingTop: "100px", paddingBottom: "0px" }}>
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
