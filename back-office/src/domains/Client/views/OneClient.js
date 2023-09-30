import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import background from "../../../assets/images/background-profile.png";
import userImage from "../../../assets/images/user.png";
import css from "../../../assets/styles/clientProfile.css";
const OneClient = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        width: "100%",
        height: "100%",
        padding: "2rem",
      }}
      className="d-flex"
    >
      <div className="card card_info d-flex flex-column justify-content-between">
        <div>
          <img className="card_avatar" src={userImage}></img>
        </div>
        <div className="d-flex justify-content-between">
          <p className="small card_para_main">fullName</p>
          <p className="small">jdidi daoud</p>
        </div>
        <hr className="hr_separator" />
        <div className="d-flex justify-content-between">
          <p className="small card_para_main">Adress</p>
          <p className="small">240 beni khalled nabeul</p>
        </div>
        <hr className="hr_separator" />

        <div className="d-flex justify-content-between">
          <p className="small card_para_main">Job title</p>
          <p className="small">instructor</p>
        </div>
        <hr className="hr_separator" />

        <div className="d-flex justify-content-between">
          <p className="small card_para_main">Number</p>
          <p className="small">+216 5464 646</p>
        </div>
        <button type="button" className="btn btn-outline-danger">
          Edit
        </button>
      </div>
      <div>hello</div>
    </div>
  );
};
export default OneClient;
