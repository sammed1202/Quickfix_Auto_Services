import React from "react";
import UserLayout from "./UserLayout";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  if (!email) {
    console.log(email);
    alert("go to login");
    navigate("/login");
  }
  console.log(email);
  return (
    <div>
      <UserLayout />
    </div>
  );
};

export default User;
