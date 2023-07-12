import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { IoIosPersonAdd } from "react-icons/io";

function CreatePublishingHouse() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="container">
          <form>
            <div className="row">
              <div className="form-group col-6 mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="form-group col-6 mt-3">
                <label>Address</label>
                <input
                  type="text"
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
              <button type="submit" className="confirm-button mt-5 mb-3">
                <span className="label-btn"> Add Publish House </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePublishingHouse;
