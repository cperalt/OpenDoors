import React from "react";
import './CSS/Footer.css'; 

export default function Footer() {
  return (
    <footer className="box">
      <div className="box-list">
        <ul>
          <li><a href="/">About Us</a></li>
          <li><a href="/">Blog</a></li>
          <li><a href="/">Careers</a></li>
          <li><a href="/">Partnerships</a></li>
          <li><a href="/">Advertise</a></li>
          <li><a href="/">Data</a></li>
          <li><a href="/">Help</a></li>
          <li><a href="/">Support</a></li>
          <li><a href="/">Web Accessibility</a></li>
          <li><a href="/">Legal & Privacy</a></li>
          <li><a href="/">Terms & Service</a></li>
          <li><a href="/">User Agreement</a></li>
          <li><a href="/">Cookie Setting</a></li>
          <li><a href="/">Cookie Notice</a></li>
        </ul>
      </div>

      <div className="quick-links">
        <p>QUICK LINKS</p>
        <ul>
          <li>Home</li>
          <li>Career Generator</li>
          <li>Contact Us</li>
          <li>Log In</li>
        </ul>
      </div>
    </footer>
  );
};

