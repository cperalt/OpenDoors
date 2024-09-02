import React from "react";
import "./CSS/Footer.css"; // Assuming you will create a CSS file for styling

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="logo1.png" alt="Logo 1" />
        <img src="logo2.png" alt="Logo 2" />
      </div>
      <div className="footer-links">
        <a href="/home">Home</a>
        <a href="/login">Log In</a>
        <a href="/about">About Us</a>
      </div>
    </footer>
  );
}
