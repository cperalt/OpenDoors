import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/HomePage"; // Corrected to HomePage
import Dashboard from "./components/DashboardComponents/Dashboard";
import CareerGenerator from "./components/Pages/CareerGenerator";
import "./App.css"; // Import the CSS file for styling
import Contact from "./components/Pages/Contact";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";


export default function App() {
  const { isLoading, error } = useAuth0();

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