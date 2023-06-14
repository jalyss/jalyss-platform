import { useState } from "react";
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
import RegisterForm from "./RegisterForm";
import { updateFormData } from "../forms/reducers";

export default function ShippingForm() {
  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    updateFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    console.log(updateFormData);
    updateFormData(); // Reset form
  };

  return (
   
    <form
      onSubmit={handleSubmit}
      style={{ margin: "auto", maxWidth: 900, padding: 25 }}
    >
    
      <Typography variant="h6" align="center" sx={{ mb: 5 }}>
  {formData.passType === "dayPass"
    ? "Day Pass"
    : formData.passType === "weekPass"
    ? "Week Pass"
    : formData.passType === "fullTime"
    ? "Full Time"
    : "Coworking Zone Pass"}
</Typography>
<RegisterForm/>
            <Grid item xs={12} >
            <FormControl component="fieldset">
            <FormLabel component="legend">Choose your Coworking Zone Pass to secure your spot.</FormLabel>
            <RadioGroup
                       aria-label="passType"
                       name="passType"
                       value={formData.passType}
                       onChange={handleFormChange}
                     >
            <Stack direction="row" spacing={3}>
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
            </Stack>
            </RadioGroup>
            </FormControl>
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
