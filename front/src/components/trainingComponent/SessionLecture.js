import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
// import { lectures } from "../../dummydata";
import TrainingHeading from "../../components/Commun/TrainingHeading";
import KeyValueStyled from "../../components/Commun/KeyValueStyled";
import start from "../../img/start.png";
import end from "../../img/end.png";



function SessionLecture({lectures}) {
 console.log("waaaaaaaaaaaaaaaaaaaha",lectures)
 const [showMore, setShowMore] = useState(false);

let displayLec = showMore? lectures : lectures?.slice(0,2)
  return (
    <div>
      <TrainingHeading
        subtitle="SESSION'S LECTURES"
        title="Explore our lectures"
        mt={20}
        mb={20}
      />

      <div class="container py-5">
        <div class="row">
          <div class="col-md-12">
            <div id="content">
              <ul class="timeline-1 text-black">
                {displayLec?.map((element, indexx) => (
                  <li class="event" 
                  data-date={element.lectures.startAt.slice(0,10)}
                  >
                    <div className="mb-3">
                      <span
                        className=" rounded fs-4"
                        style={{  }}
                      >
                        {element.lectures.title}
                      </span>
                    </div>


                    <KeyValueStyled label="content" value={element.lectures.content} />
                    <div className="d-flex gap-3">
                      <div className="d-flex align-items-center fw-bold">
                        Coaches:
                      </div>
                      {element.lectures.coaching.map((coach, coachIndex) => (
                        <span
                          className="tt mt-2"
                          data-bs-placement="bottom"
                          title={coach.user.fullNameEn}
                        >
                          <img
                            key={coachIndex}
                            src={coach.user?.avatar?.path}
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
                      value={element.lectures.LectureHasWhatYouWillLearn?.map((el)=>{
                      console.log("elmmmmmm",el);
                       return( <div>{el.WhatYouWillLearn.content
                       }</div>)
                      })
                      }
                    />
                    {/* <div className="d-flex  justify-content-between mt-3">
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2 ">   <img src={start} height="20" width="20" alt="icon" />{" "}
                      <div>{element.startAt}</div></div>
                   <div className="d-flex flex-column justify-content-center align-items-center gap-2"><img src={end} height="20" width="20" alt="icon" />{" "}
                      <div>{element.endAt}</div></div>
                      
                    </div> */}
                  </li>
                ))}
                
              </ul>
             
                
                <div className="text-center mt-3">
                  <button
                    className="btn btn-link"
                    style={{ color: "#48184c" }}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore? "Show Less" : "Show More"}
                  </button>
                </div>
              
             
            
        <div className="d-flex justify-content-center align-items-center mt-5">
           
        </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionLecture;
