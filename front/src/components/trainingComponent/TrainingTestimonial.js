import React from "react";

import { testimonal } from "../../dummydata";
import TrainingHeading from "../Commun/TrainingHeading";
import Carousel1 from "./Carousel1";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSessionsFeedbacks } from "../../store/session";

const TrainingTestimonial = () => {
  
  const sessionFeedbacksStore = useSelector((state) => state.session);
  const { feedback } = sessionFeedbacksStore;
 
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchSessionsFeedbacks());
   console.log("feed",feedback);
  }, []);

 
  return (
    <>
      <TrainingHeading subtitle="TESTIMONIAL" title="Our Successful Jalysset" />
      <section className="testimonal padding">
        <div className="container">
          <Carousel1 items={feedback.items} />
          
        
        </div>
      </section>
    </>
  );
};

export default TrainingTestimonial;
