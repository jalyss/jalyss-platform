import React, { useState, useEffect } from "react";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import useMeta from "../../hooks/useMeta";
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
import { fetchServices } from "../../store/space";
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
        {/* <img src="https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png" alt="Working zone" className="mb-4" style={{width:2000}} /> */}
        <div className="row">
          <div className="col">
            <div id="carousel" className="carousel slide" data-ride="carousel">
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
                <h3 style={{ fontSize: "3rem", color: "darkred" }}>
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
              <h3 style={{ fontSize: "3rem", color: "darkred" }}>
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
              <h3 style={{ fontSize: "3rem", color: "darkred" }}>
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

        <div className="d-flex justify-content-center align-items-center ">
          {services.items.map((elem, i) => (
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
                    <Link
                      to={elem?.identifier}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {" "}
                      Reserve
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
         
        </div>

        <div
          className="card mb-4"
          style={{ marginTop: 50, backgroundColor: "rgb(240, 240, 240)" }}
        >
          <img
            decoding="async"
            width="1498"
            height="300"
            src="https://o.remove.bg/downloads/b06c6746-f3fe-4039-97d6-0fc0f05ae263/lightbulb-moment-royalty-free-image-176565702-1563363264-removebg-preview.png"
            class="attachment-full size-full responsive-img"
            alt=""
            loading="lazy"
            srcset="https://o.remove.bg/downloads/b06c6746-f3fe-4039-97d6-0fc0f05ae263/lightbulb-moment-royalty-free-image-176565702-1563363264-removebg-preview.png 177w, https://o.remove.bg/downloads/b06c6746-f3fe-4039-97d6-0fc0f05ae263/lightbulb-moment-royalty-free-image-176565702-1563363264-removebg-preview.png 113w"
            sizes="(max-width: 177px) 100vw, 177px"
            style={{
              borderRadius: 20,
            }}
          />
          <div className="card-body d-flex justify-content-around">
            <img
              decoding="async"
              width="198"
              height="471"
              src="https://www.templenode.com/wp-content/uploads/2013/07/TempleNode-Why-US.png"
              class="attachment-full size-full responsive-img"
              alt=""
              loading="lazy"
              srcset="https://www.templenode.com/wp-content/uploads/2013/07/TempleNode-Why-US.png 177w, https://www.templenode.com/wp-content/uploads/2013/07/TempleNode-Why-US.png 113w"
              sizes="(max-width: 177px) 100vw, 177px"
              style={{
                borderRadius: 20,
              }}
            />

            <div
              class="card p-1 whyUs"
              style={{
                position: "relative",
                borderRadius: 23,
                transition: "all 1.8s ease-in-out",
              }}
            >
              <div class="d-flex justify-content-between align-items-center ">
                <span>
                  <h6
                    className="my-2 text-start"
                    style={{ fontSize: "1.2rem", color: "red" }}
                  >
                    Why....?
                  </h6>
                  <h3
                    className=" mx-5 mb-4"
                    style={{ fontSize: "3.2rem", color: "darkred" }}
                  >
                    JalyssCom
                  </h3>
                </span>
              </div>

              <p class="my-2 text-start " style={{ fontSize: "1.5rem" }}>
                At JalyssCom We value adaptability and initiative in whatever we
                do as business owners.
                <br />
                Our offers can be tailored to your needs and financial
                situation.
                <br />
                Our workspaces encourage collaboration, promote performance, and
                inspire creativity.
                <br />
                They were designed with these goals in mind. Our spaces are
                secured <br />
                and available around-the-clock,
                <br />
                include natural light that is good for your staff's wellbeing,
                and are located in a high-rise building in the middle of a
                renowned business district.
                <br />
                JalyssCom is another place for planned events. Whether it's a
                workshop, seminar, or other type of training, JalyssCom is
                always active!
              </p>
            </div>

            <img
              decoding="async"
              width="198"
              height="471"
              src="https://freepngimg.com/convert-png/72547-thinking-photography-question-mark-man-stock"
              class="attachment-full size-full responsive-img"
              alt=""
              loading="lazy"
              srcset="https://freepngimg.com/convert-png/72547-thinking-photography-question-mark-man-stock 172w, https://freepngimg.com/convert-png/72547-thinking-photography-question-mark-man-stock 108w"
              sizes="(max-width: 172px) 100vw, 172px"
              style={{
                borderRadius: 20,
              }}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="col-md-2.5 mx-4">
              <div
                className="card whyUs"
                style={{
                  width: 120,
                  height: 135,
                  borderRadius: 25,
                  transition: "all 1.7s ease-in-out",
                }}
              >
                <div className="card-body ">
                  <h3>
                    <FaMapMarker style={{ color: "darkred " }} />
                  </h3>
                </div>
                <p>2 Espaces coworking</p>
              </div>
            </div>
            <div className="col-md-2.5 mx-4">
              <div
                className="card whyUs"
                style={{
                  width: 120,
                  height: 135,
                  borderRadius: 25,
                  transition: "all 1.7s ease-in-out",
                }}
              >
                <div className="card-body ">
                  <h3>
                    <FaCommentDots style={{ color: "darkred " }} />
                  </h3>
                </div>
                <p>Active Community</p>
              </div>
            </div>
            <div className="col-md-2.5 mx-4 ">
              <div
                className="card whyUs"
                style={{
                  width: 120,
                  height: 135,
                  borderRadius: 25,
                  transition: "all 1.7s ease-in-out",
                }}
              >
                <div className="card-body ">
                  <h3>
                    <FaChair style={{ color: "darkred " }} />
                  </h3>
                </div>
                <p>Comfortable Seating</p>
              </div>
            </div>
            <div className="col-md-2.5 mx-4">
              <div
                className="card whyUs"
                style={{
                  width: 120,
                  height: 135,
                  borderRadius: 25,
                  transition: "all 1.7s ease-in-out",
                }}
              >
                <div className="card-body ">
                  <h3>
                    <FaWifi style={{ color: "darkred " }} />
                  </h3>
                </div>
                <p>Free Wi-Fi</p>
              </div>
            </div>
            <div className="col-md-2.5 mx-4">
              <div
                className="card whyUs"
                style={{
                  width: 120,
                  height: 135,
                  borderRadius: 25,
                  transition: "all 1.7s ease-in-out",
                }}
              >
                <div className="card-body ">
                  <h3>
                    <FaCalendarAlt style={{ color: "darkred " }} />
                  </h3>
                </div>
                <p>Events </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentMeta>
  );
}

export default SpaceJalyss;
