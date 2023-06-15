import React from "react";
import "../../assets/styles/training.css"

import bg from "../../img/home.png";
import { Tilt } from "react-tilt";
import { useNavigate } from 'react-router-dom';

function TrainingHome() {
  const navigate=useNavigate()
  return (
    <>
      <section class="home" id="home">
        <div class="home-text">
          <h6>Knowledge Unites: Share or Receive, Ignite Growth !</h6>
          <h2>Empower. Mentor. Learn. Grow. Join Today!</h2>
          <p>
            {" "}
            "Elevate Your Journey: Be a Mentor or Embrace Learning as a
            Student!"
          </p>
          <div className="buttonContainer">
            <button className="primary-btn" onClick={() => navigate(`/mentor`)}>Become Mentor</button>
            <button className="btnn">Join Session</button>
          </div>
        </div>
        <div class="home-img">
          <Tilt options={{ max: 35, scale: 1 }}>
            <img src={bg} />
          </Tilt>
        </div>
      </section>
    </>
  );
}

export default TrainingHome;
