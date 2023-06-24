import React from "react";
import { price } from "../../dummydata";
import TrainingHeading from "../Commun/TrainingHeading";
import { FaCheck, FaTimes } from "react-icons/fa";

const TrainingPricing = ({ session }) => {
 
  function customSort(arr) {
    // const order = ["Basic", "Pro", "Companies"];
    
    const sortedArr = [...arr];
  
    sortedArr.sort((a, b) => {
      // const indexA = order.indexOf(a.title);
      // const indexB = order.indexOf(b.title);
  
      // return indexA - indexB;
      return a.price - b.price
    });
  
    return sortedArr;
  }

  console.log("priceSession", session);
 let wiw = []
 Array.isArray(session?.tarifs) ? wiw =session?.tarifs : wiw = [] 


console.log("sorted",customSort(wiw))




  return (
    <div id="ele">
      <TrainingHeading
        subtitle="PRICING"
        title="Choose The Right Plan"
        mt={20}
        mb={40}
      />

      <div className="d-flex flex-wrap justify-content-center align-items-center container gap-5 mb-5">
        {customSort(wiw).map((elem, i) => (
          <div className="text-center" key={i}>
            <div className="bg-white p-5 rounded-lg shadow">
              <h1 className="h6 text-uppercase font-weight-bold mb-4">
                {elem.title}
              </h1>
              <h2 className="h1 font-wieght-bold">${elem.price}</h2>
              <div
                className="custom-seperator my-4 mx-auto"
                style={{ backgroundColor: "#48184c" }}
              ></div>
              <ul className="list-unstyled my-5 text-small text-left">
                {(() => {
                  const sortedFeatures = elem.features
                    ?.slice()
                    .sort((a, b) => {
                      if (a.feature.isAvailable && !b.feature.isAvailable) {
                        return -1;
                      } else if (
                        !a.feature.isAvailable &&
                        b.feature.isAvailable
                      ) {
                        return 1;
                      }
                      return 0;
                    });

                  return sortedFeatures.map((element, idx) => (
                    <li
                      className={`mb-3 ${
                        element.feature.isAvailable
                          ? ""
                          : "text-muted text-decoration-line-through"
                      }`}
                      key={idx}
                    >
                      {element.feature.isAvailable ? (
                        <FaCheck color="#48184c" />
                      ) : (
                        <FaTimes color="gray" />
                      )}{" "}
                      {element.feature.label}
                    </li>
                  ));
                })()}
              </ul>
              <button
                className="btn btn-block p-2 shadow rounded-pill "
                style={{
                  backgroundColor: "#48184c",
                  color: "#fff",
                  width: "200px",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPricing;