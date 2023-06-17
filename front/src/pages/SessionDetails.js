import React, { useState } from "react";
import { learningTopics, additionalInformation, courses } from "../dummydata";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import start from "../img/start.png";
import end from "../img/end.png";
import TrainingPricing from "../components/trainingComponent/TrainingPricing";
import KeyValueStyled from "../components/trainingComponent/KeyValueStyled";
import PreviousSessionGallery from "../components/trainingComponent/PreviousSessionGallery";
import FeedBack from "../components/trainingComponent/FeedBack";
import SessionLecture from "../components/trainingComponent/SessionLecture";

function SessionDetails() {
  const [showMore, setShowMore] = useState(false);
  const { sessionId } = useParams();

  const seletedSession = courses[sessionId];

  const navigate = useNavigate();

  const columnCount = Math.ceil(learningTopics.length / 2);
  const column1 = learningTopics.slice(0, columnCount);
  const column2 = learningTopics.slice(columnCount);
  const displayColumn1 = showMore ? column1 : column1.slice(0, 5);
  const displayColumn2 = showMore ? column2 : column2.slice(0, 5);

  return (
    <div className="container">
      <div className="goBackLink" onClick={() => navigate(-1)}>
        <span> &#8592;</span> <span>Go Back</span>
      </div>
      <div className="d-flex flex-wrap justify-content-around gap-5 mb-5 mt-5">
      <div className="d-flex justify-content-center align-items-center">
          {" "}
          <img
            src={seletedSession.cover}
            alt="sessionCover"
            className="rounded img-fluid"
          />
        </div>
        <div>
          <div
            className="fs-2 mb-2 mt-4"
            style={{
              fontWeight: 600,
            }}
          >
            {seletedSession.title}
          </div>

          <KeyValueStyled label="Category" value={seletedSession.category} />
          <KeyValueStyled label="Duration" value={seletedSession.duration} />

          <KeyValueStyled label="Type" value={seletedSession.type} />
          <KeyValueStyled
            label="Number of lectures"
            value={seletedSession.numberOfLectures}
          />

          <KeyValueStyled
            label=" Number of students"
            value={seletedSession.numberOfLectures}
          />
          <KeyValueStyled label="Type" value={seletedSession.type} />
          <div className="d-flex gap-3">
            <div className="d-flex align-items-center fw-bold">Coaches:</div>
            {seletedSession.coaches.map((coach, coachIndex) => (
              <span
                className="tt mt-2"
                data-bs-placement="bottom"
                title={coach.name}
              >
                <img
                  key={coachIndex}
                  src={coach.avatar}
                  alt="avatar"
                  className="rounded-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "0 5px",
                  }}
                />
              </span>
            ))}
          </div>
          <div className="d-flex  justify-content-between mt-3">
            <div className="d-flex flex-column justify-content-center align-items-center gap-2 ">
              {" "}
              <img src={start} height="20" width="20" alt="icon" />{" "}
              <div>{seletedSession.startTime}</div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <img src={end} height="20" width="20" alt="icon" />{" "}
              <div>{seletedSession.endTime}</div>
            </div>
          </div>
        </div>
       
      </div>
      <div className="d-flex flex-wrap justify-content-around gap-3">
        <div
          className="d-flex  gap-4"
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
      </div>

      <SessionLecture />
      <TrainingPricing />
      <PreviousSessionGallery />
      <FeedBack />
    </div>
  );
}

export default SessionDetails;
