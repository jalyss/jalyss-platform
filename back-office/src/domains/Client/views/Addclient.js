import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClient, fetchClients } from "../../../store/client";
import { fetchEducationLevels } from "../../../store/educationLevel";
import { fetchFunctionalAreas } from "../../../store/functionalArea";
import { fetchJobTitles } from "../../../store/jobTitle";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

function AddClient() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullNameEn, setFullNameEn] = useState("");
  const [fullNameAr, setFullNameAr] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [isCoach, setIsCoach] = useState(false);
  const [accountBalance, setAccountBalance] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [functionalArea, setFunctionalArea] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [avatar, setAvatar] = useState(null);

  const clientStore = useSelector((state) => state.client);
  const educationLevelStore = useSelector((state) => state.educationLevel);
  const functionalAreaStore = useSelector((state) => state.functionalArea);
  const jobTitleStore = useSelector((state) => state.jobTitle);

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchEducationLevels());
    dispatch(fetchFunctionalAreas());
    dispatch(fetchJobTitles());
  }, [dispatch]);

  const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullNameEn ||
      !fullNameAr ||
      !email ||
      !address ||
      !tel ||
      !accountBalance
    ) {
      console.log("Please fill in all required fields");
      return;
    }

    var body = {
      fullNameEn,
      fullNameAr,
      email,
      address,
      tel,
      accountBalance,
      isCoach,
    };

    const submitCreate = async () => {
      let aux = { ...body, accountBalance: Number(body.accountBalance) };
      try {
        await dispatch(createClient(aux));
        showSuccessToast("Client created successfully");
        navigate(-1);
      } catch (error) {
        console.log(error);
        showErrorToast(error.message);
      }
    };

    if (avatar !== null) {
      try {
        const formData = new FormData();
        formData.append("file", avatar);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        body.avatarId = response.data.id;
      } catch (error) {
        console.error("Error uploading avatar image:", error);
      }
    }

    submitCreate();
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap">
          <div className=" m-3">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Create client
              </Typography>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="fullNameEn"
                  variant="outlined"
                  fullWidth
                  value={fullNameEn}
                  onChange={(e) => setFullNameEn(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="fullNameAr"
                  variant="outlined"
                  fullWidth
                  value={fullNameAr}
                  onChange={(e) => setFullNameAr(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Account"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={accountBalance.toString()}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telephone Number"
                  variant="outlined"
                  fullWidth
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="functionalArea">functional Area</InputLabel>
                  <Select
                    labelId="functionalArea"
                    name="functionalAreaId"
                    value={functionalArea || ""}
                    onChange={(e) => setFunctionalArea(e.target.value)}
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
                    value={jobTitle || ""}
                    onChange={(e) => setJobTitle(e.target.value)}
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
                    value={educationLevel || ""}
                    onChange={(e) => setEducationLevel(e.target.value)}
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
                <StyledFormControlLabel
                  control={
                    <Checkbox
                      checked={isCoach}
                      onChange={(e) => setIsCoach(e.target.checked)}
                      name="isCoach"
                      color="primary"
                    />
                  }
                  label="Is Coach"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-file"
                  style={{ display: "none" }}
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                <label htmlFor="avatar-file">
                  <Button variant="outlined" component="span">
                    Add avatar
                  </Button>
                </label>
              </Grid>
              <div className="w-100 d-flex justify-content-center">
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </div>
            </Grid>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddClient;
