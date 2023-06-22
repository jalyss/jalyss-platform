import React, { Fragment, useState } from "react";


import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBRadio,
} from "mdb-react-ui-kit";
import StyledInput from "../components/Commun/inputs/StyledInput";

import StyelSelect from "../components/Commun/inputs/StyelSelect";
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
} from "react-icons/fa";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomMDBRow from './../components/Commun/inputs/CustomMDBRow';
import MentorHome from './../components/trainingComponent/MentorHome';
import DisplayLottie from './DisplayLottie';
import request from "../constants/request.json"

function MentorPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Fragment>
      {/* <MentorHome /> */}
      {/* <div className="d-flex "> */}
        {/* <div className="col-lg-6 d-flex requestStyle" >
    <DisplayLottie animationData={request}/>

        </div> */}

        <div className=" col-lg-6 d-flex justify-content-center align-items-center m-5">
          <MDBCard className="">
            <MDBCardBody className="px-4 ">
              <h3 className="fw-bold text-center mb-5 mt-4">
                Request Mentor
              </h3>
              <div className="fs-5" style={{ fontWeight: "50px" }}>
              Availability and Commitment:
                <hr style={{ left: 0, bottom: 0, marginTop: "5px" }} />
              </div>
              {/* <CustomMDBRow
                Icon1={FaUser}
                Icon2={FaIdCard}
                label1="Username"
                label2="Lastname"
              /> */}

              {/* <MDBRow className="mt-4">
                <MDBCol md="6" className="d-flex flex-wrap">
                  <FaBirthdayCake
                    style={{ height: "20px", width: "20px"}}
                    className="mt-2 mx-2"
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div style={{width:"220px"}}>
                      <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </div>
                  </LocalizationProvider>
                </MDBCol>

                <MDBCol md="6" className="d-flex flex-wrap ">
                  <FaTransgenderAlt
                    style={{ height: "20px", width: "20px" }}
                    className=" mx-2 mb-2"
                  />
                  <div className="d-flex flex-column ">
                    <h6 className="fw-bold">Gender: </h6>
                    <div className="d-flex flex-wrap">
                      <MDBRadio
                        name="inlineRadio"
                        id="inlineRadio1"
                        value="option1"
                        label="Female"
                        inline
                      />
                      <MDBRadio
                        name="inlineRadio"
                        id="inlineRadio2"
                        value="option2"
                        label="Male"
                        inline
                      />
                      <MDBRadio
                        name="inlineRadio"
                        id="inlineRadio3"
                        value="option3"
                        label="Other"
                        inline
                      />
                    </div>
                  </div>
                </MDBCol>
              </MDBRow> */}
             
              {/* <CustomMDBRow
                Icon1={FaEnvelope}
                Icon2={FaPhoneAlt}
                label1="Email"
                label2="Phone Number"
              /> */}

              {/* <MDBRow className="mt-4">
                <MDBCol md="6" className="d-flex flex-wrap gap-3">
                  <FaMapMarkerAlt
                    style={{ height: "20px", width: "20px" }}
                    className="mt-2 "
                  />
                  <StyledInput label="adress" />
                </MDBCol>
                <MDBCol md="6" className="d-flex flex-wrap gap-3 ">
                 
                  <FaCalendarAlt
                    style={{ height: "20px", width: "20px" }}
                    className="mt-2 mx-2"
                  />
                  <StyelSelect
                    items={[
                      { value: 10, label: "Ten" },
                      { value: 20, label: "Twenty" },
                      { value: 30, label: "Thirty" },
                    ]}
                    label={"Age"}
                  />
                </MDBCol>
              </MDBRow> */}
{/* Are you available for in-person meetings, virtual meetings, or both? */}
              <div className=" fs-5" style={{ fontWeight: "50px" }}>
              How many hours per week can you dedicate to mentoring?
                {/* <hr style={{ left: 0, bottom: 0, marginTop: "5px" }} /> */}
                <div
                  className="d-flex flex-wrap gap-3"
                  style={{ marginTop: "30px" }}
                >
                  {" "}
                  <FaClock
                    style={{ height: "20px", width: "20px" }}
                    className="mt-3 mx-2"
                  />
                  <StyelSelect
                    items={[
                      { value: 10, label: "Ten" },
                      { value: 20, label: "Twenty" },
                      { value: 30, label: "Thirty" },
                    ]}
                    label={"Time"}
                  />
                </div>
              </div>
              <div className="fs-5" style={{ fontWeight: "50px" }}>
              Mentoring Experience:

                <hr style={{ left: 0, bottom: 0, marginTop: "5px" }} />
              </div>
              <div className="fs-5 mt-5" style={{ fontWeight: "50px" }}>
              Have you previously been a mentor?
                <hr style={{ left: 0, bottom: 0, marginTop: "5px" }} />
                <div className="mt-5 mx-2">
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio1"
                    value="option1"
                    label="Yes"
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio2"
                    value="option2"
                    label="No"
                    inline
                  />
                </div>
              </div>
              <div className="fs-5 mt-5" style={{ fontWeight: "50px" }}>
                Education
                <hr style={{ left: 0, bottom: 0, marginTop: "5px" }} />
              </div>

              <CustomMDBRow
                Icon1={FaUniversity}
                Icon2={FaLayerGroup}
                label1="College/Institution"
                label2="Departement"
              />

              <Button
                variant="contained"
                className="mb-4 mt-5"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                size="lg"
              >
                Submit
              </Button>
            </MDBCardBody>
          </MDBCard>
        </div>
      {/* </div> */}
    </Fragment>
  );
}

export default MentorPage;
