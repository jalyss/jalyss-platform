import React, { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createTarif } from "../../../store/tarif";

export default function CreateTarif() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState();
  const [pricePerDay, setPricePerDay] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { serviceId } = useParams();

  console.log(serviceId);

  const handleCreateTarif = async (e) => {
    e.preventDefault();

    let body = {
      serviceId,
      capacity,
      name,
      price,
      pricePerDay,
      description,
      duration,

    };
    dispatch(createTarif(body)).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been created");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  return (
    <div>

      <div className="form-group">
        <label htmlFor="tarifName">Name</label>
        <input
          type="text"
          className="form-control"
          id="tarifName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="tarifCapacity">Capacity</label>
        <input
          type="text"
          className="form-control"
          id="tarifCapacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="tarifDescription">Description</label>
        <textarea
          className="form-control"
          id="tarifDescription"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="tarifDuration">Duration</label>
        <input
          type="text"
          className="form-control"
          id="tarifDuration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="tarifPrice">Price</label>
        <input
          type="number"
          className="form-control"
          id="tarifPrice"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="tarifPricePerDay">Price per Day</label>
        <input
          type="number"
          className="form-control"
          id="tarifPricePerDay"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleCreateTarif}
      >
        Create Tarif
      </button>
    </div>
  );
}