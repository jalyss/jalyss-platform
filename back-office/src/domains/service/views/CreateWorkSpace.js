import React, { useEffect, useState } from "react";
import "../../../assets/styles/WorkSpaceCreation.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { createWorkSpace, fetchWorkSpaces } from "../../../store/space";

export default function CreateWorkSpace() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serviceId } = useParams();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");

  const workSpaceStore = useSelector((state) => state.workSpace);

  useEffect(() => {
    dispatch(fetchWorkSpaces());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      name,
      capacity,
      price,
      description,
      amenities,
      serviceId,
    };

    if (image !== null) {
      try {
        const formData = new FormData();
        formData.append("file", image);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.imageId = response.data.id;
      } catch (error) {
        console.error("Error uploading cover image:", error);
      }
    }

    dispatch(createWorkSpace(body)).then((res) => {
      if (!res.error) {
        console.log("WorkSpace has been created");
        navigate(-1);
      } else {
        console.log(res.error.message);
      }
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput2">Capacity</label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput2"
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput2">Price</label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput2"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea2">Amenities</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea2"
            rows="3"
            onChange={(e) => setAmenities(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Image file input</label>
          <input
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb"
        >
          Add the Space
        </button>
      </form>
    </div>
  );
}
