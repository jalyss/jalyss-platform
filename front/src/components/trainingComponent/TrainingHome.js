import React from "react";
import "../../assets/styles/training.css";
import bg from "../../img/home.png";
import { Tilt } from "react-tilt";
import { useNavigate } from "react-router-dom";
import Modal from "../Commun/Modal";
import ButtonWithTransformAndHover from "../Commun/buttons/ButtonWithTransformAndHover";

function TrainingHome() {
  const navigate = useNavigate();
  const handleClick = () => {
    var elem = document.getElementById("joinSession");
    elem.scrollIntoView();
  };
  return (
    <div className="container p-4">
      <div className="  d-flex justify-content-center flex-wrap p-3 ">
        <div className="col-lg-6 d-flex justify-content-center align-items-center ">
          <Tilt options={{ max: 35, scale: 1}} >

          <img
            src={bg}
            className="img-fluid imageCoverTrainings"
            style={{ objectFit: "contain" }}
          />
          </Tilt>
        </div>

        <div className=" col-lg-6 p-3 d-flex align-items-center ">
          <div>
            <h6
              style={{ color: "#790BE0", fontSize: "18px", fontWeight: 600 }}
              className="mt-3"
            >
              Knowledge Unites: Share or Receive, Ignite Growth!
            </h6>
            <h2 className="fw-bold" style={{ fontSize: "36px" }}>
              Empower. Mentor. Learn. Grow. Join Today!
            </h2>
            <p style={{ fontWeight: 500 }} className="fs-4">
              Elevate Your Journey: Be a Mentor or Embrace Learning as a
              Student!"
            </p>
            <div className="d-flex  align-items-center gap-2 mt-4">
              <ButtonWithTransformAndHover
                onClick={() => navigate(`/mentor`)}
                title={"Become mentor"}
                full={true}
              />
              <ButtonWithTransformAndHover title={"Join Session"} onClick={handleClick}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingHome;
