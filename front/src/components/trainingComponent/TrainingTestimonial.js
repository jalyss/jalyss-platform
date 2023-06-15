import React from "react";

import { testimonal } from "../../dummydata";
import TrainingHeading from "../TrainingHeading";
import Carousel1 from "../Carousel1.js";

const TrainingTestimonial = () => {

  return (
    <>
      <TrainingHeading subtitle="TESTIMONIAL" title="Our Successful Jalysset" />
      <section className="testimonal padding">
        <div className="container">
          <Carousel1 items={testimonal}/>
          
        
        </div>
      </section>
    </>
  );
};

export default TrainingTestimonial;
