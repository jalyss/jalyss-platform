import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { testimonal } from '../dummydata';
import TrainingHeading from './TrainingHeading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const TrainingTestimonial = () => {
  return (
    <>
      <TrainingHeading subtitle="TESTIMONIAL" title="Our Successful Jalysset" />
      <section className="testimonal padding">
        <div className="container">
          <Carousel showThumbs={false} showArrows={true} showStatus={true} showIndicators={true} dynamicHeight={false} infiniteLoop={true} centerMode={true} centerSlidePercentage={33.33} emulateTouch={true} swipeScrollTolerance={5} selectedItem={1} className="carousel-wrapper">
            {testimonal.map((e, index) => (
              <div key={index} >
                <div className="">
                  <div className="img">
                    <img src={e.cover} alt="taswira" className="img-fluid"  style={{ width: "100px", height: "100px" }}/>
                  </div>
                  <div className="name">
                    <h2>{e.name}</h2>
                    <span className="epost">{e.post}</span>
                  </div>
                </div>
                <p className="d-flex justify-content-center align-items-center mb-5">{e.desc}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default TrainingTestimonial;
