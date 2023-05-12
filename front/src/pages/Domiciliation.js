import React, { useState,useEffect } from "react";
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
import { makeStyles } from '@mui/styles';
import { Card, CardMedia,Typography} from '@mui/material';

import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PushPinIcon from '@mui/icons-material/PushPin';
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import PlayCircleFilledWhiteSharpIcon from '@mui/icons-material/PlayCircleFilledWhiteSharp';
const useStyles = makeStyles((theme) => ({
  imagesGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap:6,
    marginBottom:6,
  },
  card: {
    width: '40%',
     // Add other styling properties as needed
  },
  media: {
    height: 0,
   
    paddingTop: '50%', // 16:9 aspect ratio
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

function Domiciliation() {
  const [formData, setFormData] = useState(initialFormState);
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const classes = useStyles();
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
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <> 
      <Typography variant="h2" align="center" style={{color:"purple" ,marginBottom:50}}>
      Domiciliation
      </Typography>
      <Typography variant="h4" className={classes.topText}  style={{color:"darkred" ,marginLeft:70}}>
      Adresse prestigieuse
      </Typography>
      <Typography variant="h6"  className={classes.topText} style={{color:"black" ,marginLeft:10}}>
      <PushPinIcon style={{color:"purple",marginLeft:60,fontSize:30}}/>
        
        Vous pouvez profiter de notre emplacement privilégié au Centre Urbain Nord le pôle d’affaire le plus dynamique sur Tunis.
      </Typography>
     
      <Typography   className={classes.topText} style={{color:"black" ,marginLeft:10, marginBottom: 20,fontSize:20}}>
      
      <PlayCircleFilledWhiteSharpIcon style={{color:"purple",marginLeft:60,fontSize:30}}/>
      
        On met à votre disposition une domiciliation d’entreprise qui présente tous les avantages d’un bureau exclusif.
      </Typography>
      <Grid container spacing={3} justifyContent="center" item>
        <Grid item xs={12} sm={12} sx={{ width: { xs: "100%", sm: "50%" } }} >
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
  <Typography align="center" className={classes.bottomText} style={{marginLeft:50,fontSize:20}}>
  with our domiciliation , Mail management, 2 hours of free meeting time per month and administrative assistance are provided.
      </Typography>
      <Typography align="center" className={classes.bottomText} style={{color:"red",marginLeft:50,fontSize:40}}>
  Get Domiciliation for :
      </Typography>
      <form style={{ margin: "auto", maxWidth: 900, padding: 25 }}>
     
      <Typography variant="h6" align="center" sx={{ mb: 5 }}>
        {formData.passType === "Par trimestre"
          ? " trimestre"
          : formData.passType === "Par ans"
          ? "year"
         
          : "Domicialiation with JalyssCom"}
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
              multiline
              rows={4}
              value={formData.freeSpace}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Choose your Domicialiation  Pass to secure your spot.
            </FormLabel>
            <RadioGroup
              aria-label="passType"
              name="passType"
              value={formData.passType}
              onChange={handleFormChange}
            >
              <Stack direction="row" spacing={3}>
                <FormControlLabel
                  value="Par trimestre"
                  control={<Radio />}
                  label=" trimestre (299 DT)"
                />
                <FormControlLabel
                  value="Par ans"
                  control={<Radio />}
                  label="year  (999 DT)"
                />
               
              </Stack>
            </RadioGroup>
          </FormControl>
        </Grid><Grid item xs={12}>
          <FormLabel component="legend">
              Choose your day
            </FormLabel>
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
              <h5 className="card-title">Private Zone</h5>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "rgb(230, 229, 232)",
                  borderRadius: 30,
                  color: "black",
                }}
              >
                <Link
                  to={"/PrivateZone"}
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
export default Domiciliation;
