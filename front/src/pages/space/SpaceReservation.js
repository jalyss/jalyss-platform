import React, { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchService } from "../../store/space";
import { createBooking } from "../../store/booking";
import { updateFormData } from "../forms/reducers";
import {
  Grid,
  Button,
  FormLabel,
  FormControl,
  Typography,
  TextField,
} from "@mui/material";


const SpaceReservation = () => {

  const dispatch = useDispatch();
  const serviceStore = useSelector((state) => state.service);
  const { service } = serviceStore;
  const { tarifId } = useParams();
  const name = service?.name;
  const navigate = useNavigate();

console.log(tarifId,'ahla bel tarif');

  const [firstName, setFirstName ] = useState("");
  const [lastName, setLastName ] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName ] = useState("");
  const [email, setEmail ] = useState("");
  const [date, setDate ] = useState("");
  const [startTime,setStartTime ] = useState("");
  const [endTime, setEndTime] = useState("");
  const [freeSpace, setFreeSpace ] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date(date);
    const isoFormattedDate = currentDate.toISOString();
    

    let body = {
      firstName,
      lastName,
      phoneNumber,
      companyName,
      email,
      date:isoFormattedDate,
      startTime,
      endTime,
      freeSpace,
      tarifId,
    };
    dispatch(createBooking(body)).then((res) => {
      if (!res.error) {
        showSuccessToast("Reservation has been created");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
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
              onChange={(e)=>setFirstName(e.target.value)}
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
              onChange={(e)=>setLastName(e.target.value)}
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
              onChange={(e)=>setPhoneNumber(e.target.value)}
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
              onChange={(e)=>setCompanyName(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Choose your day</FormLabel>
          <input
            type="date"
            name="date"
            onChange={(e)=>setDate(e.target.value)}
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
              onChange={(e)=>setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>To:</label>
            <input
              type="time"
              name="endTime"
              onChange={(e)=>setEndTime(e.target.value)}
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
            fullWidth
            autoComplete="off"
            variant="outlined"
            size="small"
            inputProps={{ style: { fontSize: 14 } }}
            multiline
            rows={4}
            value={updateFormData.freeSpace}
            onChange={(e)=>setFreeSpace(e.target.value)}
          />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </div>
    </form>
  );
};

export default SpaceReservation;
