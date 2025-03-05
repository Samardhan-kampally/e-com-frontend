import React from "react";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
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
      <div>
      AdminDashboard
      </div>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
