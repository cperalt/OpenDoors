import React, { useState } from "react";
import "../CSS/Settings.css";
export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "English",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form>
        <div className="form-group">
          <label htmlFor="notifications">Notifications:</label>
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="darkMode">Dark Mode:</label>
          <input
            type="checkbox"
            id="darkMode"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="language">Language:</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </form>
    </div>
  );
}
