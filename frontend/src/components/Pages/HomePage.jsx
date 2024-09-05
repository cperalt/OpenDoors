import React from "react";
import icon1 from "../img/icon1.svg";
import icon2 from "../img/icon2.svg";
import icon3 from "../img/icon3.svg";
import dashboard from "../img/dashboard.png";
import stars from "../img/stars.svg";
import heroimage from "../img/hero-image.jpg";
import divider from "../img/divider.svg";
import divider2 from "../img/divider2.svg";
import "../styling/Homepage.scss";

const HomePage = () => {
  return (
    <main>
      <div className="homepage">
        <div className="hero-section">
          <div className="hero-image">
            <img src={heroimage} alt="hero-image" className="hero-image"></img>
          </div>

          <div className="hero-text">
            <h1>Find a pathway that fits you the best!</h1>
            <p>
              Finding the right career path shouldn’t be overwhelming. From
              exploring different industries to connecting with mentors and
              resources, we make it simple to discover the best pathway for your
              future success.
            </p>
          </div>
      </div>

<div className="divider">
  <img src={divider} alt="divider" className="divider"></img>
</div>

<div className="features-section">
  <h1>Your search is unique. Just like you.</h1>
  <p>
    We give you all of the data, reviews, and insights in one place to
    make your search as easy as possible.
  </p>

  <div className="features">
    <div className="feature-item">
      <img src={icon1} alt="icon1" className="feature-image"></img>
      <h3>No heavy lifting!</h3>
      <p>We do the search so you don't have to.</p>
    </div>

    <div className="feature-item">
      <img src={icon2} alt="icon2" className="feature-image"></img>
      <h3>The good, the bad & the honest!</h3>
      <p>Reviews let you hear honest and holistic views.</p>
    </div>
    <div className="feature-item">
      <img src={icon3} alt="icon3" className="feature-image"></img>
      <h3>Like a glove!</h3>
      <p>We personalize your search!</p>
    </div>

    
  </div>

</div>

<div className="divider">
  <img src={divider2} alt="divider" className="divider2"></img>
</div>

<div className="orange">
  <div className="phone-image">
    <img src={dashboard} alt="phone-image" className="phone-image"></img>
    <img src={stars} alt="stars" className="stars"></img>
  </div>
  <div className="quiz-text">
          <h1>Not sure where to start?</h1>
          <p>
            Tell us what matters most to you and we'll create a custom list of
            schools tailored to fit your needs.
          </p>
          <button className="start-button">Create Profile</button>
          <button className="start-button">Take Quiz</button>
        </div>

</div>


</div>
</main>
    
  );
};

export default HomePage;
