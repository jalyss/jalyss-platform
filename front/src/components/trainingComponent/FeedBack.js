import React from 'react';
import TrainingHeading from '../Commun/TrainingHeading';
import like from '../../img/like.png';
import { FeedBacks } from '../../dummydata';
import icon from "../../assets/styles/profile.png"
function FeedBack({session}) {
 console.log("sessFed",session);

  return (
    <div className="mb-5">
      <TrainingHeading subtitle="Previous Session Feedback" title="Wanna Be one of them!" mt={20} mb={40} />
      <div className="containerrr justify-content-center mt-5 border-left border-right py-4">
        <div className="d-flex flex-column justify-content-center align-items-center gap-3 py-2">
          {session?.sessionFeedback.map((elem, idx) => (
            <div className=" d-flex second py-3 px-3 " key={idx}>
              <div className="d-flex justify-content-between gap-4 py-1 pt-2">
                <div className="d-flex flex-column ">
                  
                  <img src={ elem.User.avatar ? elem.User.avatar.path : icon } width="50" height="50" className="rounded-circle" alt="Profile" />
                  <div className="text2 mt-3" style={{ fontWeight: 'bold' }}>
                    {elem.User.fullNameEn}
                  </div>
                </div>
                <div style={{ color: '#56575b' }}>{elem.content}</div>
         
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedBack;
