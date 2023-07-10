import React from "react";

import TrainingHeading from "../Commun/TrainingHeading";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createTrainingBooking } from "../../store/trainingBooking";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Modal from "../Commun/Modal";
import { useState } from "react";
import DisplayLottie from './../../pages/DisplayLottie';
import warning from "../../constants/warning.json"
import done from "../../constants/done.json"

const TrainingPricing = ({ session }) => {
  const [basicModal,setBasicModal]=useState(false)
  const [isError, setIsError] = useState(false);
  const toggleShow=()=>{
 setBasicModal(!basicModal)
  }

const dispatch=useDispatch()
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
                id="basic-primary-trigger"
                onClick={async () => {
                  try {
                    const res = await dispatch(createTrainingBooking({ sessionTarifId: elem.id }));
                    if (res.error) {
                      showErrorToast(res.error.message);
                      setIsError(true)
                      toggleShow()

                    } else {
                      showSuccessToast("Reservation done!");
                     toggleShow()
                    }
                  } catch (error) {
                    showErrorToast(error.message);
                    setIsError(true)
                  }
                }}
                
                
              >
                Subscribe
              </button>
            </div>
          </div>
        ))}
      <Modal
  setBasicModal={setBasicModal}
  basicModal={basicModal}
  toggleShow={toggleShow}
  body={isError ?(
    <div className="d-flex flex-column justify-content-center align-items-center mb-3">
<DisplayLottie animationData={warning} style={{ width: "120px", height: "120px" }}  />
<span>You are alredy Subscribed !</span>
    </div>
    
    ):(  <div className="d-flex flex-column justify-content-center align-items-center mb-3">
    <DisplayLottie animationData={done} style={{ width: "120px", height: "120px" }}  />
    <div className="text-center">Reservation has been created successfully. We will contact you soon for the confirmation.</div>
        </div>)}
  normal={true}
  title={isError ? "Error":"Success Reservation"}
  withoutSave={true}
/>
                       
   
      </div>
    </div>
  );
};

export default TrainingPricing;
