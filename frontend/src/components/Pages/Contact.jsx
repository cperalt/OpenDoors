import React, { useState } from "react";
import "../styling/Contact.scss";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !message || !email || !subject) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      const response = await fetch("https://open-doors-backend.vercel.app/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, // lowercase to match backend expectations
          message,
          email,
          subject,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Form submitted successfully:", responseData);
        setSubmitted(true);
        setName("");
        setMessage("");
        setEmail("");
        setSubject("");
      } else {
        // Attempt to parse the response as JSON
        try {
          const responseData = await response.json();
          setError(responseData.error || "There was an error submitting the form.");
        } catch (err) {
          setError("There was an error submitting the form.");
        }
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setError("There was an error submitting the form.");
    }
  };

  return (
    <div className="contact-page">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      {error && <p style={{ backgroundColor: "black", color: "red" }}>{error}</p>}
      {submitted && <p className="success-message" style={{ backgroundColor: '#4caf51', color: 'white', display: 'flex',justifyContent: 'center', margin: '2%', width: '50%', marginLeft: '25%' }}>Form submitted successfully!</p>}
      </form>
    </div>
  );
};

export default ContactForm;
