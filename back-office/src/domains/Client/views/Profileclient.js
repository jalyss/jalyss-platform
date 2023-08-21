import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditModal from "../../../components/Commun/Modal";
import { fetchEducationLevels } from "../../../store/educationLevel";
import { fetchFunctionalAreas } from "../../../store/functionalArea";
import { fetchJobTitles } from "../../../store/jobTitle";
import { fetchCountries } from "../../../store/Country";
import { findAllCitites } from "../../../store/Country";

import {
  Box,
  Button,
  CardContent,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  IconButton,
  FormControl,
  Grid,
} from "@mui/material";

import { editClient, fetchClient } from "../../../store/client";

import EditIcon from "@mui/icons-material/Edit";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";


const profileclient = () => {
  const client = useSelector((state) => state.client?.client);
  console.log(client, "client");
  const [editClientData, setEditClientData] = useState(null);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [renderEditView, setRenderEditView] = useState(false);
  const navigate = useNavigate();
  const [educationLevelId, setEducationLevelId] = useState("");
  const [functionalAreaId, setFunctionalAreaId] = useState("");
  const [jobTitleId, setJobTitleId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");

  const educationLevelStore = useSelector((state) => state.educationLevel);
  const functionalAreaStore = useSelector((state) => state.functionalArea);
  const jobTitleStore = useSelector((state) => state.jobTitle);
  const CountriesStore = useSelector((state) => state.country);
  const citysStore = useSelector((state) => state.country);


  useEffect(() => {
    dispatch(fetchClient(id));
    dispatch(fetchEducationLevels());
    dispatch(fetchFunctionalAreas());
    dispatch(fetchJobTitles());
    dispatch(fetchCountries());
    dispatch(findAllCitites());;
  }, [dispatch, id]);

  useEffect(() => {
    setEditClientData({ ...client });
  }, [client]);

  const toggleView = () => {
    setRenderEditView(!renderEditView);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  console.log(id, "clientId");
  console.log(client, "client");

  // const handleSubmit = async () => {
  //   const body = {
  //     ...editClientData,
  //   };
  //   try {
  //     if (selectedFile) {
  //       const formData = new FormData();
  //       formData.append("file", selectedFile);

  //       const response = await axios.post(
  //         `${process.env.REACT_APP_API_ENDPOINT}/upload`,
  //         formData
  //       );
  //       body.avatarId = response.data.id;
  //     }
  //     delete body.avatar;
      

  //     const editedClient = { ...body, id };
  //     dispatch(editClient(editedClient));
  //     showSuccessToast("client edited successfully");
  //     navigate(-1);
  //   } catch (error) {
  //     console.error("Error editing client:", error);
  //     showErrorToast(error.message);
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullNameEn,
      fullNameAr,
      email,
      address,
      tel,
      accountBalance,
      isCoach,
      cityId,
      educationLevelId,
      countryId,
      functionalAreaId,
      jobTitleId,
    } = editClientData;

    const submitUpdate = async () => {
      let aux = { ...editClientData, accountBalance: Number(accountBalance) };
      try {
        await dispatch(updateClient(id, aux));
        showSuccessToast("Client updated successfully");
        navigate(-1);
      } catch (error) {
        console.log(error);
        showErrorToast(error.message);
      }
    };

    if (selectedFile !== null) {
      // Upload avatar logic remains the same
    }

    submitUpdate();
  };

  return (
    <Box sx={{ maxWidth: "90%", height: "100%", margin: "auto" }}>
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
              <div className="table-container">
                {[
                  {
                    label: "full name (En)",
                    value: client?.fullNameEn || "Null",
                  },
                  {
                    label: "full name (Ar)",
                    value: client?.fullNameAr || "Null",
                  },
                  { label: "Email", value: client?.email || "Null" },
                  { label: "Adresse", value: client?.address || "Null" },
                  { label: "Telephone Number", value: client?.tel || "Null" },
                  {
                    label: "Account Balance",
                    value: client?.accountBalance || "Null",
                  },
                  { label: "is Coach", value: client?.isCoach ? "Yes" : "No" },
                  { label: "city", value: client?.city?.nameEn || "Null" },
                  {
                    label: "country",
                    value: client?.country?.nameEn || "Null",
                  },
                  {
                    label: "Functional Area",
                    value: client?.functionalArea?.nameEn || "Null",
                  },
                  {
                    label: "Job Title",
                    value: client?.jobTitle?.nameEn || "Null",
                  },
                  {
                    label: "Education Level",
                    value: client?.educationLevel?.nameEn || "Null",
                  },
                ].map((item, index) => (
                  <Typography
                    key={index}
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      {item.label}:
                    </span>
                    <span style={{ display: "table-cell" }}>{item.value}</span>
                  </Typography>
                ))}
              </div>
            ) : (
              <div className="details-container">
                <TextField
                  label="full name (En)"
                  value={editClientData?.fullNameEn || ""}
                  onChange={(e) =>
                    setEditClientData({
                      ...editClientData,
                      fullNameEn: e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="full name (Ar)"
                  value={editClientData?.fullNameAr || ""}
                  onChange={(e) =>
                    setEditClientData({
                      ...editClientData,
                      fullNameAr: e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={editClientData?.email || ""}
                  onChange={(e) =>
                    setEditClientData({
                      ...editClientData,
                      email: e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Adresse"
                  value={editClientData?.address || ""}
                  onChange={(e) =>
                    setEditClientData({
                      ...editClientData,
                      address: e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Telephone Number"
                  value={editClientData?.tel || ""}
                  onChange={(e) =>
                    setEditClientData({
                      ...editClientData,
                      tel: e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Account Balance"
                  value={editClientData?.accountBalance || ""}
                  onChange={(e) =>
                    setEditClientData({
                      ...editClientData,
                      accountBalance: +e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="is Coach"
                  value={editClientData?.isCoach ? "Yes" : "No"}
                  onChange={(e) =>
                    setEditClientData({
                      ...editClientData,
                      isCoach: e.target.value === "Yes",
                    })
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="functionalArea">functional Area</InputLabel>
                  <Select
                    labelId="functionalArea"
                    name="functionalAreaId"
                    onChange={(e) => setFunctionalAreaId(e.target.value)}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {functionalAreaStore.functionalAreas.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="jobTitle">job tilte</InputLabel>
                  <Select
                    labelId="jobTitle"
                    name="jobTitleId"
                    onChange={(e) => setJobTitleId(e.target.value)}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {jobTitleStore.jobTitles.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="educationLevel">Education Level</InputLabel>
                  <Select
                    labelId="educationLevel"
                    name="educationLevelId"
                    onChange={(e) => setEducationLevelId(e.target.value)}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {educationLevelStore.educationLevels.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="counties">counties</InputLabel>
                  <Select
                    labelId="counties"
                    name="countriesId"
                    onChange={(e) => setCountryId(e.target.value)}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {CountriesStore?.countries?.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="citys">city</InputLabel>
                  <Select
                    labelId="citys"
                    name="citysId"
                    onChange={(e) => setCityId(e.target.value)}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {citysStore?.cities?.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              </div>
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
                    : editClientData?.avatar?.path ||
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
    

      <Box display="flex" justifyContent="center" mt={9}>
        {renderEditView ? (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Save Client
          </Button>
        ) : (
          <Button
            onClick={toggleView}
            variant="contained"
            color="primary"
          >
            Update Client
          </Button>
        )}
      </Box>
    </Box>
  );
};
export default profileclient;

