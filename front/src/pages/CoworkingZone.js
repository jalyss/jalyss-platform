import React from "react";
import CarouselImages from "../components/Carousel";
import { Link } from "react-router-dom";

function CoworkingZone() {
  return (
    <div>
      <CarouselImages
        images={[
          "https://assets.devx.work/images/blog/blog-detail/co-working-enterpreneyrs/slider-part/coworking-ahmedaba-slider-5.png",
          "https://www.interieurs.com.tn/wp-content/uploads/2022/11/bureau-new-island-scaled.jpg?v=1669101303",
          "https://www.meublesmezghani.com/wp-content/uploads/2019/11/04-AMBASSADEUR-4-PIED-Richmond-570x372.jpg",
          "https://www.megasb.fr/media/0b/e3/a5/1634845517/108752_bild_alter7.jpg",
        ]}
      />
      <p className=" firstLine">PRICING</p>
      <p className="secondLine">PRICE PER UNIT</p>
      <p className="thirdLine">
        We provide several coworking spaces with flexible access that extends to
        24 hours and 7 days a week for freelancers, business owners, and team
        members. <br/>By deciding on the number of workdays every month, you can
        further customize your experience.
      </p>
      <p className="fourthLine">
        To grow your business in a setting that is both professional and social,
        reserve a spot in one of our coworking spaces.
      </p>
      <div className="d-flex justify-content-center align-items-center ">
        <div className="col-md-2.5 mx-1 ">
          <div
            className="card serviceCard "
            style={{
               borderRadius: 25,      
              transition: "all 1.6s ease-in-out",

            }}
          >
            <div className="card-body service">
              <h1 className="card-title serviceType">Day Pass</h1>
              <p className="price">
                DT <a className="priceNumber">25</a>
                HT/jour
                <p className="soustitle">par personne</p>
              </p>
              <p className="serviceInfo">
                <p> Wifi</p>
                <p>Café</p>
                <p>Imprimante</p>
                <p>Call box privée</p>
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
                  to={"/ReserveCoworkin"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Reserve
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2.5 mx-1">
          <div
            className="card serviceCard "
            style={{
              marginTop: 80,
              borderRadius: 25,
              width: 290,
              left: 28,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body ">
              <h1 className="card-title serviceType">WeeK Pass</h1>
              <p className="price">
                DT <a className="priceNumber">99</a>
                HT/Semaine
                <p className="soustitle">par personne</p>
              </p>
              <p className="serviceInfo">
                <p>Accès 24 hrs / 7 jrs</p>
                <p>2 sites de coworking</p>
                <p>Salle de réunion a -40%</p>
                <p>Call box privée</p>
                <p>Accès au WorkZone Events</p>
                <p>Café</p>
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
                  to={"/ReserveCoworkin"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Reserve
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2.5 mx-1">
          <div
            className="card serviceCard "
            style={{
              marginTop: 80,
              borderRadius: 25,
              width: 290,
              left: 28,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body ">
              <h1 className="card-title serviceType">Full time</h1>
              <p className="price">
                DT <a className="priceNumber">299</a>
                HT/Mois
                <p className="soustitle">par personne/par mois</p>
              </p>
              <p className="serviceInfo">
                <p>Accès 24 hrs / 7 jrs</p>
                <p>2 sites de coworking</p>
                <p>Salle de réunion a -40%</p>
                <p>Call box privée</p>
                <p>Accès au WorkZone Events</p>
                <p>Café</p>
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
                  to={"/ReserveCoworkin"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Reserve
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="firstLine">Autres Service</p>
      <p className="secondLine">ALL IN ONE PLACE .</p>
      <p className="thirdLine">
        We provide practical solutions to help you advance your project. A wide
        range of options are available to you, from domiciliation to
        installation in one of our offices.
      </p>
      <p className="fourthLine">
        Look for a workspace that works for you and pick a service that meets
        your needs.
      </p>

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
            <div className="card-body ">
              <h5 className="card-title">Meetings Zone</h5>
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
export default CoworkingZone;
