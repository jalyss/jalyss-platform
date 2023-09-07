import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../store/service";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import AddButton from "../../../components/buttons/AddButton";

import "../../../assets/styles/ServiceList.css"; 

export default function ServiceList() {
  const dispatch = useDispatch();
  const servicesStore = useSelector((state) => state.service.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <div>
      <Link to="create-service">
        <AddButton content={"Create a new service"} />
      </Link>
      <div className="service-list-card">
        {servicesStore.items.map((elem, i) => (
          <div className="service-list-card-item" key={i}>
            <img
              src={elem.cover?.path}
              className="service-list-card-img-top"
              alt={elem.cover?.alt}
            />
            <div className="service-list-card-body">
              <h5 className="service-list-card-title">{elem.name}</h5>
              <p className="service-list-card-text">{elem.description}</p>
              <Link to={`service/${elem.id}`} >
                
                <AddButton content={"Go to Details"} />
              </Link>
              <Link to={`edit-service/${elem.id}`}>
                
                <AddButton content={"Edit this service"} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
