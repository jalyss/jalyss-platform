import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "./RegisterForm";
import { fetchService } from "../../store/space";
import {
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
  FormLabel,
  FormControl,
  RadioGroup,
  Stack,
  Radio,
  Typography,
} from "@mui/material";

import { Select, MenuItem } from "@mui/material";
import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { updateFormData } from "../forms/reducers";

const SpaceReservation = () => {
  const [value, setValue] = useState(dayjs("2022-04-17"));

  const dispatch = useDispatch();
  const serviceStore = useSelector((state) => state.service);
  const { service } = serviceStore;
  const name = service?.name;

  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    dispatch(updateFormData({ [name]: newValue }));
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
        {name === "Co-Working Zone" ? (
          <Typography variant="h6" align="center" sx={{ mb: 5 }}>
            {updateFormData.passType === "dayPass"
              ? "Day Pass"
              : updateFormData.passType === "weekPass"
              ? "Week Pass"
              : updateFormData.passType === "fullTime"
              ? "Full Time"
              : "Coworking Zone Pass"}
          </Typography>
        ) : name === "Meeting Space" ? (
          <Typography variant="h6" align="center" sx={{ mb: 5 }}>
            {updateFormData.passType === "MeetingRoom"
              ? "Meeting Room (Capacity: 2 to 4 people)"
              : updateFormData.passType === "Meeting_Room"
              ? "Meeting Room (Capacity: 4 to 6 people)"
              : updateFormData.passType === "Training_Room"
              ? "Training Room (Capacity: 15 people)"
              : "Meeting Space Pass"}
          </Typography>
        ) : null}

        <RegisterForm />

        {name === "Private Space" && (
          <div>
            <Grid item xs={12}>
              <Select
                value={selectedValue}
                onChange={handleChange}
                displayEmpty
                fullWidth
              >
                <MenuItem value="">Office capacity</MenuItem>
                <MenuItem value="option1">2-4 personne</MenuItem>
                <MenuItem value="option2">4-6 personne</MenuItem>
                <MenuItem value="option3">6-10 personne</MenuItem>
                <MenuItem value="option4">more than 10 personne </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Choose your day</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker label="from" defaultValue={dayjs("2022-04-17")} />
                  <DatePicker
                    label="to "
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Choose your arrival time</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MultiInputTimeRangeField"]}>
                  <MultiInputTimeRangeField
                    slotProps={{
                      textField: ({ position }) => ({
                        label: position === "start" ? "From" : "To",
                      }),
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </div>
        )}

        {name !== "Private Space" && (
          <>
            <Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Choose your  Pass to secure your spot.
                </FormLabel>
                <RadioGroup
                  aria-label="passType"
                  name="passType"
                  value={updateFormData.passType || ""}
                  onChange={handleFormChange}
                >
                  <Stack direction="row" spacing={3}>
                    {name === "Co-Working Zone" ? (
                      <>
                        <FormControlLabel
                          value="dayPass"
                          control={<Radio />}
                          label="Daily Pass (25dt)"
                        />
                        <FormControlLabel
                          value="weekPass"
                          control={<Radio />}
                          label="WeeK Pass (99dt)"
                        />
                        <FormControlLabel
                          value="fullTime"
                          control={<Radio />}
                          label="Full Time (299dt)"
                        />
                      </>
                    ) : name === "Meeting Space" ? (
                      <>
                        <FormControlLabel
                          value="MeetingRoom"
                          control={<Radio />}
                          label="Meeting Room (25dt/Hr)"
                        />
                        <FormControlLabel
                          value="Meeting_Room"
                          control={<Radio />}
                          label="Meeting Room (30dt/Hr)"
                        />
                        <FormControlLabel
                          value="Training_Room"
                          control={<Radio />}
                          label="Training Room(40dt/Hr) "
                        />
                      </>
                    ) : null}
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Choose your day</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Get Your Day"
                    slotProps={{ textField: { size: "small" } }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Choose your arrival time</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MultiInputTimeRangeField"]}>
                  <MultiInputTimeRangeField
                    slotProps={{
                      textField: ({ position }) => ({
                        label: position === "start" ? "From" : "To",
                      }),
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                required
                checked={updateFormData.agreeToTerms}
                onChange={handleFormChange}
                name="agreeToTerms"
              />
            }
            label="I agree to the Terms and Conditions"
          />
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
