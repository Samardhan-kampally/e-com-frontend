import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  if (
    !localStorage.getItem("TOKEN") ||
    localStorage.getItem("USERROLE") === "USER"
  ) {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    );
  }
  return (
    <div>
      Admin
      <Outlet />
    </div>
  );
};

export default Admin;
