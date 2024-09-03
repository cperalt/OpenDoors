import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/career-generator" element={<CareerGenerator />} /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
