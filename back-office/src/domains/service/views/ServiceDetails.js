import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "../../../store/service";

import { useNavigate } from "react-router-dom";
import { fetchSpacesById } from "../../../store/space";

// import CreateWorkSpace from '../views/CreateWorkSpace';

export default function ServiceDetails() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.service.service);
  // const spacesStore = useSelector((state) => state.space.spaces);
  
  const params = useParams();
  const navigate = useNavigate();
  const service = store;
  const id = params.id;
  useEffect(() => {
    dispatch(fetchServiceById(id));
    dispatch(fetchSpacesById(id));
  }, [dispatch]);


  // console.log(spacesStore, "spaces");

  return (
    <div>
      <div class="card mb-3">
        {service && (
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src={service.cover?.path} class="card-img" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{service.name}</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button onClick={() => navigate(`/space/create/` + `${params.id}`)}>
        Create space
      </button>

      {/* <div class="card" style="width: 18rem;">
  {spacesStore.items.map((elem, i) => (
    <div key={i}>
      <img class="card-img-top" src="..." alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">
          Card link
        </a>
        <a href="#" class="card-link">
          Another link
        </a>
      </div>
    </div>
  ))}
</div> */}

    </div>
  );
}
