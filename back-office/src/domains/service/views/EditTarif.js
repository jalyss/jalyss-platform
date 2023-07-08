import React, { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTarifById, editTarif } from "../../../store/tarifs";

export default function EditTarif() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tarifId, serviceId } = useParams();

  const tarif = useSelector((state) => state.tarif?.tarif);
  console.log(serviceId, "lol");
  console.log("priiiice", price);
  useEffect(() => {
    if (tarif) {
      setName(tarif.name);
      setCapacity(tarif.capacity);
      setDescription(tarif.description);
      setDuration(tarif.duration);
      setPrice(tarif.price);
      setPricePerDay(tarif.pricePerDay);
    } else {
      dispatch(fetchTarifById(tarifId));
    }
  }, [dispatch, tarifId, tarif]);

  const handleUpdateTarif = (e) => {
    e.preventDefault();

    const updatedTarif = {
      capacity,
      name,
      price,
      pricePerDay,
      description,
      duration,
      serviceId,
    };
    const id = tarifId;
    console.log("up", updatedTarif);
    dispatch(editTarif({id,...updatedTarif})).then((res) => {
      if (!res.error) {
        showSuccessToast("Tarif has been updated");
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
          onChange={(e) => setPrice(+e.target.value)}
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
          onChange={(e) => setPricePerDay(+e.target.value)}
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleUpdateTarif}
      >
        Update Tarif
      </button>
    </div>
  );
}
