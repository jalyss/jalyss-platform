import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { createPublishingHouse } from "../../../store/publishingHouse";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function CreatePublishingHouse() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!name || !address || !selectedFile) {
      console.log("Please fill in all required fields");
      return;
    }

    let body = {
      name,
      address,
    };

    if (selectedFile !== null) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_UPLOAD_ENDPOINT}/upload`,
          formData
        );
        body.logoId = response.data.id;
      } catch (error) {
        console.error("Error uploading selectedFile image:", error);
      }
    }

    dispatch(createPublishingHouse(body)).then((res) => {
      if (!res.error) {
        showSuccessToast("Publishing house has been created");
        Navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="container">
          <div className="row">
            <div className="form-group col-6 mt-3">
              <label>Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="form-group col-6 mt-3">
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                placeholder="Address"
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-6 mt-3">
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              {selectedFile ? (
                <p>Selected file: {selectedFile.name}</p>
              ) : (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleButtonClick}
                >
                  Select File
                </Button>
              )}
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="confirm-button mt-5 mb-3"
            >
              <span className="label-btn"> Add Publish House </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePublishingHouse;
