import React from "react";
import './CSS/Footer.css'; 
import logo from "./images/op-logo.png"

export default function Footer() {
  return (
    <footer className="box">
      <div className="box-list">
        <ul>
          <li><a href="/">About Us</a></li>
          <li><a href="/">Blog</a></li>
          <li><a href="/">Advertise</a></li>
          <li className="quick-links">QUICK LINKS</li>
          <li><a href="/">Legal & Privacy</a></li>
          <li><a href="/">Partnerships</a></li>
          <li><a href="/">Cookie Notice</a></li>
          <li><a href="/" className="link">Home</a></li>
          <li><a href="/">Support</a></li>
          <li><a href="/">Help</a></li>
          <li><a href="/">Web Accessibility</a></li>
          <li><a href="/" className="link">Career Generator</a></li>
          <li><a href="/">Terms & Service</a></li>
          <li><a href="/">User Agreement</a></li>
          <li><a href="/">Cookie Setting</a></li>
          <li><a href="/" className="link">Contact Us</a></li>
          <li><a href="/">Careers</a></li>
          <li><a href="/">Data</a></li>
          <li><a href="/">Support</a></li>
          <li><a href="/" className="link">Log In</a></li>
        </ul>
        <p>Copyright © 2024 All Rights Reserved.</p>
      </div>
    <img src={logo} alt="logo" className="logo"></img>
    </footer>
  );
};

