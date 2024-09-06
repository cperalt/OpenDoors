import React, { useState } from "react";
import "../CSS/Profile.css";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A passionate developer with a love for coding and problem-solving.",
    profilePicture: "https://via.placeholder.com/150", // Placeholder image URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to a backend)
    console.log("Profile data submitted:", profileData);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={profileData.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <h1>{profileData.name}</h1>
        <p>{profileData.email}</p>
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name: {profileData.name}</label>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: {profileData.email}</label>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio: {profileData.bio}</label>
        </div>
        <div>
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}
