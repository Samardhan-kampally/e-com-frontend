import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, type = "info", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span className="notification-message">{message}</span>
      <div
        className="notification-progress"
        style={{ animationDuration: `${duration}ms` }}
      ></div>
    </div>
  );
};

export default Notification;
