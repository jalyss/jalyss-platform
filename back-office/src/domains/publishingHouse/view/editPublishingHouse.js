import React, { useState, useRef } from "react";
import { useParams } from 'react-router-dom'
import { rows } from '../../../constants/publishingHouseData'
import { Button } from "react-bootstrap";
import { IoIosPersonAdd } from "react-icons/io";

function EditPublishingHouse() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const { id } = useParams()
  const PublishHouse = rows[id]
  return (
    <div>
      <div className='container'>
        <div className='card'>
          <div className='container'>
            <form>
              <div className='d-flex mb-2' style={{ justifyContent: 'center', }}>
                <img class="img-fluid rounded-start mt-5" src={PublishHouse.logo} alt="Card image cap" style={{ height: 100, width: 250 }} />


              </div>
              <div class="row">
                <div class="form-group col-6 mt-3">
                  <label >Name</label>
                  <input type="text" class="form-control" value={PublishHouse.name} />
                </div>
                <div class="form-group col-6 mt-3">
                  <label >Address</label>
                  <input type="text" class="form-control" value={PublishHouse.address} />
                </div>
              </div>

              <div class="row mt-3">
                <div class="form-group col-6">
                  <label >Article</label>
                  <input type="text" class="form-control" value={PublishHouse.article} />
                </div>
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
                  type="submit"
                  className="confirm-button mt-5   mb-3">
                  <span className="label-btn"> Edit Publishing House </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPublishingHouse
