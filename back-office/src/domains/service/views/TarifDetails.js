import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTarifById } from "../../../store/tarifs";

export default function TarifDetails() {
  const dispatch = useDispatch();
  const { tarifId } = useParams();
  const tarif = useSelector((state) => state.tarif?.tarif);

  useEffect(() => {
    dispatch(fetchTarifById(tarifId));
  }, [dispatch, tarifId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">{tarif?.name}</h1>
              <p className="card-text">Capacity: {tarif?.capacity}</p>
              <p className="card-text">{tarif?.description}</p>
              <p className="card-text">Duration: {tarif?.duration}</p>
              <p className="card-text">Price: {tarif?.price} DT</p>
              <p className="card-text">Price per day: {tarif?.pricePerDay} DT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
