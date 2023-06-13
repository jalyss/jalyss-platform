import React from 'react'
import { courses } from '../dummydata'
import { useParams } from 'react-router-dom';

function SessionDetails() {
    const {sessionId} = useParams();
    const seletedSession=courses[sessionId]
    console.log(seletedSession);

  return (
    <div>
      <img src={seletedSession.cover} alt="../img/course3.jpg" />
          <div className="">
            <h3>{seletedSession.title}</h3>
            <h5>{seletedSession.category}</h5>
            <h6>&#9203; {seletedSession.time}</h6>
            <div>
              <h6>Starts at: {seletedSession.startTime}</h6>
              <h6>Ends at: {seletedSession.endTime}</h6>
            </div>
          </div>


    </div>
  )
}

export default SessionDetails
