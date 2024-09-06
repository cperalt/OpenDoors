import React, { useEffect, useState } from "react";
import "../CSS/CareerGenerator.css";
import background2 from '../images/career-background.svg'

const CareerGenerator = () => {
  const [highschoolyr, setHighschoolyr] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [careerAspirations, setCareerAspirations] = useState("");
  const [institution, setInstitution] = useState("");
  const [city, setCity] = useState("");
  const [career, setCareer] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!highschoolyr) newErrors.highschoolyr = "Highschool year is required.";
    if (!learningStyle) newErrors.learningStyle = "Learning style is required.";
    if (!careerAspirations)
      newErrors.careerAspirations = "Career aspirations are required.";
    if (!institution) newErrors.institution = "Institution is required.";
    if (!city) newErrors.city = "City is required.";
    return newErrors;
  };

  const generateCareer = async (jobType = null) => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:3030/submit-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          highschoolyr,
          learningStyle,
          careerAspirations: jobType || careerAspirations,
          institution,
          city,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        setCareer(data);
        console.log("Career data set successfully");
      } else {
        console.error("careerSuggestion is undefined in the response data");
      }
      console.log("Returned data: ", data);
    } catch (error) {
      console.error("Error fetching career data:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (career !== null) {
      console.log("Career state updated:", career);
    }
  }, [career]);

  return(
    <div className="generator">
      <div className="career-generator-container">
      <h1>Career Generator</h1>
      <label>Highschool Year</label>
      <select
        className="form-control"
        name="highschoolyr"
        value={highschoolyr}
        onChange={(e) => setHighschoolyr(e.target.value)}
      >
        <option value=""></option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="graduate">Graduate</option>
        <option value="other">Other</option>
      </select>
      {errors.highschoolyr && <p className="error">{errors.highschoolyr}</p>}

      <label>Learning Style</label>
      <select
        className="form-control"
        name="learningStyle"
        value={learningStyle}
        onChange={(e) => setLearningStyle(e.target.value)}
      >
        <option value=""></option>
        <option value="auditory">Auditory</option>
        <option value="read/write">Read/Write</option>
        <option value="kinaesthetic">Kinaesthetic</option>
        <option value="visual">Visual</option>
        <option value="other">Other</option>
      </select>
      {errors.learningStyle && <p className="error">{errors.learningStyle}</p>}

      <label>Career Aspirations</label>
      <input
        type="text"
        placeholder="Career Interest"
        value={careerAspirations}
        onChange={(e) => setCareerAspirations(e.target.value)}
      />
      {errors.careerAspirations && (
        <p className="error">{errors.careerAspirations}</p>
      )}

      <label>Institution</label>
      <select
        className="form-control"
        name="institution"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
      >
        <option value=""></option>
        <option value="apprenticeship">Apprenticeship</option>
        <option value="college">College</option>
        <option value="vocational">Vocational/Trade School</option>
        <option value="technicalEducation">Certification</option>
        <option value="bootCamp">Boot Camp</option>
        <option value="other">Other</option>
      </select>
      {errors.institution && <p className="error">{errors.institution}</p>}

      <label>City, State</label>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {errors.city && <p className="error">{errors.city}</p>}

      <button
        onClick={() => generateCareer()}
        disabled={isGenerating}
        style={{ marginBottom: "15%" }}
      >
        {isGenerating ? "Generating..." : "Generate Career"}
      </button>

      {career && career.careerPathway && (
        <div className="result-container">
          <h1>{career.careerPathway.title}</h1>
          <p>{career.careerPathway.description}</p>
          <div className="divider-results">
            <h2>Steps</h2>
            <ol>
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
            </ol>
          </div>
          <div className="divider-results">
            <h2>Job Types</h2>
            <ul>
              {career.careerPathway.jobTypes.map((jobType, index) => (
                <li
                  key={index}
                  onClick={() => generateCareer(jobType)}
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {jobType}
                </li>
              ))}
            </ul>
          </div>
          <div className="divider-results">
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
          </div>
          <div className="divider-results">
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
          </div>
          <div className="divider-results">
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
        </div>
      )}
    </div>
    </div>
  );
};

export default CareerGenerator;
