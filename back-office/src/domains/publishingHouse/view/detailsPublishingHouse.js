import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import {fetchPublishingHouse} from "../../../store/publishingHouse"
import { useDispatch, useSelector } from "react-redux";

function DetailPublishHouse() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [path, setPath] = useState("");

  const publishingHouse = useSelector((state) => state.publishingHouse.publishingHouse);

  useEffect(() => {

    dispatch(fetchPublishingHouse(id));
  }, [path]);




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
                className="img-fluid rounded-start mt-5"
                src={
                  publishingHouse?.logo?.path
                    ? publishingHouse?.logo?.path
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU"
                }
                alt="Card image cap"
                style={{ height: 200, width: 300,padding:"10px" }}
              />
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title " style={{ textAlign: "center" }}>
                  {" "}
                  {publishingHouse?.name}
                </h3>
                <hr></hr>
                <div className="row">
                  <div className="col-2 ">
                    <h6>Name :</h6>
                  </div>
                  <div className="col-4">
                    <p class="card-text">
                      <small class="text-muted">{publishingHouse?.name}</small>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 ">
                    <h6>Address :</h6>
                  </div>
                  <div className="col-4">
                    <p class="card-text">
                      <small class="text-muted">{publishingHouse?.address}</small>
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
