import React, { Fragment, useState } from "react";


import {
  MDBCard,
  MDBCardBody,
  MDBRadio,
} from "mdb-react-ui-kit";

import Navbar from 'react-bootstrap/Navbar'

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
import one from "../img/mentor6.png"
import two from "../img/mentor4.png"

function MentorPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Fragment>
     {/* <MentorHome/> */}
      <div className="d-flex justify-content-between  align-items-end " style={{backgroundColor:"#fafafa"}}   >
     

       
        
       <img src= {one}   className="img-fluid"  /> 

      
          <MDBCard className=" m-2" >
        
            <MDBCardBody className="px-4 ">
              <h3 className="fw-bold text-center mb-5 mt-4">
                Request Mentor
              </h3>
              <div className="" style={{ fontWeight: "50px" }}>
              Availability and Commitment:
                <hr style={{ left: 0, bottom: 0, marginTop: "5px" }} />
              </div>
             


            
              <div  style={{ fontWeight: "50px" }}>
              Mentoring Experience:

                <hr style={{ left: 0, bottom: 0, marginTop: "5px" }} />
              </div>
              <div className=" mt-5" style={{ fontWeight: "50px" }}>
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
              <div className=" mt-5" style={{ fontWeight: "50px" }}>
                Education
                <hr style={{ left: 0, bottom: 0, marginTop: "5px" }} />
              </div>

           

            
            </MDBCardBody>
          </MDBCard>
      
          <img src= {two}   className=" mt-5 "/> 

        
        </div>

        {/* <div className="" >
        <Navbar.Brand href="/">
            <img
              alt=""
              src="https://jalyss.com/img/prestashop-logo-1610973135.jpg"
            />
          </Navbar.Brand>
    <DisplayLottie animationData={request} />
    <img src="https://jalyss.com/img/prestashop-logo-1610973135.jpg" alt="img" className="mt-5 bg-light" style={{backgroundColor:"#f6f8fb"}}/>
        </div> */}
   
    </Fragment>
  );
}

export default MentorPage;
