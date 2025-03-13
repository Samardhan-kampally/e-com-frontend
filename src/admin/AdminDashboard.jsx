import React from "react";
import { Outlet } from "react-router-dom";
import ProductList from "./ProductList";

const AdminDashboard = () => {

  return (
    <div>
      <div>
      AdminDashboard
      </div>
      <ProductList/>
    </div>
  );
};

export default AdminDashboard;
