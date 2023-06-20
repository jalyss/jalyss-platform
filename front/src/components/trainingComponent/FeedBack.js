import React from 'react';
import TrainingHeading from '../Commun/TrainingHeading';
import like from '../../img/like.png';
import { FeedBacks } from '../../dummydata';

function FeedBack() {
 

  return (
    <div className="mb-5">
      <TrainingHeading subtitle="Previous Session Feedback" title="Wanna Be one of them!" mt={20} mb={40} />
      <div className="containerrr justify-content-center mt-5 border-left border-right py-4">
        <div className="d-flex flex-column justify-content-center align-items-center gap-3 py-2">
          {FeedBacks.map((elem, idx) => (
            <div className="second py-3 px-3" key={idx}>
              <div style={{ color: '#56575b' }}>{elem.note}</div>
              <div className="d-flex justify-content-between py-1 pt-2">
                <div className="d-flex mt-2 gap-2">
                  <img src={elem.profileImage} width="50" height="50" className="rounded-circle" alt="Profile" />
                  <div className="text2 mt-3" style={{ fontWeight: 'bold' }}>
                    {elem.author}
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`text3 ${elem.isUpvoted ? 'text3o' : ''}` } style={{ marginTop: '70px' }}>
                    Upvote?
                  </span>
                  <span
                    onClick={() => handleUpvote(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={like}
                      height="35"
                      width="35"
                      style={{ marginBottom: '10px', marginLeft: '10px' }}
                      alt="Like"
                    />
                  </span>
                  <span className={`text4 mx-2 ${elem.isUpvoted ? 'text3o' : ''}` }>{elem.upvotes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedBack;
