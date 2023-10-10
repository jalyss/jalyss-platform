import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { editClient, fetchClient } from "../../../store/client";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import CancelButton from "../../../components/Commun/buttons/CancelButton";
import SaveButton from "../../../components/Commun/buttons/SaveButton";
import CropEasy from "../../../components/CropEasy";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import { uploadFileAxios } from "../../../helpers/uploadFileAxios";
import TextInput from "../../../components/TextInput";
import Select from "../../../components/Select";
import { fetchCountries } from "../../../store/Country";
import { fetchCities } from "../../../store/city";
import { fetchFunctionalAreas } from "../../../store/functionalArea";
import { fetchEducationLevels } from "../../../store/educationLevel";
import { fetchJobTitles } from "../../../store/jobTitle";
import { fetchClientCategories } from "../../../store/clientCategory";

import { fetchCommandsByClientId } from "../../../store/command";

import CommandClientList from "../components/CommandClientList";
const OneClient = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const clientStore = useSelector((state) => state.client);
  const categories = useSelector(
    (state) => state.clientCategory.categories.items
  );
  const countries = useSelector((state) => state.country.countries.items);
  const cities = useSelector((state) => state.city.cities.items);
  const functionalAreas = useSelector(
    (state) => state.functionalArea.functionalAreas.items
  );
  const educationLevels = useSelector(
    (state) => state.educationLevel.educationLevels.items
  );
  const jobTitles = useSelector((state) => state.jobTitle.jobTitles.items);
  const commands = useSelector((state) => state.command.commands.items);

  const [client, setClient] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  const [progress, setProgress] = useState(null);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchFunctionalAreas());
    dispatch(fetchEducationLevels());
    dispatch(fetchJobTitles());
    dispatch(fetchClientCategories());
  }, [dispatch]);

  useEffect(() => {
    if (client.countryId) dispatch(fetchCities(client.countryId));
  }, [dispatch, client?.countryId]);

  useEffect(() => {
    dispatch(fetchClient(clientId));
    dispatch(fetchCommandsByClientId(clientId))
  }, [dispatch, clientId]);

  useEffect(() => {
    if (clientStore.client) setClient(clientStore.client);
  }, [clientStore.client]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value);
    setClient((prevClient) => ({
      ...prevClient,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editMode) {
      let aux = { ...client };

      if (avatar !== null) {
        const image = new FormData();
        image.append("file", avatar);
        const response = await uploadFileAxios(image, setProgress);
        aux.avatarId = response.data.id;
      }
      delete aux.country;
      delete aux.city;
      delete aux.jobTitle;
      delete aux.functionalArea;
      delete aux.educationLevel;
      delete aux.category;
      delete aux.avatar;
      dispatch(editClient(aux)).then((res) => {
        if (!res.error) {
          showSuccessToast("Client has been updated");
        } else {
          console.log(res);
          showErrorToast(res.error.message);
        }
      });
    }

    setEditMode(!editMode);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setOpenCrop(true);
    setAvatar(file);
  };

  return !openCrop ? (
    <div className="">
      <h2
        className=" text-center"
        style={{
          color: "white",
          backgroundColor: "rgb(77,24,71)",
          margin: 0,
        }}
      >
        Client Profile
      </h2>
      <div className="d-flex justify-content-center p-4">
        <div className="image-upload">
          <img src={preview ? preview : client?.avatar?.path} alt="avatar" />

          {editMode && (
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          )}
        </div>
        {preview && editMode && (
          <button
            type="button"
            class="delete-button"
            onClick={() => {
              setPreview(null);
              setAvatar(null);
            }}
          >
            X
          </button>
        )}
      </div>
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="">
          <div className="d-flex flex-wrap gap-5 justify-content-center ">
            <TextInput
              required
              label="nameAr"
              name="fullNameAr"
              value={client?.fullNameAr}
              onChange={handleChange}
              editMode={editMode}
              placeholder="جليس حريف"
              width={300}
            />

            <TextInput
              required
              label="nameEn"
              name="fullNameEn"
              value={client?.fullNameEn}
              onChange={handleChange}
              editMode={editMode}
              placeholder="Jalyss Client"
              width={300}
            />
            <TextInput
              required
              label="email"
              name="email"
              type="email"
              value={client?.email}
              onChange={handleChange}
              editMode={editMode}
              placeholder="example@jalyss.com"
              width={300}
            />
            <TextInput
              required
              label="Telephone"
              editMode={editMode}
              type="telephone"
              name="tel"
              value={client?.tel}
              onChange={handleChange}
              placeholder="55 555 555"
              width={300}
            />
            <TextInput
              required
              label="Address"
              editMode={editMode}
              name="address"
              value={client?.address}
              onChange={handleChange}
              width={300}
            />
            <Select
              data={countries}
              editMode={editMode}
              label={"country"}
              viewLabel={"nameAr"}
              value={client.countryId}
              name={"countryId"}
              onChange={handleChange}
              valueLabel={"id"}
              width={300}
            />
            <Select
              data={cities}
              editMode={editMode && client.countryId}
              label={"city"}
              viewLabel={"nameAr"}
              value={client.cityId}
              name={"cityId"}
              onChange={handleChange}
              valueLabel={"id"}
              width={300}
            />
            <Select
              data={functionalAreas}
              editMode={editMode}
              label={"functionalArea"}
              viewLabel={"nameAr"}
              value={client.cityId}
              name={"functionalAreaId"}
              onChange={handleChange}
              valueLabel={"id"}
              width={300}
            />
            <Select
              data={educationLevels}
              editMode={editMode}
              label={"educationLevel"}
              viewLabel={"nameAr"}
              value={client.cityId}
              name={"educationLevelId"}
              onChange={handleChange}
              valueLabel={"id"}
              width={300}
            />
            <Select
              data={jobTitles}
              editMode={editMode}
              label={"jobTitle"}
              viewLabel={"nameAr"}
              value={client.cityId}
              name={"jobTitleId"}
              onChange={handleChange}
              valueLabel={"id"}
              width={300}
            />
            <Select
              data={categories}
              editMode={editMode}
              label={"Category "}
              viewLabel={"nameAr"}
              value={client.categoryId}
              name={"categoryId "}
              onChange={handleChange}
              valueLabel={"id"}
              width={300}
            />
          </div>
        </div>
        {progress && progress !== 100 && (
          <ProgressBar now={progress} label={`${progress}%`} />
        )}
        <div className="w-100 d-flex justify-content-center mt-3 gap-3">
          {editMode ? (
            <>
              <CancelButton
                onClick={() => {
                  setEditMode(false);
                  setClient(clientStore.client);
                }}
              />
              <SaveButton onSubmit={handleSubmit} type={"submit"} />
            </>
          ) : (
            <button type="submit" className="confirm-button">
              <span className="label-btn">Edit Profile</span>
            </button>
          )}
        </div>
      </form>
      <div className="p-5">
        <CommandClientList rows={commands} />
      </div>
    </div>
  ) : (
    <CropEasy {...{ preview, setOpenCrop, setPreview, setAvatar, avatar }} />
  );
};
export default OneClient;

