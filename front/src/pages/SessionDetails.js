import React, { useState } from "react";
import {
  learningTopics,
  additionalInformation,
  lectures,
  navData,
} from "../dummydata";
import { courses } from "../dummydata";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import TrainingHeading from "../components/TrainingHeading";
import TrainingPricing from "../components/trainingComponent/TrainingPricing";

import KeyValueStyled from "../components/trainingComponent/KeyValueStyled";
import PreviousSessionGallery from "../components/trainingComponent/PreviousSessionGallery";
import FeedBack from "../components/trainingComponent/FeedBack";

function SessionDetails() {
  const { sessionId } = useParams();
  const seletedSession = courses[sessionId];
  const [showMore, setShowMore] = useState(false);
  const [showMoree, setShowMoree] = useState(false);

  const navigate = useNavigate();

  const columnCount = Math.ceil(learningTopics.length / 2);
  const column1 = learningTopics.slice(0, columnCount);
  const column2 = learningTopics.slice(columnCount);

  const displayColumn1 = showMore ? column1 : column1.slice(0, 5);
  const displayColumn2 = showMore ? column2 : column2.slice(0, 5);
  const visibleLectures = showMoree ? lectures : lectures.slice(0, 2);
  return (
    <div className="container">
      <div className="goBackLink" onClick={() => navigate(-1)}>
        <span> &#8592;</span> <span>Go Back</span>
      </div>
      <div className="d-flex flex-wrap justify-content-around gap-5 mb-5 mt-5">
        <div>
          <div
            className="fs-2 mb-2 mt-4"
            style={{
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {seletedSession.title}
          </div>

          <KeyValueStyled label="Category" value={seletedSession.category} />
          <KeyValueStyled label="Duration" value={seletedSession.duration} />

          <KeyValueStyled label="StartAt" value={seletedSession.startTime} />

          <KeyValueStyled label="endAt" value={seletedSession.endTime} />

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
        </div>
        <img
          src={seletedSession.cover}
          alt="sessionCover"
          className="rounded img-fluid"
          style={{ marginLeft: "70px" }}
        />
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
      </div>

      <TrainingHeading
        subtitle="SESSION'S LECTURES"
        title="Explore our lectures"
        mt={20}
        mb={20}
      />
      <div style={{ backgroundColor: "#f5e6fe" }}>
        {visibleLectures.map((element, indexx) => (
          <MDBCard className="mt-2" key={indexx}>
            <MDBCardBody>
              <MDBCardTitle>
                {" "}
                <div className="text-center mb-3">{element.title}</div>
              </MDBCardTitle>
              <MDBCardText>
                <KeyValueStyled label="content" value={element.content} />
                <div className="d-flex gap-3">
                  <div className="d-flex align-items-center fw-bold">
                    Coaches:
                  </div>
                  {element.coaches.map((coach, coachIndex) => (
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

                <KeyValueStyled
                  label="What you will learn"
                  value={element.whatYouWillLearn}
                />

                <KeyValueStyled label="Date" value={element.date} />

                <KeyValueStyled label="StartAt" value={element.startAt} />
                <KeyValueStyled label="EndAt" value={element.endAt} />
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        ))}
        {lectures.length > 2 && (
          <div className="text-center mt-3">
            <button
              className="btn btn-link"
              style={{ color: "#000" }}
              onClick={() => setShowMoree(!showMoree)}
            >
              {showMoree ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
      <TrainingPricing />
      <PreviousSessionGallery/>
      <FeedBack/>
    </div>
  );
}

export default SessionDetails;
