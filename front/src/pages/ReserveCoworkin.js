import { useState } from "react";
import {
  Typography,
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";

const initialFormState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  companyName: "",
  email: "",
  freeSpace: "",
  agreeToTerms: false,
  passType: "",
};

export default function ShippingForm() {
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

  return (
   
    <form
      onSubmit={handleSubmit}
      style={{ margin: "auto", maxWidth: 600, padding: 25}}
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
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", sm: "50%" } }}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            size="small"
            inputProps={{ style: { fontSize: 14 } }}
            value={formData.firstName}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", sm: "50%" } }}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            size="small"
            inputProps={{ style: { fontSize: 14 } }}
            value={formData.lastName}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", sm: "50%" } }}>
          <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="tel"
            variant="outlined"
            size="small"
            inputProps={{ style: { fontSize: 14 } }}
            value={formData.phoneNumber}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", sm: "50%" } }}>
          <TextField
            
            id="companyName"
            name="companyName"
            label="Company Name"
            fullWidth
            autoComplete="organization"
            variant="outlined"
            size="small"
            inputProps={{ style: { fontSize: 14 } }}
            value={formData.companyName}
            onChange={handleFormChange}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="outlined"
            size="small"
            inputProps={{ style: { fontSize: 14 } }}
            value={formData.email}
            onChange={handleFormChange}
            />
            </Grid>
            <Grid item xs={12}>
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
            value={formData.freeSpace}
            onChange={handleFormChange}
            />
            </Grid>
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
            </Grid>
            </form>
            );
            }
