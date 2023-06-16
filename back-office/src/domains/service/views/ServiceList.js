import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../store/service";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ServiceList() {
  const dispatch = useDispatch();
  const servicesStore = useSelector((state) => state.service.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <div>
      <Link to="create-service">
        <button>Create a new service</button>{" "}
      </Link>
      <div class="card mb-3">
        {servicesStore.items.map((elem, i) => (
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                src={elem.cover?.path}
                class="card-img"
                alt={elem.cover?.alt}
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{elem.name}</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
              <Link to={`detail/${elem.id}`}>Go to Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
