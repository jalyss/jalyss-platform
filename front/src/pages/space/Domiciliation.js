import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {
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
import RegisterForm from "./RegisterForm";
import { updateFormData } from "../forms/reducers";
import { fetchservice } from "../../store/space";
import { useDispatch, useSelector } from "react-redux";
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


function Domiciliation() {
  
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const classes = useStyles();
  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    updateFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const serviceStore = useSelector((state) => state.service);
  const { service } = serviceStore;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchservice("Domicilation"));
  }, [dispatch]);
  console.log(service.tarif, "Service");
  console.log(service.workSpace, "workSpace");
  
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <div>
      {service.workSpace.map((item, index) => (
    <div key={index}> 
      <Typography variant="h2" align="center" style={{color:"purple" ,marginBottom:50}}>
      {item.name}
      </Typography>
      <Typography variant="h4" className={classes.topText}  style={{color:"darkred" ,marginLeft:70}}>
      {item.firstLine}
      </Typography>
      <Typography variant="h6"  className={classes.topText} style={{color:"black" ,marginLeft:10}}>
      <PushPinIcon style={{color:"purple",marginLeft:60,fontSize:30}}/>
      {item.secondLine}  
      </Typography>
     
      <Typography   className={classes.topText} style={{color:"black" ,marginLeft:10, marginBottom: 20,fontSize:20}}>
      
      <PlayCircleFilledWhiteSharpIcon style={{color:"purple",marginLeft:60,fontSize:30}}/>
      
{item.thirdLine}      </Typography>
      <Grid container spacing={3} justifyContent="center" item>
        <Grid item xs={12} sm={12} sx={{ width: { xs: "100%", sm: "50%" } }} >
          <imageGroup className={classes.imagesGroup}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={item.image}
               
              />
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={item.image}
                
              />
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
 image={item.image}                
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
 image={item.image}               
              />
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
 image={item.image}               
              />
            </Card>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
 image={item.image}               
              />
            </Card>
          </imageGroup>
        </Grid>
       
  </Grid>
  <Typography align="center" className={classes.bottomText} style={{marginLeft:50,fontSize:20}}>
{item.pricingLine1}      </Typography>
      <Typography align="center" className={classes.bottomText} style={{color:"red",marginLeft:50,fontSize:40}}>
{item.pricingLine2}      </Typography>
      <form style={{ margin: "auto", maxWidth: 900, padding: 25 }}>
     
      <Typography variant="h6" align="center" sx={{ mb: 5 }}>
        {updateFormData.passType === "Par trimestre"
          ? " trimestre"
          : updateFormData.passType === "Par ans"
          ? "year"
         
          : "Domicialiation with JalyssCom"}
      </Typography>
        <RegisterForm/>
          <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Choose your Domicialiation  Pass to secure your spot.
            </FormLabel>
            <RadioGroup
              aria-label="passType"
              name="passType"
              value={updateFormData.passType}
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
        
      </form>
      <p className="firstLine">{item.autresLine1}</p>
          <p className="secondLine">{item.autresLine2}</p>
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
    </div>
  ))}  </div>
  );
}
export default Domiciliation;
