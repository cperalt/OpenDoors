import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/HomePage"; // Corrected to HomePage
import Dashboard from "./components/DashboardComponents/Dashboard";
import CareerGenerator from "./components/Pages/CareerGenerator";
import "./App.css"; // Import the CSS file for styling
import Contact from "./components/Pages/Contact";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/careergenerator"
              element={
                <div className="side-by-side">
                  <Dashboard className="dashboard" />
                  <CareerGenerator />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div className="side-by-side">
                  <Dashboard className="dashboard" />
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="side-by-side">
                  <Dashboard className="dashboard" />
                  <Contact />
                </div>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
