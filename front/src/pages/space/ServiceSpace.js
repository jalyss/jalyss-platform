import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Card, CardMedia, Typography } from "@mui/material";
import { fetchService, fetchServices } from "../../store/space";
import { useDispatch, useSelector } from "react-redux";
import NavLink from "react-bootstrap/esm/NavLink";
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
function ServiceSpace() {
  const { serviceIdentifier } = useParams();
  const serviceStore = useSelector((state) => state.service);
  const { service,services } = serviceStore;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchService(serviceIdentifier));
    dispatch(fetchServices());
  }, [dispatch]);

  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div>
        <Typography
          variant="h2"
          align="center"
          style={{ color: "purple", marginBottom: 50 }}
        >
          {service?.name}
        </Typography>
        <Grid container spacing={3} justifyContent="center" item>
          <Grid item xs={12} sm={12} sx={{ width: { xs: "100%", sm: "50%" } }}>
            <imageGroup className={classes.imagesGroup}>
              {service?.MediaService.filter((elem, j) => j % 2 === 0).map(
                (item, i) => (
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      image={item.media.path}
                    />
                  </Card>
                )
              )}
            </imageGroup>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={12} sx={{ width: { xs: "100%", sm: "50%" } }}>
            <imageGroup className={classes.imagesGroup}>
              {service?.MediaService.filter((elem, j) => j % 2 !== 0).map(
                (item, i) => (
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      image={item.media.path}
                    />
                  </Card>
                )
              )}
            </imageGroup>
          </Grid>
        </Grid>
        <p className="firstLine">PRICING</p>
        <p className="secondLine">'Price per unit'</p>
        <p className="thirdLine">
          'We provide several coworking spaces with flexible access that extends
          to 24 hours and 7 days a week for freelancers, business owners, and
          team members.By deciding on the number of workdays every month, you
          can further customize your experience.'
        </p>
        <p className="fourthLine">
          'To grow your business in a setting that is both professional and
          social, reserve a spot in one of our coworking spaces.'
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
                    Only <a className="priceNumber"> {item.price}</a>DT
                    <p className="soustitle">Capacity: {item.capacity}</p>
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
        <p className="secondLine">'ALL IN ONE PLACE .'</p>
        <p className="thirdLine">
          'We provide practical solutions to help you advance your project. A
          wide range of options are available to you, from domiciliation to
          installation in one of our offices.'
        </p>
        <p className="fourthLine">
          'Look for a workspace that works for you and pick a service that meets
          your needs.'
        </p>

        <div className="d-flex justify-content-center align-items-center ">
          {services.items
            .filter((item) => item.identifier !== serviceIdentifier)
            .map((elem, i) => (
              <div className="col-md-2.5 mx-1">
                <img
                  src={elem.cover?.path}
                  alt={elem.cover?.alt}
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
                    <h5 className="card-title">{elem.name}</h5>
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
                      <NavLink
                        href={`/spaceJalyss/${elem?.identifier}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {" "}
                        Reserve
                      </NavLink>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default ServiceSpace;
