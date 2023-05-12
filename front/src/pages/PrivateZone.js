import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import {
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
import { makeStyles } from "@mui/styles";
import { Card, CardMedia, Typography, imageGroup } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PushPinIcon from "@mui/icons-material/PushPin";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
const useStyles = makeStyles((theme) => ({
  imagesGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 6,
  },
  card: {
    width: "40%",
    // Add other styling properties as needed
  },
  media: {
    height: 0,

    paddingTop: "50%", // 16:9 aspect ratio
  },
  topText: {
    marginTop: 2,
  },
  bottomText: {
    marginTop: 2,
  },
}));
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

function PrivateZone() {
  const [formData, setFormData] = useState(initialFormState);
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const classes = useStyles();
useEffect(()=>{
  window.scrollTo(0,0);
},[])
  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      {" "}
      <Typography
        variant="h2"
        align="center"
        style={{ color: "purple", marginBottom: 50 }}
      >
        Private Zone
      </Typography>
      <Typography
        variant="h4"
        className={classes.topText}
        style={{ color: "purple ", marginLeft: 70 }}
      >
        Working Has Never Been So Pleasant
      </Typography>
      <Typography
        variant="h5"
        className={classes.topText}
        style={{ color: "black", marginLeft: 10 }}
      >
        <VerifiedUserRoundedIcon style={{ color: "purple", marginLeft: 60, fontSize: 40 }} />
        Private offices for more autonomy
      </Typography>
      <Typography
        className={classes.topText}
        style={{
          color: "black",
          marginLeft: 80,
          marginBottom: 20,
          fontSize: 15,
        }}
      >
        {" "}
        Renting a private office is a great option if you need more privacy or
        to increase your comfort. Our private offices are designed for
        professionals and are suitable for expanding their business. They allow
        you to work quietly by facilitating concentration and improving
        productivity.
      </Typography>
      <Typography
        className={classes.topText}
        style={{
          color: "black",
          marginLeft: 80,
          marginBottom: 20,
          fontSize: 15,
        }}
      >
        With a capacity of 4 to 8 people, you benefit from a carefully furnished
        space, accessible 24 hours a day, 7 days a week. Just for you and your
        teams, your private office has a broadband connection provided by fiber
        optics. You will also be entitled to technical support available and
        attentive to your needs and/or requests. Thus, you guarantee a favorable
        environment to increase the performance of your employees.
      </Typography>
      <Grid container spacing={3} justifyContent="center" item>
        <Grid item xs={12} sm={12} sx={{ width: { xs: "100%", sm: "50%" } }}>
          <imageGroup className={classes.imagesGroup}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://coworker.imgix.net/photos/tunisia/tunis/work-zone/7-1560519620.jpg?w=800&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle"
              />
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://coworker.imgix.net/photos/tunisia/tunis/work-zone/7-1560519620.jpg?w=800&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle"
              />
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://coworker.imgix.net/photos/tunisia/tunis/work-zone/7-1560519620.jpg?w=800&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle"
              />
            </Card>
          </imageGroup>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} sx={{ width: { xs: "100%", sm: "50%" } }}>
          <imageGroup className={classes.imagesGroup}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://coworker.imgix.net/photos/tunisia/tunis/work-zone/7-1560519620.jpg?w=800&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle"
              />
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://coworker.imgix.net/photos/tunisia/tunis/work-zone/7-1560519620.jpg?w=800&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle"
              />
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://coworker.imgix.net/photos/tunisia/tunis/work-zone/7-1560519620.jpg?w=800&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle"
              />
            </Card>
          </imageGroup>
        </Grid>
      </Grid>
      
      <Typography
        align="center"
        className={classes.bottomText}
        style={{ color: "red", marginLeft: 50, fontSize: 40 }}
      >
        Get your private zone
      </Typography>
      <form style={{ margin: "auto", maxWidth: 900, padding: 25 }}>
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
              multiline
              rows={4}
              value={formData.freeSpace}
              onChange={handleFormChange}
            />
          </Grid>
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
      <p className="firstLine">Autres Service</p>
      <p className="secondLine">All in One Place.</p>
      <div className="d-flex justify-content-center align-items-center ">
        <div className="col-md-2.5 mx-1">
          <img
            src="https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png"
            alt="Coworking Zone"
            className="card-img-top"
            style={{
              borderRadius: 20,
              marginBottom: -50,
              height: 320,
              width: 350,
            }}
          />
          <div
            className="card  headerspaceitem"
            style={{
              borderRadius: 25,
              width: 290,
              left: 28,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body ">
              <h5 className="card-title">Coworking Zone</h5>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "rgb(230, 229, 232)",
                  borderRadius: 30,
                  color: "black",
                }}
              >
                <Link
                  to={"/CoworkingZone"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  Reserve
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2.5 mx-1">
          <img
            src="https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png"
            alt="Coworking Zone"
            className="card-img-top"
            style={{
              borderRadius: 20,
              marginBottom: -50,
              height: 320,
              width: 350,
            }}
          />
          <div
            className="card  headerspaceitem"
            style={{
              borderRadius: 25,
              width: 290,
              left: 28,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body ">
              <h5 className="card-title">Meetings Zone</h5>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "rgb(230, 229, 232)",
                  borderRadius: 30,
                  color: "black",
                }}
              >
                <Link
                  to={"/MeetingZone"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  Reserve
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-2.5 mx-1">
          <img
            src="https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png"
            alt="Coworking Zone"
            className="card-img-top"
            style={{
              borderRadius: 20,
              marginBottom: -50,
              height: 320,
              width: 350,
            }}
          />
          <div
            className="card  headerspaceitem"
            style={{
              borderRadius: 25,
              width: 290,
              left: 28,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body ">
              <h5 className="card-title">Domiciliation</h5>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "rgb(230, 229, 232)",
                  borderRadius: 30,
                  color: "black",
                }}
              >
                {" "}
                <Link
                  to={"/Domiciliation"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  Reserve
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PrivateZone;
