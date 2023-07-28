import React from "react";
import TrainingHeading from "../Commun/TrainingHeading";
import icon from "../../assets/images/profile.png";
import send from "../../assets/images/send.png"

import StyledInput from "../Commun/inputs/StyledInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  createFeedBack,
  fetchFeedBacksBySessionId,
} from "../../store/sessionFeedback";
import { Box, IconButton, TextareaAutosize, Typography } from "@mui/material";
import CloseButton from './../Commun/buttons/CloseButton';
import AddButton from './../Commun/buttons/AddButton'; 
function FeedBack({ previousSesion, subtitle }) {
 console.log("session",previousSesion);
  const [feedBackk, setFeedBackk] = useState("");
  const sessionFeedBacksStore = useSelector((state) => state.sessionFeedback);
  const { feedbacks } = sessionFeedBacksStore;

  const me = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();

  console.log("feed",feedbacks);

  const subscribedIds=[]
previousSesion.tarifs.forEach(element => {
  element.bookings.filter(el=>el.paid===true ).map((elem)=>{
    subscribedIds.push(elem.userId)

  })
});
console.log("subscribedIds",subscribedIds);

  useEffect(() => {
    dispatch(fetchFeedBacksBySessionId(previousSesion.id));
  }, [previousSesion.id]);


  const handleClick = () => {
    if (feedBackk.trim() !== "") {
    dispatch(
      createFeedBack({ content: feedBackk, sessionId: previousSesion.id })
    );
    setFeedBackk("")
    }else{
      return
    }
  };


  return (
    <div className="mb-5">
      <TrainingHeading
        subtitle={subtitle}
        title="Wanna Be one of them!"
        mt={20}
        mb={40}
      />
      <div className="containerrr justify-content-center mt-5 border-left border-right py-4">
        <div className="d-flex flex-column justify-content-center align-items-center gap-3 py-2">
          {feedbacks?.items.map((elem, idx) => (
            <div className=" d-flex second py-3 px-3 " key={idx}>
              <div className="d-flex justify-content-between gap-4 py-1 pt-2">
                <div className="d-flex flex-column ">
                  <img
                    src={elem.User.avatar ? elem.User.avatar.path : icon}
                    width="50"
                    height="50"
                    className="rounded-circle"
                    alt="Profile"
                  />
                  <div className="text2 mt-3" style={{ fontWeight: "bold" }}>
                    {elem.User.fullNameEn}
                  </div>
                </div>
                <div style={{ color: "#56575b" }}>{elem.content}</div>
              </div>
            </div>
          ))}
        </div>
        {subscribedIds.includes(me?.id) && subtitle!=="Previous Session Feedback"  ? (
          
           <div className="mt-5 d-flex justify-content-center">
            <div class="d-flex " style={{width:"70%"}}>
              <img class="rounded-circle shadow-1-strong me-3"
                src={me.avatar.path} alt="avatar" width="40"
                height="40" />
              <div class="form-outline w-100">
                <textarea class="form-control" id="textAreaExample" rows="4"
                 value={feedBackk}
                  style={{background: "#fff"}}
                  onChange={(e) => {
                    setFeedBackk(e.target.value);
                  }}
                  placeholder="Write Your FeedBack !"
                  ></textarea>
               
                <div className="d-flex justify-content-end mt-2">
        <AddButton title="Send"  onClick={handleClick}/>
      </div>
              </div>
            </div>
             
        
     
            {/* <img src={send} style={{width:50,heigh:50,cursor:"pointer"}}  onClick={handleClick}/> */}
   
  
        </div>
      
        
        ):(<></>)}
      
      </div>
    </div>
  );
}

export default FeedBack;
