import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../../store/Country";
import SaveButton from "../../../components/Commun/buttons/SaveButton";
import { fetchCities } from "../../../store/city";
import { fetchClientCategories } from "../../../store/clientCategory";
import { createClient } from "../../../store/client";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const navigate = useNavigate();

  const countries = useSelector((state) => state.country.countries.items);
  const categories = useSelector(
    (state) => state.clientCategory.categories.items
  );
  const cities = useSelector((state) => state.city.cities.items);
  const [client, setClient] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchClientCategories());
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
    dispatch(
      createClient(client)).then((res) => {
        if (!res.error) {
          if (!res.error) {
            showSuccessToast("Client has been created");
            navigate(-1);
          } else {
            console.log(res);
            showErrorToast(res.error.message);
          }
        }
      })
    
  };
  return (
    <div>
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
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="p-5"
        // style={{ backgroundColor: "rgb(249,234,250)" }}
      >
        <div className="d-flex flex-wrap gap-5 justify-content-center ">
          <div>
            <label className="form-label">Full Name arabic</label>
            <input
              required
              style={{ width: 300 }}
              className="form-control rounded"
              name="fullNameAr"
              onChange={handleChange}
              value={client?.fullNameAr}
              placeholder="جليس حريف"
            />
          </div>
          <div>
            <label className="form-label">Full Name English</label>
            <input
              required
              style={{ width: 300 }}
              className="form-control rounded"
              name="fullNameEn"
              onChange={handleChange}
              value={client?.fullNameEn}
              placeholder="Jalyss Client"
            />
          </div>

          <div>
            <label className="form-label">Email</label>
            <input
              required
              style={{ width: 300 }}
              type="email"
              className="form-control rounded"
              name="email"
              onChange={handleChange}
              value={client?.email}
              placeholder="example@jalyss.com"
            />
          </div>
          <div>
            <label className="form-label">telephone</label>
            <input
              required
              style={{ width: 300 }}
              type="telephone"
              className="form-control rounded"
              name="tel"
              onChange={handleChange}
              value={client?.tel}
              placeholder="55 555 555"
            />
          </div>
          <div>
            <label className="form-label">َAddress</label>
            <input
              required
              style={{ width: 300 }}
              type="telephone"
              className="form-control rounded"
              name="address"
              onChange={handleChange}
              value={client?.address}
              placeholder="العنبرة"
            />
          </div>

          <div>
            <label className="form-label">Category Client</label>
            <select
              style={{ width: 300 }}
              className="form-control rounded"
              name="nameAr"
              onChange={handleChange}
              value={client?.categoryId}
              placeholder="Category"
            >
              {categories.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">educationLevelId</label>
            <select
              style={{ width: 300 }}
              className="form-control rounded"
              name="educationLevelId"
              onChange={handleChange}
              value={client?.educationLevelId}
              placeholder="educationLevelId"
            >
              {categories.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">functionalAreaId</label>
            <select
              style={{ width: 300 }}
              className="form-control rounded"
              name="functionalAreaId"
              onChange={handleChange}
              value={client?.functionalAreaId}
              placeholder="functionalAreaId"
            >
              {categories.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nameEn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">jobTitleId</label>
            <select
              style={{ width: 300 }}
              className="form-control rounded"
              name="jobTitleId"
              onChange={handleChange}
              value={client?.jobTitleId}
              placeholder="jobTitleId"
            >
              {categories.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nameEn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">countryId</label>
            <select
              style={{ width: 300 }}
              name="countryId"
              defaultValue="your country"
              value={client?.countryId}
              onChange={handleChange}
              className="form-control rounded"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nameEn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">cityId</label>
            <select
              name="cityId"
              style={{ width: 300 }}
              value={client?.cities}
              onChange={handleChange}
              defaultValue="Your city"
              className="form-control rounded"
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center p-5">
          <SaveButton onSubmit={handleSubmit} title={"create"} />
        </div>
      </form>
    </div>
  );
};

export default AddClient;
