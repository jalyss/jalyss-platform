import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPublishingHouse,
  updatePublishingHouse,
} from "../../../store/publishingHouse";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditModal from "../../../components/Commun/Modal";

import { Box, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function DetailPublishHouse() {
  const publishingHouse = useSelector(
    (state) => state.publishingHouse.publishingHouse
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const [renderEditMode, setrenderEditMode] = useState(false);
  const [publishingHouseData, setpublishingHouseData] = useState(false);
  const fileInputRef = useRef(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPublishingHouse(id));
  }, [id]);

  useEffect(() => {
    setpublishingHouseData({ ...publishingHouse });
  }, [publishingHouse]);

  const ToggleView = () => {
    setrenderEditMode(!renderEditMode);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    let body = { ...publishingHouseData };
    if (selectedFile !== null) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );
        body.logoId = response.data.id;
      } catch (error) {
        console.error("Error uploading selectedFile image:", error);
      }
    }
    delete body.logo;
    dispatch(updatePublishingHouse({ id, ...body })).then((res) => {
      if (!res.error) {
        showSuccessToast("Publishing house updated");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const toggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
  };
  const onCanceltoggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
    setrenderEditMode(false);
  };
  return (
    <div>
      <div class="container">
        <div class="card mb-3" style={{ width: 1000 }}>
          <div class="row g-0">
            <div class="col-md-4">
              <Box
                sx={{
                  flexBasis: "45%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  position: "relative",
                  mr: 5,
                }}
              >
                <div
                  className="position-relative"
                  style={{ height: "55%", width: "80%" }}
                >
                  <img
                    className="img-fluid mt-1"
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : publishingHouse?.logo?.path ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU"
                    }
                    alt="Card image cap"
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "8px",
                      filter: "blur(0.5px)",
                    }}
                  />
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />

                    {renderEditMode && (
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "62%",
                          transform: "translate(-50%, -50%)",
                          color: "#8a2be2",
                          backgroundColor: "#fff",
                          border: "1px solid #8a2be2",
                          "&:hover": {
                            backgroundColor: "#8a2be2",
                            color: "#fff",
                          },
                        }}
                        onClick={handleButtonClick}
                      >
                        <EditIcon fontSize="large" />
                      </IconButton>
                    )}
                  </div>
                </div>
              </Box>
            </div>
            {!renderEditMode ? (
              <>
                <div class="col-md-8">
                  <div class="card-body">
                    <h3 class="card-title " style={{ textAlign: "center" }}>
                      {" "}
                      {publishingHouse?.name}
                    </h3>
                    <hr></hr>
                    <div className="row">
                      <div className="col-2 ">
                        <h6 className="fs-5 mb-3 ">Name :</h6>
                      </div>
                      <div className="col-4">
                        <p class="card-text">
                          <small class="text-muted">
                            {publishingHouse?.name}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2 mb-3 ">
                        <h6 className="fs-5" >Address :</h6>
                      </div>
                      <div className="col-4">
                        <p class="card-text">
                          <small class="text-muted">
                            {publishingHouse?.address}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="confirm-button mt-5 mb-3"
                      onClick={ToggleView}
                    >
                      <span className="label-btn"> Edit Publishing House </span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class="col-md-8">
                  <div class="card-body">
                    <h3 class="card-title " style={{ textAlign: "center" }}>
                      {" "}
                      {publishingHouse?.name}
                    </h3>
                    <hr></hr>
                    <div className="row">
                      <TextField
                        label="Edit name"
                        value={publishingHouseData?.name || ""}
                        onChange={(e) => {
                          setpublishingHouseData({
                            ...publishingHouseData,
                            name: e.target.value,
                          });
                        }}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{
                          style: {
                            color: "#4b0082",
                          },
                        }}
                        sx={{
                          color: "#8a2be2",
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#8a2be2",
                            },
                          "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#8a2be2",
                            },
                        }}
                      />
                    </div>
                    <div className="row">
                      <TextField
                        label="Edit address"
                        value={publishingHouseData?.address || ""}
                        onChange={(e) => {
                          setpublishingHouseData({
                            ...publishingHouseData,
                            address: e.target.value,
                          });
                        }}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{
                          style: {
                            color: "#4b0082",
                          },
                        }}
                        sx={{
                          color: "#8a2be2",
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#8a2be2",
                            },
                          "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#8a2be2",
                            },
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-100 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="confirm-button mt-2 mb-3"
                      onClick={toggleShowDelete}
                    >
                      <span className="label-btn"> Save Changes</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <EditModal
        toggleShow={onCanceltoggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={true}
        ofDelete={!true}
        title={
          <div className="d-flex justify-content-center align-items-center">
            Are you sure !
          </div>
        }
        body={
          <div className="d-flex justify-content-center align-items-center">
            You want to edit this Publishing house ?
          </div>
        }
        fn={() => {
          handleSubmit();
        }}
      />
    </div>
  );
}

export default DetailPublishHouse;
