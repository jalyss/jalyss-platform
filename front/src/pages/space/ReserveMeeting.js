import { useState , useEffect } from "react";
import {
  Typography,
  Grid,
  Stack,
 
  Checkbox,
  FormControlLabel,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import RegisterForm from "./RegisterForm";
const initialFormState = {
  
  agreeToTerms: false,
  passType: "",
};

export default function ReserveMeeting() {
  const [formData, setFormData] = useState(initialFormState);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    console.log(formData);
    setFormData(initialFormState); // Reset form
  };
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "auto", maxWidth: 900, padding: 25 }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 5 }}>
        {formData.passType === "MeetingRoom"
          ? "Meeting Room (Capacity: 2 to 4 people)"
          : formData.passType === "Meeting_Room"
          ? "Meeting Room (Capacity: 4 to 6 people)"
          : formData.passType === "Training_Room"
          ? "Training Room (Capacity: 15 people)"
          : "Meeting Zone Pass"}
      </Typography>
     <RegisterForm/>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Choose your MeetingZone Pass to secure your spot.
            </FormLabel>
            <RadioGroup
              aria-label="passType"
              name="passType"
              value={formData.passType}
              onChange={handleFormChange}
            >
              <Stack direction="row" spacing={3}>
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
              </Stack>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid  item xs={12}>
        <FormLabel component="legend">
              Choose your day
            </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Get Your Day"
              slotProps={{ textField: { size: "small" } }}
            />
          </DemoContainer>
        </LocalizationProvider>
        </Grid>
        <Grid  item xs={12}>
        <FormLabel component="legend">
              Choose your arrive time
            </FormLabel>
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                required
                checked={formData.agreeToTerms}
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
            disabled={!formData.agreeToTerms}
          >
            Submit
          </Button>
        </Grid>
     
    </form>
  );
}
