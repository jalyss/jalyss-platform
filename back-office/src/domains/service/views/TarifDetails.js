import React, { useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchTarifById} from "../../../store/tarif";


export default function TarifDetails() {
    const dispatch = useDispatch();
    const { tarifId } = useParams();

    const tarif = useSelector((state) => state.tarif?.tarif);

console.log(tarif,"loli");

    useEffect(() => {
        dispatch(fetchTarifById(tarifId));
      }, [dispatch]);

  return (
    <div className="d-flex justify-content-center align-items-center">

        <div className="col-md-2.5 mx-1" >
          <div
            className="card serviceCard"
            style={{
              borderRadius: 25,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body service">
              <h1 className="card-title serviceType">{tarif.name}</h1>
              <p className="soustitle">Capacity: {tarif.capacity}</p>
              <p>{tarif.description}</p>
              <p>Duration:{tarif.duration}</p>

              <div className="price">
                Only <a className="priceNumber"> {tarif.price}</a>DT
                <p>Price per day:{tarif.pricePerDay}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
