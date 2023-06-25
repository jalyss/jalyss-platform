import React, { Fragment, useState } from "react";
import {
  FaUser,
  FaBirthdayCake,
  FaEnvelope,
  FaCalendarAlt,
  FaPhoneAlt,
  FaTransgenderAlt,
  FaIdCard,
  FaMapMarkerAlt,
  FaClock,
  FaUniversity,
  FaLayerGroup,
  FaLightbulb,
} from "react-icons/fa";

import StyelSelect from "../components/Commun/inputs/StyelSelect";

import one from "../img/mentor6.png";
import two from "../img/mentor4.png";
import success from "../img/success.png";
import CustomMDBRow from "../components/Commun/inputs/CustomMDBRow";
import CustomMDBCol from "../components/Commun/inputs/CustomMDBCol";
import ButtonWithTransformAndHover from "./../components/Commun/buttons/ButtonWithTransformAndHover";
import CloseButton from "../components/Commun/buttons/CloseButton";
import SaveButton from "../components/Commun/buttons/SaveButton";
import { MDBCol, MDBRadio } from "mdb-react-ui-kit";
import StyledInput from "../components/Commun/inputs/StyledInput";

function MentorPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [invalidInputs, setInvalidInputs] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    uname: "",
    pword: "",
  });

  const steps = [
    {
      label: "Education",
      content: (
        <>
          <div className="fs-5 mt-5" style={{ fontWeight: "50px" }}>
            Education
            <hr
              style={{
                left: 0,
                bottom: 0,
                marginTop: "5px",
                marginBottom: "30px",
              }}
            />
          </div>
          <CustomMDBCol
            Icon1={FaUniversity}
            Icon2={FaLayerGroup}
            label1="College/Institution"
            label2="Department"
          />
        </>
      ),
    },
    {
      label: "Experience and Qualifications",
      content: (
        <div>
          <div className="fs-5 mt-5" style={{ fontWeight: "50px" }}>
            Experience and Qualifications
            <hr
              style={{
                left: 0,
                bottom: 0,
                marginTop: "5px",
                marginBottom: "30px",
              }}
            />
          </div>

          <CustomMDBCol
            Icon1={FaClock}
            Icon2={FaLightbulb}
            label1="Years of experience"
            label2="Mentoring approach"
          />
        </div>
      ),
    },
    {
      label: "Expectations and Commitment",
      content: (
        <div>
          <div className="fs-5 mt-2" style={{ fontWeight: "50px" }}>
            Expectations and Commitment
            <hr
              style={{
                left: 0,
                bottom: 0,
                marginTop: "5px",
                marginBottom: "30px",
              }}
            />
          </div>

          <span>
            Can you adapt your mentoring style to meet specific needs?
          </span>
          <div className="d-flex justify-content-center align-items-center m-2 ">
            <MDBRadio
              name="inlineRadio"
              id="inlineRadio2"
              value="option2"
              label="Yes"
              inline
            />
            <MDBRadio
              name="inlineRadio"
              id="inlineRadio3"
              value="option3"
              label="No"
              inline
            />
          </div>
          <span>Are you open to being interviewed?</span>
          <div className="d-flex justify-content-center align-items-center m-2 ">
            <MDBRadio
              name="inlineRadio"
              id="inlineRadio4"
              value="option4"
              label="Yes"
              inline
            />
            <MDBRadio
              name="inlineRadio"
              id="inlineRadio5"
              value="option5"
              label="No"
              inline
            />
          </div>
        </div>
      ),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check input validity and update invalidInputs state
    if (value.trim() === "") {
      setInvalidInputs((prevInvalidInputs) => [...prevInvalidInputs, name]);
    } else {
      setInvalidInputs((prevInvalidInputs) =>
        prevInvalidInputs.filter((input) => input !== name)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);

    // Display submission message
    setFormSubmitted(true);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const goToNextStep = () => {
    if (invalidInputs.length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <Fragment>
      <div
        className="d-flex justify-content-between align-items-end "
        style={{ backgroundColor: "#fafafa" }}
      >
        {/* <img
          src={one}
          className="img-fluid mentor6"
          style={{ width: "20%", height: "400px" }}
        /> */}
        <div className="container m-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-9 col-md-12">
              <form id="regForm" onSubmit={handleSubmit}>
                <h1 id="register">{!formSubmitted && "Request Mentor"}</h1>
                {formSubmitted ? (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={success} alt="success" className=" mb-4" />
                    <h3>Thank you for submitting your request!</h3>
                    <span>
                      Your information has been saved! we will contact you
                      shortly!
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="all-steps" id="all-steps">
                      {steps.map((step, index) => (
                        <span
                          key={index}
                          className={`step ${
                            index === currentStep ? "active" : ""
                          } ${index < currentStep ? "finish" : ""}`}
                        ></span>
                      ))}
                    </div>
                    <div className="tabcontent">
                      {steps[currentStep].content}
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      {currentStep > 0 && (
                        <div className="">
                          <CloseButton
                            title={"Previous"}
                            onClick={goToPreviousStep}
                            mt={"35px"}
                          />
                        </div>
                      )}
                      {currentStep < steps.length - 1 ? (
                        <div className="">
                          <SaveButton
                            title={"Next"}
                            onClick={goToNextStep}
                            mt={"36px"}
                          />
                        </div>
                      ) : (
                        !formSubmitted && (
                          <button
                            type="submit"
                            className="full"
                            style={{
                              backgroundColor: "#48184c",
                              marginTop: "36px",
                              color: "#fff",
                            }}
                          >
                            Submit
                          </button>
                        )
                      )}
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
        <img
          src={two}
          className="mentor4"
          style={{ width: "30%", height: "350px" }}
        />
      </div>
    </Fragment>
  );
}

export default MentorPage;
