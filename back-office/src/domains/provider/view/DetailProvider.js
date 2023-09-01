import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditModal from "../../../components/Commun/Modal";

import {
  Box,
  Button,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { editProvider, fetchProvider } from "../../../store/provider";
import EditIcon from "@mui/icons-material/Edit";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function DetailProvider() {
  const provider = useSelector((state) => state.provider.provider);
  const [editProviderData, setEditProviderData] = useState(null);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const { providerId } = useParams();
  const dispatch = useDispatch();
  const [renderEditView, setRenderEditView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProvider(providerId));
  }, [dispatch, providerId]);

  useEffect(() => {
    setEditProviderData({ ...provider });
  }, [provider]);

  const toggleView = () => {
    setRenderEditView(!renderEditView);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    const body = {
      ...editProviderData,
    };
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );
        body.logoId = response.data.id;
      }
      delete body.logo;
      delete body.MediaProvider;

      const editedProvider = { ...body, providerId };
      dispatch(editProvider(editedProvider));
      showSuccessToast("Provider edited successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error editing provider:", error);
      showErrorToast(error.message);
    }
  };
  const toggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
  };
  const onCanceltoggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
    setRenderEditView(false)
  };

  return (
    <Box sx={{ maxWidth: "90%", height: "100%", margin: "auto" }}>
      <h2 style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>Edit Provider</h2>
      <div style={{

        width: "100%",
        borderRadius: "24px",
        background: " #f0f3ff",
        border: " 1px solid rgba(192, 194, 204)",
        marginBottom: "1rem"
      }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
              height: "100%",
            }}
          >
            <Box sx={{ flexBasis: "45%", my: 3, ml: 5 }}>
              {!renderEditView ? (
                <>

                  <div className="table-container">
                  
                    <Typography
                      style={{
                        fontFamily: "Arial",
                        fontSize: "16px",         
                        color: "#333",
                        marginBottom:"20px"
                       
                      }}
                    >
                      <span
                        style={{
                          display: "table-cell",
                          fontSize: "large",
                          fontWeight: "bold",
                          paddingRight: "153px",
                        }}
                      >
                        Name:
                      </span>
                      <span style={{ display: "table-cell" }}>
                        {provider?.name}
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Arial",
                        fontSize: "16px",
                        color: "#333",
                         // display: "table-row",
                         marginBottom:"20px"
                      }}
                    >
                      <span
                        style={{
                          display: "table-cell",
                          fontSize: "large",
                          fontWeight: "bold",
                          paddingRight: "153px",
                        }}
                      >
                        Email:
                      </span>
                      <span style={{ display: "table-cell" }}>
                        {provider?.email}
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Arial",
                        fontSize: "16px",
                        color: "#333",
                        // display: "table-row",
                        marginBottom:"20px"
                      }}
                    >
                      <span
                        style={{
                          display: "table-cell",
                          fontSize: "large",
                          fontWeight: "bold",
                          paddingRight: "40px",
                        }}
                      >
                        Telephone Number:
                      </span>
                      <span style={{ display: "table-cell" }}>
                        {provider?.tel}
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Arial",
                        fontSize: "16px",
                        color: "#333",
                         // display: "table-row",
                         marginBottom:"20px"
                      }}
                    >
                      <span
                        style={{
                          display: "table-cell",
                          fontSize: "large",
                          fontWeight: "bold",
                          paddingRight: "136px",
                        }}
                      >
                        Adresse:
                      </span>
                      <span style={{ display: "table-cell" }}>
                        {provider?.address}
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Arial",
                        fontSize: "16px",
                        color: "#333",
                         // display: "table-row",
                      
                      }}
                    >
                      <span
                        style={{
                          display: "table-cell",
                          fontSize: "large",
                          fontWeight: "bold",
                          paddingRight: "60px",
                        }}
                      >
                        Account Balance:
                      </span>
                      <span style={{ display: "table-cell" }}>
                        {provider?.accountBalance}
                      </span>
                    </Typography>
                  </div>

                </>
              ) : (
                <>
                  <TextField
                    label="Name"
                    value={editProviderData?.name || ""}
                    onChange={(e) => {
                      setEditProviderData({
                        ...editProviderData,
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
                  <TextField
                    label="Email"
                    value={editProviderData?.email || ""}
                    onChange={(e) => {
                      setEditProviderData({
                        ...editProviderData,
                        email: e.target.value,
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
                  <TextField
                    label="Telephone Number"
                    value={editProviderData?.tel || ""}
                    onChange={(e) => {
                      setEditProviderData({
                        ...editProviderData,
                        tel: e.target.value,
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
                  <TextField
                    label="Adresse"
                    value={editProviderData?.address || ""}
                    onChange={(e) => {
                      setEditProviderData({
                        ...editProviderData,
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
                  <TextField
                    label="Account Balance"
                    value={editProviderData?.accountBalance || ""}
                    onChange={(e) => {
                      setEditProviderData({
                        ...editProviderData,
                        accountBalance: +e.target.value,
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
                </>
              )}
            </Box>

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
                      : editProviderData?.logo?.path ||
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

                  {renderEditView && (
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
          </Box>

        </CardContent>
      </div>
      <Box display="flex" justifyContent="center" mt={9}>
        {renderEditView ? (
          <Button
            onClick={() => {
              toggleShowDelete();
            }}
            variant="contained"
            color="primary"
          >
            Save Provider
          </Button>
        ) : (
          <Button
            onClick={() => {
              toggleView();
            }}
            variant="contained"
            color="primary"
          >
            Update Provider
          </Button>
        )}
      </Box>
      <EditModal
        toggleShow={onCanceltoggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={true}
        ofDelete={!true}
        title={
          <div style={{ width: "200%", marginLeft: "100%" }} className="d-flex justify-content-center text-align-center">
            Are you sure !
          </div>
        }
        body={
          <div className="d-flex justify-content-center align-items-center">
            You want to edit this proider ?
          </div>
        }
        fn={() => {
          handleSubmit();
        }}
      />
    </Box>
  );
}

export default DetailProvider;
