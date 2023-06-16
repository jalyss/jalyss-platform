import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { showErrorToast, showSuccessToast } from "../../";
import { createService, fetchServices } from "../../../store/service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateService() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [name, setName] = useState("");

    const [identifier, setIdentifier] = useState("");

    const [cover, setCover] = useState(null);

    const serviceStore = useSelector((state) => state.service);

    useEffect(() => {
        dispatch(fetchServices());
      }, [dispatch]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {
          name, 
        identifier
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
            // showSuccessToast("workSpace has been created");
            console.log("workSpace has been created");
            navigate(-1);
          } else {
            // showErrorToast(res.error.message);
            console.log(res.error.message);
          }
        });
      };

    
  return (
    <div>
        
        <div className="container">
      <form>
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
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setIdentifier(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Image file input</label>
          <input
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
            onChange={(e) => setCover(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary mb" onClick={handleSubmit}>
          Add the service
        </button>
      </form>
    </div>

    </div>
  )
}
