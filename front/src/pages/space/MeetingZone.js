import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Card, CardMedia, Typography } from "@mui/material";
import { fetchService } from "../../store/space";
import { useDispatch, useSelector } from "react-redux";

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
function MeetingZone() {
  const serviceStore = useSelector((state) => state.service);
  const { service } = serviceStore;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchService("Meeting Space"));
    window.scrollTo(0, 0);
  }, [dispatch]);
  console.log(service, "Service");
  const classes = useStyles();
  
  return (
    <div>
      <Typography
        variant="h2"
        align="center"
        style={{ color: "purple", marginBottom: 50 }}
      >
        Meeting Zone
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
      <p className=" firstLine">PRICING</p>
      <p className="secondLine">Price per unit</p>
      <p className="thirdLine">
        You require a meeting room to host your business partners and clients.
        If you want to have a business event, would you prefer to rent a
        conference room? We offer welcoming apartments that are fully furnished
        and have flexible access lasting up to 24 hours and 7 days a week.
      </p>

      <div className="d-flex justify-content-center align-items-center">
        {service?.tarif.map((item, index) => (
          <div className="col-md-2.5 mx-1" key={index}>
            <div
              className="card serviceCard"
              style={{
                borderRadius: 25,
                transition: "all 1.6s ease-in-out",
              }}
            >
              <div className="card-body service">
                <h1 className="card-title serviceType">{item.name}</h1>
                <p className="price">
                  DT <a className="priceNumber">{item.price}</a>/hrs
                  <p className="soustitle">
                    {item.map} DT HT/ day <br />
                    Capacity: {item.capacity}
                  </p>
                </p>
                <p className="serviceInfo">
                  {item.description.split(",").map((desc, i) => (
                    <span key={i}>
                      {desc}
                      <br /> {/* Add a line break */}
                    </span>
                  ))}
                </p>

                <button
                  className="btn btn-primary"
                  style={{
                    width: 200,
                    marginLeft: 25,
                    backgroundColor: "rgb(230, 229, 232)",
                    borderRadius: 30,
                    color: "black",
                  }}
                >
                  <Link
                    to={"/ReserveMeeting"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Reserve
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="firstLine">Autres Service</p>
      <p className="secondLine">ALL IN ONE PLACE .</p>
      <div className="d-flex justify-content-center align-items-center ">
        <div className="col-md-2.5 mx-1">
          <img
            src="https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png"
            alt="Coworking Zone"
            className="card-img-top"
            style={{
              borderRadius: 35,
              marginBottom: -50,
              height: 250,
              width: 300,
            }}
          />
          <div
            className="card  headerspaceitem"
            style={{
              borderRadius: 25,
              width: 250,
              left: 26,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body  ">
              <h5 className="card-title">Coworking Zone</h5>
              <button
                className="btn btn-primary"
                style={{
                  width: 170,
                  marginLeft: 25,
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
              borderRadius: 35,
              marginBottom: -50,
              height: 250,
              width: 300,
            }}
          />
          <div
            className="card  headerspaceitem"
            style={{
              borderRadius: 25,
              width: 250,
              left: 26,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body ">
              <h5 className="card-title">Private Zone</h5>
              <button
                className="btn btn-primary"
                style={{
                  width: 170,
                  marginLeft: 25,
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
        <div className="col-md-2.5 mx-1">
          <img
            src="https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png"
            alt="Coworking Zone"
            className="card-img-top"
            style={{
              borderRadius: 35,
              marginBottom: -50,
              height: 250,
              width: 300,
            }}
          />
          <div
            className="card  headerspaceitem"
            style={{
              borderRadius: 25,
              width: 250,
              left: 26,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body ">
              <h5 className="card-title">Domiciliation</h5>
              <button
                className="btn btn-primary"
                style={{
                  width: 170,
                  marginLeft: 25,
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
    </div>
  );
}
export default MeetingZone;
