import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, findAllCitites } from "../../../store/Country";
import validate from "../../../utils/form-validation";
import useForm from "../../../hooks/data-validation";
import CreateButton from "../../../components/Commun/buttons/CreateButton";
import SaveButton from "../../../components/Commun/buttons/SaveButton";
import { fetchCities } from "../../../store/city";
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
  const cities = useSelector((state) => state.city.cities.items);
  const [client, setClient] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  useEffect(() => {
    if (client.countryId) dispatch(fetchCities(client.countryId));
  }, [dispatch, client?.countyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((Client) => ({ ...Client, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="">
        <h2
          className=" text-center"
          style={{
            color: "white",
            backgroundColor: "rgb(77,24,71)",
            margin: 0,
          }}
        >
          Add client
        </h2>
        <div
          style={{ backgroundColor: "rgb(249,234,250)" }}
          className="d-flex flex-wrap gap-3 p-5"
        >
          <div>
            <label htmlFor="nameAr" className="form-label">
              Full Name arabic
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              value={client?.nameAr}
              placeholder="arabic Name"
            />
          </div>
          <div>
            <label htmlFor="nameAr" className="form-label">
              Full Name arabic
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              value={client?.nameAr}
              placeholder="arabic Name"
            />
          </div>

          <div>
            <label htmlFor="nameAr" className="form-label">
              Full Name arabic
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              value={client?.nameAr}
              placeholder="arabic Name"
            />
          </div>
          <div>
            <label htmlFor="nameAr" className="form-label">
              Full Name arabic
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              value={client?.nameAr}
              placeholder="arabic Name"
            />
          </div>

          <div>
            <label htmlFor="nameAr" className="form-label">
              Full Name arabic
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              value={client?.nameAr}
              placeholder="arabic Name"
            />
          </div>
          <div>
            <label htmlFor="nameAr" className="form-label">
              Full Name arabic
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              value={client?.nameAr}
              placeholder="arabic Name"
            />
          </div>

          <div>
            <label htmlFor="nameAr" className="form-label">
              Full Name arabic
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              value={client?.nameAr}
              placeholder="arabic Name"
            />
          </div>
          <div>
            <label htmlFor="nameAr" className="form-label">
              Full Name arabic
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              value={client?.nameAr}
              placeholder="arabic Name"
            />
          </div>
          <div>
            <label htmlFor="nameAr" className="form-label">
              Full Name arabic
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              value={client?.nameAr}
              placeholder="arabic Name"
            />
          </div>
          <div>
            <label className="form-label">Arabic job title</label>
            <select
              name="countryId"
              defaultValue="your country"
              value={client?.countryId}
              onChange={handleChange}
              className="form-control"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nameEn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Arabic job title</label>
            <select
              name="cityId"
              id="cities"
              value={client?.cities}
              onChange={handleChange}
              defaultValue="Your city"
              className="form-select form-select"
              aria-label="Small select example"
            >
              {cities.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <SaveButton onSubmit={handleSubmit} title={"create"} />
        </div>
      </form>
    </div>
  );
};

export default AddClient;
