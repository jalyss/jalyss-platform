import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchService } from "../../store/space";
import dayjs from "dayjs";
import { updateFormData } from "../forms/reducers";
import {
  Grid,
  FormControlLabel,
  Button,
  FormLabel,
  FormControl,
  Typography,
  TextField,
} from "@mui/material";


const SpaceReservation = () => {
  // const [value, setValue] = useState(dayjs("2022-04-17"));

  const dispatch = useDispatch();
  const serviceStore = useSelector((state) => state.service);
  const { service } = serviceStore;
  const name = service?.name;

  const [firstName, setFirstName ] = useState("");
  const [lastName, setLastName ] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName ] = useState("");
  const [email, setEmail ] = useState("");
  const [selectedDate, setSelectedDate ] = useState(dayjs(""));
  const [startTime,setStartTime ] = useState("");
  const [endTime, setEndTime] = useState("");
  const [freeSpace, setFreeSpace ] = useState("");
  const [tarifId, setTarifId ] = useState("");


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted");
    dispatch(updateFormData());
  };

  useEffect(() => {
    dispatch(fetchService());
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "auto", maxWidth: 900, padding: 25 }}
    >
      <div>
        <Typography variant="h6" align="center" sx={{ mb: 5 }}>
          {name === "Co-Working Zone"
            ? "Coworking Zone Pass"
            : name === "Meeting Space"
            ? "Meeting Space Pass"
            : name === "Private Space"
            ? "Private Space Pass"
            : "Pass Type"}
        </Typography>



        <Grid item xs={12}>
          <FormControl fullWidth>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={updateFormData.firstName || ""}
              onChange={handleFormChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={updateFormData.lastName || ""}
              onChange={handleFormChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={updateFormData.phoneNumber || ""}
              onChange={handleFormChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={updateFormData.companyName || ""}
              onChange={handleFormChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updateFormData.email || ""}
              onChange={handleFormChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Choose your day</FormLabel>
          <input
            type="date"
            name="selectedDate"
            value={updateFormData.selectedDate || ""}
            onChange={handleFormChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <label>Choose your arrival time</label>
          <div>
            <label>From:</label>
            <input
              type="time"
              name="startTime"
              value={updateFormData.startTime || ""}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label>To:</label>
            <input
              type="time"
              name="endTime"
              value={updateFormData.endTime || ""}
              onChange={handleFormChange}
              required
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <label> Free Space:</label>
          <TextField
            required
            id="freeSpace"
            name="freeSpace"
            label="Free Space Needed (in square meters)"
            fullWidth
            autoComplete="off"
            variant="outlined"
            size="small"
            inputProps={{ style: { fontSize: 14 } }}
            multiline
            rows={4}
            value={updateFormData.freeSpace}
            onChange={handleFormChange}
          />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={!updateFormData.agreeToTerms}
          >
            Submit
          </Button>
        </Grid>
      </div>
    </form>
  );
};

export default SpaceReservation;
