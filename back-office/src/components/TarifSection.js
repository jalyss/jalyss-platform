import React from "react";
import { useState } from "react";
import StyledInput from "./Commun/inputs/StyledInput";

function TarifSection({  setTarif ,tarif}) {
  return (
    <div>
      <div className="d-flex gap-3 justify-content-between fw-bold py-3">
        <div style={{ width: 200 }} className="text-center">
          Features
        </div>
        <div style={{ width: 100 }} className="text-center">
          Available
        </div>
        <div style={{ width: 150 }} className="text-center">
          Not Available
        </div>
      </div>

      <div className="">
        {tarif?.features.length > 0 ? (
          <>
            {tarif?.features.map((elem, index) => (
              <div>
                <hr style={{ height: 2, background: "black", margin: 0 }} />
                <div
                  key={index}
                  className="d-flex gap-3 justify-content-between align-items-center"
                >
                  <div style={{ width: 200 }}>{elem.label}</div>
                  <div style={{ width: 100 }} className="text-center">
                    <input
                      type="checkbox"
                      checked={tarif.features[index].isAvailable}
                      onChange={(e) => {
                        if (e.target.checked) {
                          let array = [...tarif.features];
                          array[index].isAvailable = true;

                          setTarif((Tarif) => ({
                            ...Tarif,
                            features: array
                          }));
                        }
                      }}
                    />
                  </div>
                  <div style={{ width: 150 }} className="text-center">
                    <input
                      type="checkbox"
                      checked={!tarif.features[index].isAvailable}
                      onChange={(e) => {
                        if (e.target.checked) {
                          let array = [...tarif.features];
                          array[index].isAvailable = false;

                          setTarif((Tarif) => ({
                            ...Tarif,
                            features: array
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default TarifSection;


