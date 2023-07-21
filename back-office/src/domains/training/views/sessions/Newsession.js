import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateNeswSession } from "../../../../store/sessions";
import { Title } from "@mui/icons-material";
import AutoCompleteFilter from "../../../../components/Commun/AutoCompleteFilter";
import { fetchCategories } from "../../../../store/category";
import AddButton from "../../../../components/buttons/AddButton";
import { useNavigate } from "react-router-dom";
import SaveButton from "../../../../components/Commun/buttons/SaveButton";
import { useRef } from "react";
import Select from "react-select";
import Modal from "../../../../components/Commun/Modal";

import axios from "axios";
import { fetchFeatures } from "./../../../../store/tarifss";
import TrainingStepper from "../../../../components/TrainingStepper";
import TarifSection from "../../../../components/TarifSection";
import { DataGrid } from "@mui/x-data-grid";
import StyledInput from "../../../../components/Commun/inputs/StyledInput";
import { Box } from "@mui/material";
import CloseButton from "../../../../components/Commun/buttons/CloseButton";
const columns = [
  { field: "title", headerName: "Title" },
  { field: "price", headerName: "Price" },
];
const Addtarif = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const categoriesStore = useSelector((state) => state.category);
  const featuresStore = useSelector((state) => state.tarifss.features);
  const [selectedFeaturesIds, setSelectedFeaturesIds] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [cover, setCover] = useState("");
  const [addsession, setAddsession] = useState({ tarifs: [] });
  const [tarif, setTarif] = useState(null);

  const { categories } = categoriesStore;
  const [categoryId, setCategoryId] = useState("");
  const [showAddTarifModal, setShowAddTarifModal] = useState(false);
  const fileInputRef = useRef(null); // Reference to the file input element

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFeatures());
  }, [dispatch]);

  const handleAddsessionChange = (e) => {
    const { name, value } = e.target;

    setAddsession((Addsession) => ({
      ...Addsession,
      [name]: value,
    }));
  };
  useEffect(() => {
    const selectedLabels = selectedFeaturesIds.map((id) => {
      const feature = featuresStore?.items.find((item) => item.id === id);
      return feature ? feature.label : "";
    });
    setSelectedLabels(selectedLabels);
  }, [selectedFeaturesIds]);

  const submitsession = async (event) => {
    event.preventDefault();
    let sess = Object.assign({}, addsession);
    sess.categoryId = categoryId;
    sess.startDate = new Date(sess.startDate);
    sess.endDate = new Date(sess.endDate);
    if (cover !== null) {
      const image = new FormData();
      image.append("file", cover);
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/upload`,
        image
      );
      sess.coverId = response.data.id;
    }

    sess.SessionHasFeaturesIds = selectedFeaturesIds;
    dispatch(CreateNeswSession(sess)).then((res) => {
      if (!res.error) {
        showSuccessToast("session.created");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
  };

  const handleChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      alert("Please choose a category!");
    } else {
      setCategoryId(selectedOption);
    }
  };
  const handleImageClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input click event
  };
  console.log(tarif);
  return (
    <div
      className="d-flex align-items-center justify-content-center "
      style={{ marginTop: 50, marginBottom: 200 }}
    >
      <div style={{ width: "50rem" }} className="text-center custom-card">
        <label class="form-label mt-5" for="customFile">
          Image{" "}
        </label>

        <input
          type="file"
          className="form-control visually-hidden"
          id="customFile"
          onChange={handleImageChange}
          ref={fileInputRef}
        />

        {cover && (
          <img
            src={URL.createObjectURL(cover)}
            alt="Cover Image"
            style={{
              width: "200px",
              height: "200px",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={handleImageClick}
            className="rounded"
          />
        )}
        {!cover && (
          <input
            type="file"
            className="form-control "
            onChange={handleImageChange}
          />
        )}

        <Form.Label>title</Form.Label>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={addsession?.Title}
          onChange={handleAddsessionChange}
        />

        <Form.Group controlId="tariffDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={addsession?.description}
            placeholder="Enter description"
            name="description"
            onChange={handleAddsessionChange}
          />
        </Form.Group>
        <Form.Group controlId="tariffPrice">
          <Form.Label>start-Date</Form.Label>
          <Form.Control
            type="date"
            value={addsession?.startDate}
            name="startDate"
            placeholder="startDate"
            onChange={handleAddsessionChange}
          />
        </Form.Group>
        <Form.Group controlId="tariffPrice">
          <Form.Label>end-Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={addsession?.endDate}
            placeholder="endDate"
            onChange={handleAddsessionChange}
          />
        </Form.Group>
        <Form.Group controlId="tariffPrice">
          <select
            value={categoryId}
            class="form-select mt-3"
            aria-label="Default select example"
            onChange={handleChange}
            required
          >
            <option value="" disabled selected>
              Choose your Blog category
            </option>
            {categories.items.map((category, index) => (
              <option key={index} value={category.id}>
                {category.nameEn}
              </option>
            ))}
          </select>
        </Form.Group>
        <div className="mt-4">
          <AutoCompleteFilter
            data={featuresStore?.items}
            valueOptionName="id"
            labelOptionName="label"
            label="Add features"
            onChange={setSelectedFeaturesIds}
            placeholder="Add features"
          />
        </div>
        <div>
          <AddButton onClick={() => setShowAddTarifModal(true)} />
          <Box
            sx={{ height: 100 * (addsession.tarifs.length + 1), width: "100%" }}
          >
            <DataGrid rows={addsession.tarifs} columns={columns} />
          </Box>
        </div>

        {/* <TrainingStepper/> */}
        <TarifSection selectedLabels={selectedLabels} />
        <SaveButton variant="primary" mt={20} onClick={submitsession} />
      </div>
      <Modal
        toggleShow={() => setShowAddTarifModal(false)}
        basicModal={showAddTarifModal}
        setBasicModal={setShowAddTarifModal}
        normal={true}
        title="Add new gain"
        noButtons={true}
        body={
          <form
            onSubmit={() => {
              let auxTarif = { ...tarif, id: addsession.tarifs.length };
              setAddsession((Addsession) => ({
                ...Addsession,
                tarifs: [...addsession.tarifs, auxTarif],
              }));
              setTarif(null);
              setShowAddTarifModal(false);
            }}
            className="d-flex justify-content-center align-items-center "
            style={{ marginRight: "50px" }}
          >
            <StyledInput
              value={tarif?.title || ""}
              label="Title"
              required
              onChange={(e) => {
                setTarif((Tarif) => ({ ...Tarif, title: e.target.value }));
              }}
            />
            <StyledInput
              value={tarif?.price || 0}
              label="Price"
              type="number"
              required
              onChange={(e) => {
                setTarif((Tarif) => ({ ...Tarif, price: e.target.value }));
              }}
            />
            <>
              <CloseButton onClick={()=>setShowAddTarifModal(false)} type={"button"} />
              <SaveButton
                onSubmit={(e) => {
                  e.preventDefault()
                  let auxTarif = { ...tarif, id: addsession.tarifs.length };
                  setAddsession((Addsession) => ({
                    ...Addsession,
                    tarifs: [...addsession.tarifs, auxTarif],
                  }));
                  setTarif(null);
                  setShowAddTarifModal(false);
                }}
                type={ "submit" }
              />
            </>
          </form>
        }
      />
    </div>
  );
};

export default Addtarif;
