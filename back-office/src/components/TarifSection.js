import React from 'react';
import { useState } from 'react';
import StyledInput from './Commun/inputs/StyledInput';

function TarifSection({ selectedLabels }) {
  const [availabilityStates, setAvailabilityStates] = useState(
    new Array(selectedLabels.length).fill(true)
  );

  console.log("selected", selectedLabels);

  const handleCheckboxChange = (index) => {
    setAvailabilityStates((prevStates) => {
      const newStates = prevStates.map((state, i) => (i === index ? !state : state));
      return newStates;
    });
  };

  return (
    <div>
      <div className="d-flex">
        <StyledInput
          label="title"
          className="w-50 m-3"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <StyledInput
          type="number"
          label="Price"
          className="w-50 m-3"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>

      <div className="d-flex flex-wrap gap-5 justify-content-between align-items-start">
        {selectedLabels.length > 0 ? (
          <>
            {selectedLabels.map((elem, index) => (
              <div key={index}>
                <div>{elem}</div>
                <label className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    checked={availabilityStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span>Available</span>
                </label>
                <label className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!availabilityStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span>Not available</span>
                </label>
              </div>
            ))}
          </>
        ) : (
          <div style={{ color: "red" }} className='d-flex justify-content-center align-items-center '>
            You must select features for the sessions First !
          </div>
        )}
      </div>
    </div>
  );
}

export default TarifSection;
