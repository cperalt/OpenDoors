import React, { useState } from "react";
import "../CSS/History.css";

export default function History() {
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      title: "Software Engineer",
      description: "Develop and maintain software applications.",
    },
    {
      id: 2,
      title: "Data Scientist",
      description:
        "Analyze and interpret complex data to help companies make decisions.",
    },
  ]);

  const clearHistory = () => {
    setHistoryItems([]);
  };

  return (
    <div className="career-generator-container">
      <h1>History</h1>
      {historyItems.length > 0 ? (
        <ul>
          {historyItems.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}
      <button onClick={clearHistory}>Clear History</button>
    </div>
  );
}
