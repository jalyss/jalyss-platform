import React from "react";
import { price } from "../../dummydata";
import TrainingHeading from "../TrainingHeading";
import { FaCheck, FaTimes } from "react-icons/fa";

const TrainingPricing = () => {
  return (
    <>
      <TrainingHeading
        subtitle="PRICING"
        title="Choose The Right Plan"
        mt={20}
        mb={40}
      />

<div className="d-flex flex-wrap justify-content-center align-items-center container gap-5 mb-5" >
  {price.map((elem, i) => (
    <div className="text-center" key={i}>
      <div className="bg-white p-5 rounded-lg shadow">
        <h1 className="h6 text-uppercase font-weight-bold mb-4">
          {elem.name}
        </h1>
        <h2 className="h1 font-wieght-bold">${elem.price}</h2>
        <div className="custom-seperator my-4 mx-auto " style={{backgroundColor:"#48184c"}}> </div>
        <ul className="list-unstyled my-5 text-small text-left">
          {elem.features.map((element, idx) => (
            <li
              className={`mb-3 ${
                element.isAvailable
                  ? ""
                  : "text-muted text-decoration-line-through"
              }`}
              key={idx}
            >
              {element.isAvailable ? (
                <FaCheck color="#48184c" />
              ) : (
                <FaTimes color="gray" />
              )}{" "}
              {element.label}
            </li>
          ))}
        </ul>
        <button className="btn btn-block p-2 shadow rounded-pill " style={{backgroundColor:"#48184c",color:"#fff",width:"200px"}}>
          Subscribe
        </button>
      </div>
    </div>
  ))}
</div>


    </>
  );
};

export default TrainingPricing;
