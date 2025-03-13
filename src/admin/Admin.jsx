import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth-service/AuthContext";
import "./Admin.css"

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin,setAdmin]=useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem("USERROLE")=== "ADMIN" 
    const token = localStorage.getItem("TOKEN");
    if(role && token){
      setIsLoggedIn(true)
      setAdmin(true)
      console.log(true,"have Access")
return
    }else{
    navigate("/login")
    setAdmin(false)
    setIsLoggedIn(false);
    console.log(false,"Login Again")
    alert("You must be an admin to access this page -- Please Login")
    
    }
  }, []);

  
  if (!admin) {
    return <div>You must be an admin to access this page</div>;
  }


  return (
    <div>
      {/* Admin */}
      <nav className="admin-navbar">
        <div className="admin-navbar-container">
          <Link to="/admin/dashboard" className="navbar-logo">
            ADMIN
          </Link>

          <div className="admin-navbar-links">
            <div className="admin-navbar-auth">
              {isLoggedIn && localStorage.getItem("USERROLE") === "ADMIN" ? (
                <div className="">
                  <Link to="/admin/category">Category</Link>
                  <Link to="/admin/product">Product</Link>
                  {/* <Link to="/category/books">Books</Link> */}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Admin;
