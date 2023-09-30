import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, findAllCitites } from "../../../store/Country";
import validate from "../../../utils/form-validation";
import useForm from "../../../hooks/data-validation";
// import initialState from "./initialSate";
const initialState = {
  nameAr: {
    value: "",
    required: true,
  },
  nameEn: {
    value: "",
    required: true,
  },
  number: {
    value: "",
    required: false,
  },
  email: {
    value: "",
    required: true,
    requiredMessage: "Email address is required!",
    email: true,
    emailMessage: "Email address is not valid!",
  },
  password: {
    value: "",
    required: true,
    minLength: 6,
    minLengthMessage: "at least 6 characters long!",
    maxLength: 16,
    maxLengthMessage: "Too many characters!",
  },
  confirmPassword: {
    value: "",
    required: true,
    matchWith: "password",
    matchWithMessage: "Passwords must be equal!",
  },
  jobEn: {
    value: "",
    required: false,
  },
  jobAr: {
    value: "",
    required: false,
  },

  country: {
    value: "",
    required: false,
  },
  cities: {
    value: "",
    required: false,
  },
};

const AddClient = () => {
  const countries = useSelector((state) => state.country.countries.items);
  const { formData, errors, changeHandler, setErrors } = useForm(
    initialState,
    validate
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
    let newErrors = validate(formData, true);
    console.log(newErrors);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const data = new FormData();
      data.append("nameAr", formData.nameAr.value);
      data.append("nameEn", formData.nameEn.value);

      data.append("email", formData.email.value);
      data.append("password", formData.password.value);
      data.append("number", formData.number.value);
      data.append("country", formData.country.value);
      data.append("cities", formData.cities.value);
      data.append("jobAr", formData.jobAr.value);
      data.append("jobEn", formData.jobEn.value);

      console.log("form can be submitted...");
      for (let pair of data.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
    }
  };
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <div
              style={{ backgroundColor: "rgb(77,24,71)" }}
              className="modal-header"
            >
              <h1
                className="modal-title fs-5"
                style={{ color: "white" }}
                id="staticBackdropLabel"
              >
                Add client
              </h1>
              <button
                //   style={{ : "white" }}
                type="button"
                className="btn-close btn-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              // style={{ backgroundColor: "rgb(249,234,250)" }}
              className="modal-body d-flex justify-content-center align-items-center flex-column"
            >
              <div className="d-flex gap-2 mb-3">
                <div className="">
                  <label htmlFor="nameAr" className="form-label">
                    Full Name arabic
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    id="nameAr"
                    name="nameAr"
                    onChange={changeHandler}
                    value={formData.nameAr.value}
                    placeholder="arabic Name"
                    error={errors.nameAr}
                  />
                  {errors.nameAr && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.nameAr}
                    </p>
                  )}
                </div>
                <div className="">
                  <label htmlFor="nameEn" className="form-label">
                    Full Name English
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    id="nameEn"
                    name="nameEn"
                    onChange={changeHandler}
                    value={formData.nameEn.value}
                    placeholder="English Name"
                    error={errors.nameEn}
                  />
                  {errors.nameEn && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.nameEn}
                    </p>
                  )}
                </div>
              </div>
              <div className="d-flex gap-2 mb-3">
                <div className="">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control rounded"
                    style={{ padding: "10px" }}
                    id="email"
                    placeholder="name@example.com"
                    name="email"
                    value={formData.email.value}
                    onChange={changeHandler}
                    error={errors.email}
                  />
                  {errors.email && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="">
                  <label htmlFor="number" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="number"
                    className="form-control rounded"
                    id="number"
                    name="number"
                    value={formData.number.value}
                    onChange={changeHandler}
                    error={errors.number}
                    placeholder="Phone number"
                  />
                  {errors.number && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.number}
                    </p>
                  )}
                </div>
              </div>
              <div className="d-flex gap-2 mb-3">
                <div className="">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    value={formData.password.value}
                    onChange={changeHandler}
                    error={errors.password}
                    type="password"
                    className="form-control rounded"
                    id="password"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="">
                  <label htmlFor="confirmPassword" className="form-label">
                    Repeat password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword.value}
                    onChange={changeHandler}
                    error={errors.confirmPassword}
                    placeholder="Repeat your password"
                  />
                  {errors.confirmPassword && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <div className="d-flex gap-2 mb-3">
                <div className="">
                  <label htmlFor="jobEn" className="form-label">
                    English job title
                  </label>
                  <input
                    type="text"
                    name="jobEn"
                    value={formData.jobEn.value}
                    onChange={changeHandler}
                    error={errors.jobEn}
                    className="form-control rounded"
                    id="jobEn"
                    placeholder="English job title"
                  />
                  {errors.jobEn && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.jobEn}
                    </p>
                  )}
                </div>
                <div className="">
                  <label htmlFor="jobAr" className="form-label">
                    Arabic job title
                  </label>
                  <input
                    type="text"
                    name="jobAr"
                    value={formData.jobAr.value}
                    onChange={changeHandler}
                    error={errors.jobAr}
                    className="form-control rounded"
                    id="jobAr"
                    placeholder="Arabic job title"
                  />
                  {errors.jobAr && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.jobAr}
                    </p>
                  )}
                </div>
              </div>
              <div className="d-flex gap-2 mb-3" style={{ width: "inherit" }}>
                <select
                  name="country"
                  id="country"
                  defaultValue="your country"
                  value={formData.country.value}
                  onChange={changeHandler}
                  // style={{ width: "inherit" }}
                  className="form-select form-select"
                  aria-label="Small select example"
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.nameEn}>
                      {country.nameEn}
                    </option>
                  ))}
                  {errors.country && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.country}
                    </p>
                  )}
                </select>
                <select
                  name="cities"
                  id="cities"
                  value={formData.cities.value}
                  onChange={changeHandler}
                  // style={{ width: "inherit" }}
                  defaultValue="Your city"
                  className="form-select form-select"
                  aria-label="Small select example"
                >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  {errors.country && (
                    <p
                      style={{
                        fontSize: "0.7rem",

                        margin: "0.2rem 0px 0px 0px",
                        padding: 0,
                      }}
                      className="text-sm text-danger"
                    >
                      {errors.country}
                    </p>
                  )}
                </select>
              </div>
            </div>{" "}
            <div
              // style={{ backgroundColor: "rgb(77,24,71)" }}
              className="modal-footer"
            >
              <button
                style={{ backgroundColor: "rgb(249,234,250)" }}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                style={{ backgroundColor: "rgb(220,53,69)", border: "none" }}
                // type="button"
                className="btn btn-primary"
                type="submit"
              >
                Understood
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
