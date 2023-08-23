import React, { useState, useEffect } from "react";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import useMeta from "../../hooks/useMeta";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  FaShieldAlt,
  FaRegHandshake,
  FaUsers,
  FaMapMarker,
  FaCommentDots,
  FaChair,
  FaWifi,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/service";
import "../../assets/styles/spacejalyss.css";
import { Card } from "antd";
function SpaceJalyss() {
  const { t, i18n } = useTranslation();
  const meta = useMeta(
    t("spaceJalyss.pageName"),
    t("spaceJalyss.pageDescription")
  );
  const images = [
    {
      src: "https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png",
      alt: "Image 1",
    },
    {
      src: "https://www.interieurs.com.tn/wp-content/uploads/2022/11/bureau-new-island-scaled.jpg?v=1669101303",
      alt: "Image 2",
    },
    {
      src: "https://www.meublesmezghani.com/wp-content/uploads/2019/11/04-AMBASSADEUR-4-PIED-Richmond-570x372.jpg",
      alt: "Image 3",
    },
    {
      src: "https://www.megasb.fr/media/0b/e3/a5/1634845517/108752_bild_alter7.jpg",
      alt: "Image 4",
    },
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  function nextImage() {
    setCurrentImage((currentImage + 1) % images.length);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 1500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DocumentMeta {...meta} className="container-fluid">
      <div className="my-2 text-center">
        <div className="row">
          <div className="col">
            <div id="carousel" className="carouselside" data-ride="carousel">
              <ol className="carousel-indicators">
                {images.map((image, index) => (
                  <li
                    key={index}
                    data-target="#carousel"
                    data-slide-to={index}
                    className={index === currentImage ? "active" : ""}
                  ></li>
                ))}
              </ol>
              <div className="carousel-inner carousell">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={
                      "carousel-item " +
                      (index === currentImage ? "active" : "")
                    }
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="d-block w-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body d-flex flex-wrap justify-content-around">
          <div
            className="card p-3 whyUs transition"
            style={{
              position: "relative",
              borderRadius: 20,
              transition: "all 1.4s ease-in-out",
              width: "100%",
              maxWidth: 415,
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <h3 style={{ fontSize: "3rem", color: "rgb(128, 0, 128)" }}>
                  <FaShieldAlt className="me-2" />
                  Quality
                </h3>
              </span>
            </div>
            <p className="my-2 text-start">
              We firmly think that offering a high-quality service is not a
              choice, but rather a responsibility. This is why we strive to
              fulfill all of our customers' needs.
            </p>
          </div>
          <div
            className="card p-3 whyUs transition"
            style={{
              position: "relative",
              borderRadius: 20,
              transition: "all 1.4s ease-in-out",
              width: "100%",
              maxWidth: 415,
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h3 style={{ fontSize: "3rem", color: "rgb(128, 0, 128)" }}>
                <FaRegHandshake /> Flexibility
              </h3>
            </div>
            <p className="my-2 text-start">
              We operate in a flexible manner. We adjust to how you operate.
              Whether you require private offices or shared rooms, we have
              solutions for you.
            </p>
          </div>
          <div
            className="card p-3 whyUs transition"
            style={{
              position: "relative",
              borderRadius: 20,
              transition: "all 1.4s ease-in-out",
              width: "100%",
              maxWidth: 415,
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h3 style={{ fontSize: "3rem", color: "rgb(128, 0, 128)" }}>
                <FaUsers /> Community
              </h3>
            </div>
            <p className="my-2 text-start">
              At Workzone, you'll adore your job! wholly why? because we
              encourage sharing and foster a spirit of cooperation. Our
              community is defined by connectivity.
            </p>
          </div>
        </div>
        <h6 className="firstLine">Find the workspace that inspires you</h6>
        <h1 className="secondLine">Our Services</h1>

        <div className="d-flex flex-wrap justify-content-around align-items-center  ">
          {services.items.map((elem, i) => (
            <div className="col-md-2.5 mx-1 mb-3">
              <img
                src={elem.cover?.path}
                alt={elem.cover?.alt}
                className="card-img-top "
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
                <div className="card-body">
                  <h5 className="card-title" style={{marginBottom:15}}>{elem.name}</h5>
                  <button
                    className="btn "
                    style={{
                      width: 170,
                      
                      backgroundColor: "rgb(144, 48, 152)",
                      borderRadius: 30,
                      color: "black",
                      borderColor: "white"
                    }}
                  >
                    <Link
                      to={elem?.identifier}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Reserve
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      
   
      </div>
<div className=" d-flex flex-wrap justify-content-around align-items-center  ">
    <div className="responsive-container " style={{ marginBottom: '80px'}}>
          <img
           decoding="async"
           width="250px"
           height="100px"
           src="https://www.templenode.com/wp-content/uploads/2013/07/TempleNode-Why-US.png"
           className="attachment-full size-full responsive-img"
           alt=""
           loading="lazy"
           srcSet="https://www.templenode.com/wp-content/uploads/2013/07/TempleNode-Why-US.png 177w, https://www.templenode.com/wp-content/uploads/2013/07/TempleNode-Why-US.png 113w"
           sizes="(max-width: 177px) 100vw, 177px"
           style={{
             marginTop:40,
             borderRadius: 20,
             maxWidth: '100%',
             height: 'auto',
             marginLeft: '50px'
           }}
          />
         </div>
        <div class="text-container">
              <Typography variant="h2" style={{color:'red'}} >
              Why.....?<br/>
              JalyssCom
              </Typography>
              <div variant="h6" >
                    At JalyssCom We value adaptability and initiative in whatever we
                    do as business owners.
                    
                    Our offers can be tailored to your needs and financial situation.
                  
                    Our workspaces encourage collaboration, promote performance, and
                    inspire creativity.
                   
                    They were designed with these goals in mind. Our spaces are
                    secured 
                    and available around-the-clock,
                   
                    include natural light that is good for your staff's wellbeing, and
                    are located in a high-rise building in the middle of a renowned
                    business district.
                 
                    JalyssCom is another place for planned events. Whether it's a
                    workshop, seminar, or other type of training, JalyssCom is always
                    active!
                  </div>
    
        </div>
      </div>
     
    

      <div className="card-body">
        <div className="d-flex flex-wrap justify-content-around">
          <div
            className="card  "
            style={{ width: "10.2rem", borderRadius: 25, marginBottom: "10px" , marginLeft:20 }}
          >
            <div className="card-body">
              <div className="row">
              <div className="card-icon col-2">
                <FaMapMarker />
              </div>
              <h6 className="card-title col-9" style={{marginTop:20}}>2 Espaces coworking</h6>
            </div>
            </div>
          </div>
          <div
            className="card  "
            style={{ width: "10.2rem", borderRadius: 25, marginBottom: "10px" }}
          >
            <div className="card-body">
            <div className="row">
              <div className="card-icon col-2">
                <FaCommentDots />
              </div>
              <h6 className="card-title col-9"  style={{marginTop:20}}>Active Community</h6>
            </div>
            </div>
          </div>
          <div
            className="card  "
            style={{ width: "10.2rem", borderRadius: 25, marginBottom: "10px" }}
          >
            <div className="card-body">
            <div className="row">
              <div className="card-icon col-2">
                <FaChair />
              </div>
              <h6 className="card-title col-9" style={{marginTop:20}}>Comfortable Seating</h6>
            </div>
            </div>
          </div>
          <div
            className="card  "
            style={{ width: "10.2rem", borderRadius: 25, marginBottom: "10px" }}
          >
            <div className="card-body">
            <div className="row">
              <div className="card-icon col-2">
                <FaWifi />
              </div>
              <h6 className="card-title col-9"style={{marginTop:20}}>Free Wi-Fi</h6>
            </div>
            </div>
          </div>
          <div
            className="card  "
            style={{ width: "10.2rem", borderRadius: 25, marginBottom: "10px" }}
          >
            <div className="card-body">
            <div className="row">
              <div className="card-icon col-2">
                <FaCalendarAlt />
              </div>
              <h6 className="card-title col-9"style={{marginTop:20}}>Events</h6>
            </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentMeta>
  );
}

export default SpaceJalyss;
