import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AUTH_Header= "authorization"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // const navigate = useNavigate()

  // useEffect(() => {
  //   const interceptor = axios.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       if (error.response && error.response.status === 401) {
  //         // If token expired or unauthorized, clear auth and redirect to login
  //         logout();
  //         navigate("/login");
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  //   return () => {
  //     axios.interceptors.response.eject(interceptor);
  //   };
  // }, [navigate]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/me");

      setUser(response.data);
    } catch (error) {
      logout();
    }
  };

  const login = async (credentials) => {
    
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        credentials
      );
      setUser(response.data)
      localStorage.removeItem("USERID");
      localStorage.removeItem("USERROLE");

      localStorage.setItem("USERID",response.data.userId)
      localStorage.setItem("USERROLE",response.data.role)

      const tokenLen=response.headers.get(AUTH_Header).length
      const barearToken= response.headers.get(AUTH_Header).substring(7,tokenLen)
      console.log(tokenLen,barearToken)
      
      localStorage.removeItem("TOKEN");
      localStorage.setItem("TOKEN", barearToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      // await fetchUserData();
      return {success:true}
    } catch (error) {
      logout()
      console.log(error)
      if(error.request)
        return {success:false,message:"Server Doesn't Responded"}
      if(error.response.status === 406){
        return {success:false,message: error.response.data || "User is Not Active"}
      }
      
      if(error.response.status === 401){
        return {success:false,message:error.response.data || "Invalid Credentials" }
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USERID");
    localStorage.removeItem("USERROLE");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    return {success:true,message:"logged out Successfully"}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

