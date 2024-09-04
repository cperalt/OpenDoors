import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/HomePage"; // Corrected to HomePage
import Dashboard from "./components/DashboardComponents/Dashboard";
import CareerGenerator from "./components/Pages/CareerGenerator";
import "./App.css"; // Import the CSS file for styling
import Contact from "./components/Pages/Contact";
import Profile from "./components/DashboardComponents/Profile";
import History from "./components/DashboardComponents/History";
import Settings from "./components/DashboardComponents/Settings";
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
                  <Contact />
                </div>
              }
            />
            <Route
              path="/dashboard-profile"
              element={
                <div className="side-by-side">
                  <Dashboard className="dashboard" />
                  <Profile />
                </div>
              }
            />
            <Route
              path="/dashboard-history"
              element={
                <div className="side-by-side">
                  <Dashboard className="dashboard" />
                  <History />
                </div>
              }
            />
            <Route
              path="/dashboard-settings"
              element={
                <div className="side-by-side">
                  <Dashboard className="dashboard" />
                  <Settings />
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
