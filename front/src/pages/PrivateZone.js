import React from 'react';
import { Link } from "react-router-dom";




function PrivateZone() {
  

  return (
    <>
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
};
export default PrivateZone