import React, { useEffect, useState } from "react";
import bg from "../img/cta-bg.png";
import banner from "../img/cta-banner.jpg";
import { useNavigate } from "react-router-dom";

const TrainingMentor = () => {
  const navigate = useNavigate();
  return (
    <section className="" aria-label="workshop">
      <div className="d-flex  justify-content-center gap-5 ">
        <div className="cta-content">
          <div className="tandb">
            <p className="section-subtitle">Want to share your knowledge?</p>

            <h2 className="h2 section-title">Join Us and Become a Mentor.</h2>
          </div>
          <p className="section-text mt-5">
            Instructors from around the world teach millions of students on{" "}
            <strong>JalyssCom</strong>. We provide the tools and skills to teach
            what you love.
            <br />
            Publish the course you want, in the way you want, and always have
            control of your own content.
          </p>
          <button type="button"  style={{backgroundColor:"#48184c",color:"#fff",width:"120px"}}   class="btn  mt-5">Primary</button>
        </div>
        <img
          src={banner}
          width="580"
          height="380"
          alt="cta banner"
          className="rounded"
        />
      </div>
   
      {/* <a href="#" className="teach">
        <span onClick={() => navigate(`/mentor`)}> REGISTRE NOW &#8594;</span>{" "}
      </a> */}
    </section>
  );
};

export default TrainingMentor;
