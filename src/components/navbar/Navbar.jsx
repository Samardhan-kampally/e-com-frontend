import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { useAuth } from "../../services/auth-service/AuthContext";
import { useSearch } from "../../services/search/SearchContext";

const Navbar = () => {
    const{logout}= useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {searchQuery, setSearchQuery} = useSearch();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on mount
    const token = localStorage.getItem("TOKEN");
    setIsLoggedIn(!!token);

    // Load cart items count (example)
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemsCount(cartItems.length);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    logout()
    // delete axios.defaults.headers.common["Authorization"];
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BAG
        </Link>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search products and categories..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
            {/* <button type="submit">Search</button> */}
        </div>

        <div className="navbar-links">
          <div className="dropdown">
            <button className="dropbtn">Categories ▾</button>
            <div className="dropdown-content">
              <Link to="/category/electronics">Electronics</Link>
              <Link to="/category/clothing">Clothing</Link>
              <Link to="/category/books">Books</Link>
            </div>
          </div>

          <div className="navbar-auth">
            {(isLoggedIn) && (localStorage.getItem("USERROLE") === "ADMIN" || localStorage.getItem("USERROLE") === "USER")? (
              <div className="dropdown">
                <button className="auth-link">
                  
                  Account ▾
                </button>
                <div className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <Link to="/cart" className="navbar-cart">Cart
                    <span className="cart-count">{cartItemsCount}</span>
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="auth-link">
                  Login
                </Link>
                <Link to="/register" className="auth-link">
                  Register
                </Link>
                
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
