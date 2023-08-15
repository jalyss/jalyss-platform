import React, { useState, useRef } from "react";
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
import KeyValueStyled from "../components/Commun/KeyValueStyled";
import PreviousSessionGallery from "../components/trainingComponent/PreviousSessionGallery";
import FeedBack from "../components/trainingComponent/FeedBack";
import SessionLecture from "../components/trainingComponent/SessionLecture";
import cardCover from "../img/cardCover.jpg";
import { fetchSession } from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ButtonWithTransformAndHover from "../components/Commun/buttons/ButtonWithTransformAndHover";
// const duration = (seletedSession?.endDate.getTime() - seletedSession?.startDate.getTime())/(1000*3600) get duration in hours
function SessionDetails() {
  const [showMore, setShowMore] = useState(false);

  const { sessionId } = useParams();
  const sessionStore = useSelector((state) => state.session);
  const { session } = sessionStore;
  const seletedSession = session;
  console.log("sel", seletedSession);
  const lec = seletedSession?.lectures;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSession(sessionId));
    window.scrollTo(0, 0);
  }, [sessionId]);

  const handleClick = () => {
    var elem = document.getElementById("ele");
    elem.scrollIntoView();
  };

  const columnCount = Math.ceil(
    session?.SessionHasWhatYouWillLearn?.length / 2
  );

  const column1 = session?.SessionHasWhatYouWillLearn?.slice(0, columnCount);
  const column2 = session?.SessionHasWhatYouWillLearn?.slice(columnCount);
  const displayColumn1 = showMore ? column1 : column1?.slice(0, 5);
  const displayColumn2 = showMore ? column2 : column2?.slice(0, 5);
  const currentDate = new Date();
  const renderedCoaches = new Set();
  
  return (
    <div className="container">
      <div className="goBackLink mt-2" onClick={() => navigate(-1)}>
        <span> &#8592;</span> <span>Go Back</span>
      </div>
      <div className="d-flex flex-wrap justify-content-around  mb-5 mt-5">
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {seletedSession?.cover ? (
            <img
              src={seletedSession.cover.path}
              alt="sessionCover"
              className="img-fluid rounded"
              height={400}
              width={600}
              // style={{
              //   objectFit: "contain",

              // }}
            />
          ) : (
            <img
              src={cardCover}
              alt="sessionCover"
              className="rounded img-fluid"
              height={400}
              width={600}
            />
          )}
        </div>
        <div className="w-30">
          <div
            className="fs-2 mb-2 mt-4"
            style={{
              fontWeight: 600,
            }}
          >
            {seletedSession?.title}
          </div>

          <KeyValueStyled
            label="Category"
            value={seletedSession?.category?.nameEn}
          />
          {/* <KeyValueStyled label="Duration" value={seletedSession?.duration?} /> */}

          <KeyValueStyled
            label="Type"
            value={seletedSession?.sessionType
              ?.map((elem) => elem.sessiontype.titleEn)
              .join(", ")}
          />
          <KeyValueStyled
            label="Number of lectures"
            value={seletedSession?.lectures?.length}
          />

          <KeyValueStyled
            label="Number of students"
            value={seletedSession?.tarifs.reduce((totalBookings, tarif) => {
              const paidBookings = tarif.bookings.filter(
                (booking) => booking.paid === true
              );
              return totalBookings + paidBookings.length;
            }, 0)}
          />

          <div className="coaches gap-3 ">
            <div className="d-flex align-items-center fw-bold">Coaches:</div>
            {seletedSession?.lectures?.map((lecture, lectureIndex) =>
              lecture.lectures.coaching.map((coach, coachIndex) => {
                if (renderedCoaches.has(coach.user.id)) {
                  return null;
                }
                renderedCoaches.add(coach.user.id);
                return (
                  <div key={coachIndex} title={coach.user.fullNameEn}>
                    <img
                      src={coach.user.avatar?.path}
                      alt="avatar"
                      className="rounded-circle col-8"
                      style={{ width: "50px", height: "50px", margin: "0 5px" }}
                    />
                  </div>
                );
              })
            )}
          </div>
          <div className="d-flex  justify-content-between mt-3">
            <div className="d-flex flex-column justify-content-center align-items-center gap-2 ">
              {" "}
              <img src={start} height="20" width="20" alt="icon" />{" "}
              <div>{seletedSession?.startDate.slice(0, 10)}</div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <img src={end} height="20" width="20" alt="icon" />{" "}
              <div>{seletedSession?.endDate.slice(0, 10)}</div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button
              className=" btn mt-3"
              style={{
                backgroundColor: "#48184c",
                alignItems: "center",
                color: "#fff",
              }}
              onClick={handleClick}
            >
              Price Discovery
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-around gap-3">
        <div className="d-flex  gap-4" style={{ display: "flex", flex: 1 }}>
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
                  {displayColumn1?.map((topic, index) => (
                    <div key={index} className="d-flex gap-2 mt-2">
                      <span>&#10003; </span>
                      <div className="">{topic.WhatYouWillLearn.contentEn}</div>
                      <br />
                    </div>
                  ))}
                </MDBCol>
                <MDBCol>
                  {displayColumn2?.map((topic, index) => (
                    <div key={index} className="d-flex gap-2 mt-2">
                      <span>&#10003; </span>
                      <div>{topic.WhatYouWillLearn.contentEn}</div>
                      <br />
                    </div>
                  ))}
                </MDBCol>
              </MDBRow>
              {!showMore && (column1?.length > 5 || column2?.length > 5) && (
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
              {session?.sessionHasPrerequire.map((info, index) => (
                <p key={index}>
                  <span style={{ fontSize: "1.2rem" }}>&#8226;</span>{" "}
                  {info.prerequire.contentEn}
                </p>
              ))}
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>

      <SessionLecture lectures={lec} />
      <TrainingPricing session={session} ref={ref} />
      {session?.previousSesion &&
        currentDate < new Date(session?.startDate) && (
          <PreviousSessionGallery
            previousSesion={session.previousSesion}
            subtitle="Previous Session Gallery"
          />
        )}

      {session?.previousSesion &&
        currentDate > new Date(session?.startDate) && (
          <PreviousSessionGallery
            previousSesion={session}
            subtitle="Session Gallery"
          />
        )}

      {session?.previousSesion &&
        currentDate < new Date(session?.startDate) && (
          <FeedBack
            previousSesion={session.previousSesion}
            subtitle="Previous Session Feedback"
          />
        )}

      {session?.previousSesion &&
        currentDate > new Date(session?.startDate) && (
          <FeedBack previousSesion={session} subtitle="Session Feedback" />
        )}
    </div>
  );
}

export default SessionDetails;
