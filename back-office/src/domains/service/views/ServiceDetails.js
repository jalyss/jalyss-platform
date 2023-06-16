import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServiceById } from "../../../store/service";

import AddButton from "../../../components/buttons/AddButton";
import { BsPersonWorkspace } from "react-icons/bs";

// import CreateWorkSpace from '../views/CreateWorkSpace';

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.service);

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
    // dispatch(fetchSpacesById(id));
  }, [dispatch]);

  // console.log(serviceW,"lol")

  return (
    <div className="view">
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
      <div className="d-flex justify-content-end">
        <AddButton
          onClick={() => navigate(`create-workspace`)}
          content="Create space"
          startIcon
          Icon={<BsPersonWorkspace />}
        />
      </div>

      <div class="card">
        {service?.workSpace.map((elem, i) => (
          <div key={i}>
            <img
              class="card-img-top"
              src={elem.image?.path}
              alt={elem.image?.alt}
            />
            <div class="card-body">
              <h5 class="card-title">{elem.name}</h5>
              <p class="card-text">{elem.description}</p>
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
      </div>
    </div>
  );
}
