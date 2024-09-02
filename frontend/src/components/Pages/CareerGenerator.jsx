import React, { useEffect, useState } from "react";
import "../CSS/CareerGenerator.css";

const CareerGenerator = () => {
  const [highschoolyr, setHighschoolyr] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [careerAspirations, setCareerAspirations] = useState("");
  const [institution, setInstitution] = useState("");
  const [city, setCity] = useState("");
  const [career, setCareer] = useState(null);

  const generateCareer = async () => {
    const response = await fetch("http://localhost:3000/fake-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        highschoolyr,
        learningStyle,
        careerAspirations,
        institution,
        city,
      }),
    });
    const data = await response.json();
    if (data) {
      setCareer(data);
    } else {
      console.error("careerSuggestion is undefined in the response data");
    }
    console.log("returned data ", data);
    console.log("career ", career);
  };

  useEffect(() => {
    console.log("Career state updated:", career);
  }, [career]);

  return (
    <div className="career-generator-container">
      <h1>Career Generator</h1>
      <input
        type="text"
        placeholder="Grade Level"
        value={highschoolyr}
        onChange={(e) => setHighschoolyr(e.target.value)}
      />
      <input
        type="text"
        placeholder="Learning Style"
        value={learningStyle}
        onChange={(e) => setLearningStyle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Career Interest"
        value={careerAspirations}
        onChange={(e) => setCareerAspirations(e.target.value)}
      />
      <input
        type="text"
        placeholder="Institutions"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={generateCareer}>Generate Career</button>
      {career && (
        <div>
          <h1>{career.careerPathway.title}</h1>
          <p>{career.careerPathway.description}</p>
          <h2>Steps</h2>
          <ul>
            {career.careerPathway.steps.map((step, index) => (
              <li key={index}>
                <h3>{step.stage}</h3>
                <ul>
                  {step.activities.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <h2>Job Types</h2>
          <ul>
            {career.careerPathway.jobTypes.map((jobType, index) => (
              <li key={index}>{jobType}</li>
            ))}
          </ul>
          <h2>Resources</h2>
          <p>Location: {career.resources.location}</p>
          <h3>Educational Resources</h3>
          <ul>
            {career.resources.educationalResources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
          <h3>Scholarships and Grants</h3>
          <ul>
            {career.resources.scholarshipsAndGrants.map(
              (scholarship, index) => (
                <li key={index}>
                  <a
                    href={scholarship.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {scholarship.name}
                  </a>
                </li>
              )
            )}
          </ul>
          <h3>Career Resources</h3>
          <ul>
            {career.resources.careerResources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CareerGenerator;
