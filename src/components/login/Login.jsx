import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useAuth } from "../../services/auth-service/AuthContext";
import Navbar from "../navbar/Navbar";

const Login = () => {
  
  const {login}=useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const credentials = { username: email, password: password };

    const result = await login(credentials);

    if(result.success){
      // console.log("logged")
      setSuccess("Login successful!");
      // navigate("/");
      setTimeout(() => {
        
      if (localStorage.getItem("TOKEN")  && localStorage.getItem("USERROLE") === "ADMIN") {
        console.log("Welcome Admin")
        navigate("/admin/dashboard");
      } 
      if(localStorage.getItem("TOKEN")  && localStorage.getItem("USERROLE")==="USER"){
        console.log("Welcome User"); 
        navigate("/user/dashboard");
      }
    }, 500);
      
    }else {
      setError(result.message || "Invalid credentials");
    }
  };

   

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
