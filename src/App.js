import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import CartService from "./components/cart/CartService";
import { AuthProvider } from "./services/auth-service/AuthContext";
import { NotificationProvider } from "./services/notification/NotificationProvider";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Navbar />
        <Outlet />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
