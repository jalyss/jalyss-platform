import React from "react";
import CarouselImages from "../components/Carousel";
import { Link } from "react-router-dom";

function MeetingZone() {
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
      <p className="secondLine">Price per unit</p>
      <p className="thirdLine">
        You require a meeting room to host your business partners and clients.
        If you want to have a business event, would you prefer to rent a
        conference room? We offer welcoming apartments that are fully furnished
        and have flexible access lasting up to 24 hours and 7 days a week.
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
              <h1 className="card-title serviceType">Meeting Room</h1>
              <p className="price">
                DT <a className="priceNumber">25</a>
                /hrs
                <p className="soustitle">
                  159 DT HT/ day <br />
                  Capacity: 2 to 4 people
                </p>
              </p>
              <p className="serviceInfo">
                <p> Optical fiber</p>
                <p>Smart TV</p>
                <p>White board</p>
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
                  to={"/"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Reserve
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2.5 mx-1 ">
          <div
            className="card serviceCard "
            style={{
              borderRadius: 25,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body service">
              <h1 className="card-title serviceType">Meeting Room</h1>
              <p className="price">
                DT <a className="priceNumber">30</a>
                /hrs
                <p className="soustitle">
                  189 DT HT/ day <br />
                  Capacity: 6 to 8 people
                </p>
              </p>
              <p className="serviceInfo">
                <p> Optical fiber</p>
                <p>Smart TV</p>
                <p>White board</p>
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
                  to={"/"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Reserve
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2.5 mx-1 ">
          <div
            className="card serviceCard "
            style={{
              borderRadius: 25,
              transition: "all 1.6s ease-in-out",
            }}
          >
            <div className="card-body service">
              <h1 className="card-title serviceType">Training Room</h1>
              <p className="price">
                DT <a className="priceNumber">40</a>
                /hrs
                <p className="soustitle">
                  259 DT HT/ day <br />
                  Capacity: 15 people
                </p>
              </p>
              <p className="serviceInfo">
                <p> Optical fiber</p>
                <p>Video Projector</p>
                <p>White board</p>
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
                  to={"/"}
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
