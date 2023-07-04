import React from "react";
import { rows } from "../../../constants/publishingHouseData";
import { useParams } from "react-router-dom";

function DetailPublishHouse() {
  const { id } = useParams();
  const PublishHouse = rows[id];
  return (
    <div>
      <div class="container">
        <div class="card mb-3" style={{ width: 1000 }}>
          <div class="row g-0">
            <div class="col-md-4">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  class="img-fluid rounded-start mt-5"
                  src={PublishHouse.logo}
                  alt="Card image cap"
                  style={{ height: 100, width: 250 }}
                />
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title " style={{ textAlign: "center" }}>
                  {" "}
                  {PublishHouse.name}
                </h3>
                <hr></hr>
                <div className="row">
                  <div className="col-2 ">
                    <h6>Name :</h6>
                  </div>
                  <div className="col-4">
                    <p class="card-text">
                      <small class="text-muted">{PublishHouse.name}</small>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-4 ">
                    <h6>Article :</h6>
                  </div>
                  <div className="col-4">
                    <p class="card-text">
                      <small class="text-muted">{PublishHouse.article}</small>
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4 ">
                    <h6>Adresse : </h6>
                  </div>
                  <div className="col-4">
                    <p class="card-text">{PublishHouse.address}</p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-4 ">
                    <h6> Created At : </h6>
                  </div>
                  <div className="col-4">
                    <p class="card-text">
                      <small class="text-muted">
                        {PublishHouse.createdAt}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPublishHouse;
