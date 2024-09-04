import React from "react";
import './CSS/Footer.css'; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content-list">
        <ul>
          <li><a href="/">About Us</a></li>
          <li><a href="/">Blog</a></li>
          <li><a href="/">Careers</a></li>
          <li><a href="/">Partnerships</a></li>
          <li><a href="/">Data</a></li>
          <li><a href="/">Help</a></li>
          <li><a href="/">Support</a></li>
          <li><a href="/">Advertise</a></li>
          <li><a href="/">Privacy Policy</a></li>
          <li><a href="/">User Agreement</a></li>
          <li><a href="/">Web Accessibility</a></li>
          <li><a href="/">Cookie Policy</a></li>
          <li><a href="/">DataBase powered by</a></li>
          <li><a href="/">Powered By Vercel</a></li>
        </ul>
      </div>
      <div className="content-list-links">
        <h3>QUICK LINKS</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Career Generator</a></li>
          <li><a href="/">Contact Us</a></li>
          <li><a href="/">LogIn</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 All Rights Reserved.</p>
      </div>
    </footer>
  );
}

