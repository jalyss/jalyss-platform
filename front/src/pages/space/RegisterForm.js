import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";
import { updateFormData, resetForm } from "../forms/reducers";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    dispatch(updateFormData({ [name]: newValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(updateFormData);
    dispatch(resetForm());
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "auto", maxWidth: 900, padding: 25 }}
    >
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
            value={updateFormData.firstName}
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
            value={updateFormData.lastName}
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
            value={updateFormData.phoneNumber}
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
            value={updateFormData.companyName}
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
            value={updateFormData.email}
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
            multiline
            rows={4}
            value={updateFormData.freeSpace}
            onChange={handleFormChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
