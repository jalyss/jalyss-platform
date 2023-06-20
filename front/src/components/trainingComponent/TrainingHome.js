import React from "react";
import "../../assets/styles/training.css"
import bg from "../../img/home.png";
import { Tilt } from "react-tilt";
import { useNavigate } from 'react-router-dom';

import ButtonWithTransformAndHover from "../Commun/buttons/ButtonWithTransformAndHover";

function TrainingHome() {
  const navigate=useNavigate()
  return (
    <>
      <section class="d-flex flex-wrap gap-5 align-items-center">
      <div class="home-img">
          <Tilt options={{ max: 35, scale: 1 }}>
            <img src={bg} className="img-fluid" />
          </Tilt>
        </div>
        <div class="home-text">
          <h6>Knowledge Unites: Share or Receive, Ignite Growth !</h6>
          <h2>Empower. Mentor. Learn. Grow. Join Today!</h2>
          <p>
            {" "}
            "Elevate Your Journey: Be a Mentor or Embrace Learning as a
            Student!"
          </p>
          <div className="d-flex">
            <ButtonWithTransformAndHover onClick={() => navigate(`/mentor`)} title={"Become mentor"} full={true}/>
            <ButtonWithTransformAndHover title={"Join Session"} /> 
          </div>
        </div>
     
      </section>
    </>
  );
}

export default TrainingHome;
