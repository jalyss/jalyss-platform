import React from "react";

import { testimonal } from "../../dummydata";
import TrainingHeading from "../Commun/TrainingHeading";
import Carousel1 from "../Commun/Carousel1";

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
