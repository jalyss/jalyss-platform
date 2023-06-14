import React, { useState } from "react";
import {
  learningTopics,
  additionalInformation,
  lectures,
  navData,
} from "../dummydata";

import { courses } from "../dummydata";
import { Outlet, useNavigate, useParams } from "react-router-dom";
// import {learningTopics} from "../dummydata"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Carousel1 from "../components/Carousel1";
import TrainingHeading from "../components/TrainingHeading";

function SessionDetails() {
  const { sessionId } = useParams();
  const seletedSession = courses[sessionId];
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(""); // State to track the active link

  // Function to handle click on a link
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  // Split the learning topics into two columns
  const columnCount = Math.ceil(learningTopics.length / 2);
  const column1 = learningTopics.slice(0, columnCount);
  const column2 = learningTopics.slice(columnCount);

  // State for managing show more/less functionality
  const [showMore, setShowMore] = useState(false);

  // Determine the number of topics to display based on showMore state
  const displayColumn1 = showMore ? column1 : column1.slice(0, 5);
  const displayColumn2 = showMore ? column2 : column2.slice(0, 5);
  return (
    <div className="container">
      <div className="goBackLink" onClick={() => navigate(-1)}>
        <span> &#8592;</span> <span>Go Back</span>
      </div>

      <div className="d-flex flex-wrap justify-content-around gap-3">
        <div
          className="d-flex flex-wrap gap-4"
          style={{ display: "flex", flex: 1 }}
        >
          <MDBCard
            className="text-white mb-3"
            style={{ alignSelf: "start", flex: 1 }}
          >
            <MDBCardHeader style={{ backgroundColor: "#48184c" }}>
              What You Will Learn
            </MDBCardHeader>
            <MDBCardBody style={{ color: "#000" }}>
              <MDBRow>
                <MDBCol>
                  {displayColumn1.map((topic, index) => (
                    <React.Fragment key={index}>
                      <span>&#10003; {topic}</span>
                      <br />
                    </React.Fragment>
                  ))}
                </MDBCol>
                <MDBCol>
                  {displayColumn2.map((topic, index) => (
                    <React.Fragment key={index}>
                      <span>&#10003; {topic}</span>
                      <br />
                    </React.Fragment>
                  ))}
                </MDBCol>
              </MDBRow>
              {!showMore && (column1.length > 5 || column2.length > 5) && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-link"
                    style={{ color: "#48184c" }}
                    onClick={() => setShowMore(true)}
                  >
                    Show More
                  </button>
                </div>
              )}
              {showMore && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-link"
                    style={{ color: "#48184c" }}
                    onClick={() => setShowMore(false)}
                  >
                    Show Less
                  </button>
                </div>
              )}
            </MDBCardBody>
          </MDBCard>
          <MDBCard
            className="text-white mb-3"
            style={{ width: "40%", alignSelf: "start", flex: 1 }}
          >
            <MDBCardHeader
              style={{ backgroundColor: "#edcc3f", color: "#000" }}
            >
              Prérequis
            </MDBCardHeader>
            <MDBCardBody style={{ color: "#000" }}>
              {additionalInformation.map((info, index) => (
                <p key={index}>
                  <span style={{ fontSize: "1.2rem" }}>&#8226;</span> {info}
                </p>
              ))}
            </MDBCardBody>
          </MDBCard>
        </div>

        {/* <div >
          <Card
            cover={seletedSession.cover}
            category={seletedSession.category}
            title={seletedSession.title}
            duration={seletedSession.time}
            startTime={seletedSession.startTime}
            endTime={seletedSession.endTime}
          />
        </div> */}
      </div>
      <TrainingHeading
        subtitle="SESSION'S LECTURES"
        title="Explore our lectures"
      />
      {/* {lectures.map((element, indexx) => ( */}
      <Card className="mt-5">
        <Card.Header>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ color: "#000" }}
          >
            <Nav variant="pills">
              {navData.map((elem, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    onClick={() => {
                      navigate(
                        `/sessions/${seletedSession.id}${elem.path}`,
                        handleLinkClick(elem.path)
                      );
                    }}
                  >
                    <div
                      className={`d-flex flex-column justify-content-center align-items-center ${
                        activeLink === elem.path ? "activee" : ""
                      }`}
                      style={{ color: "#000", width: "190px", height: "" }}
                    >
                      <div className="d-flex justify-content-center mb-2 ">
                        {elem.icon}
                      </div>
                      <div>{elem.nameEn}</div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </Card.Header>
        <Card.Body>
          <Outlet />
        </Card.Body>
      </Card>
      {/* ))} */}
    </div>
  );
}

export default SessionDetails;
