import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById, fetchServices } from "../../../store/service";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditService() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [cover, setCover] = useState(null);

  const serviceStore = useSelector((state) => state.service);

  console.log(serviceStore,"lol");

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
  }, [dispatch, serviceId]);

  useEffect(() => {

    if (serviceStore.service) {
      const { name, identifier } = serviceStore.service;
      setName(name);
      setIdentifier(identifier);
    }
  }, [serviceStore.service]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !identifier || !cover) {
      console.log("Please fill in all required fields");
      return;
    }

    let body = {
      name,
      identifier,
    };

    if (cover !== null) {
      try {
        const formData = new FormData();
        formData.append("file", cover);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.coverId = response.data.id;
      } catch (error) {
        console.error("Error uploading cover image:", error);
      }
    }

    dispatch(createService(body)).then((res) => {
      if (!res.error) {
        console.log("Service has been created");
        navigate(-1);
      } else {
        console.log(res.error.message);
      }
    });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Identifier</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Image file input</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={(e) => setCover(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mb">
            Add the service
          </button>
        </form>
      </div>
    </div>
  );
}
