import React, { useEffect, useState } from "react";
import { Card, Button, Form, Table } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateNeswSession,
  fetchsessions,
  fetchOnesession,
} from "../../../../store/sessions";
import { Title } from "@mui/icons-material";
import AutoCompleteFilter from "../../../../components/Commun/AutoCompleteFilter";
import { fetchCategories } from "../../../../store/category";
import AddButton from "../../../../components/buttons/AddButton";
import { useNavigate, useParams } from "react-router-dom";
import SaveButton from "../../../../components/Commun/buttons/SaveButton";
import { useRef } from "react";
import Modal from "../../../../components/Commun/Modal";
import Select from "react-select";
import { MDBModalFooter } from "mdb-react-ui-kit";
import axios from "axios";
import { fetchFeatures } from "../../../../store/tarifSession";
import TrainingStepper from "../../../../components/TrainingStepper";
import TarifSection from "../../../../components/TarifSection";
import { DataGrid } from "@mui/x-data-grid";
import StyledInput from "../../../../components/Commun/inputs/StyledInput";
import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CloseButton from "../../../../components/Commun/buttons/CloseButton";
import TrainingPricing from "../../components/TrainingPricing";
import { fetchGains, fetchPrerequires } from "../../../../store/gain";
import { fetchsessionstypes } from "../../../../store/sessiontypes";

import { DatePicker } from "antd";
import DisplayLottie from "./../../../../components/DisplayLottie";
import pricing1 from "../../../../constants/pricing1.json";
import moment from "moment";

const { RangePicker } = DatePicker;

const Addtarif = () => {
  const navigate = useNavigate();
  const { sessionsId } = useParams();
  const dispatch = useDispatch();
  const sessionStore = useSelector((state) => state.sessions);
  const { sessions, session } = sessionStore;
  const categoriesStore = useSelector((state) => state.category);
  const featuresStore = useSelector((state) => state.tarifSession.features);
  const gainsStore = useSelector((state) => state.gain);
  const { gains } = gainsStore;
  const prereqStore = useSelector((state) => state.gain);
  const { prerequires } = prereqStore;
  const typesStore = useSelector((state) => state.sessiontypes);
  const { types } = typesStore;
  const { categories } = categoriesStore;

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedGains, setSelectedGains] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrerequire, setSelectedPrerequire] = useState([]);
  const [cover, setCover] = useState(null);
  const [addSession, setAddSession] = useState({ tarifs: [] });
  const [tarif, setTarif] = useState(null);
  const [index, setIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [previousSessionId, setPreviousSessionId] = useState(null);

  const [showAddTarifModal, setShowAddTarifModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const fileInputRef = useRef(null); // Reference to the file input element

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const take = sessions?.items?.count || 10;
  const skip = 0;
  useEffect(() => {
    dispatch(fetchOnesession(sessionsId));
    dispatch(fetchCategories());
    dispatch(fetchFeatures());
    dispatch(fetchGains());
    dispatch(fetchPrerequires());
    dispatch(fetchsessionstypes());
    dispatch(fetchsessions({ take, skip }));
  }, [dispatch]);

  useEffect(() => {
    setAddSession({ ...addSession, ...session });
    setPreviousSessionId(session?.previousSessionId);
    setCategoryId(session?.categoryId);

    setSelectedFeatures(
      session?.SessionHasFeatures?.map((elem) => elem.feature)
    );
    setSelectedGains(
      session?.SessionHasWhatYouWillLearn?.map((elem) => elem.WhatYouWillLearn)
    );
    setSelectedPrerequire(
      session?.sessionHasPrerequire?.map((elem) => elem.prerequire)
    );
    setSelectedTypes(session?.sessionType?.map((elem) => elem.sessiontype));
    setStartDate(session?.startDate);
    setEndDate(session?.endDate);
  }, [session]);
  useEffect(() => {
    setAddSession({ ...addSession, tarifs: [] });
  }, [selectedFeatures]);

  const handleAddSessionChange = (e) => {
    const { name, value } = e.target;

    setAddSession((AddSession) => ({
      ...AddSession,
      [name]: value,
    }));
  };
  const submitTarif = (e) => {
    e.preventDefault();

    let auxTarifs = [...addSession.tarifs];
    if (isEdit) {
      auxTarifs[index] = tarif;
      setIsEdit(false);
    } else {
      auxTarifs = [...auxTarifs, tarif];
    }
    auxTarifs = auxTarifs.sort((a, b) => {
      return a.price - b.price;
    });
    setAddSession((AddSession) => ({
      ...AddSession,
      tarifs: auxTarifs,
    }));

    setTarif(null);
    setIndex(null);
    setShowAddTarifModal(false);
  };
  const submitsession = async (event) => {
    event.preventDefault();

    if (selectedFeatures.length === 0) {
      showErrorToast("Pick freatures");

      return;
    }
    if (addSession.tarifs.length === 0) {
      showErrorToast("create one tarif as minimun");
      return;
    }
    let aux = Object.assign({}, addSession);
    aux.categoryId = categoryId;
    aux.startDate = startDate;
    aux.endDate = endDate;
    if (cover !== null) {
      const image = new FormData();
      image.append("file", cover);
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/upload`,
        image
      );
      aux.coverId = response.data.id;
    }

    aux.SessionHasFeaturesIds = selectedFeatures.map((e) => e.id);
    aux.sessionHasPrerequiresIds = selectedPrerequire.map((e) => e.id);
    aux.sessionHasGainsIds = selectedGains.map((e) => e.id);
    aux.sessionTypesIds = selectedTypes.map((e) => e.id);
    aux.previousSessionId = previousSessionId;
    console.log(aux);
    dispatch(CreateNeswSession(aux)).then((res) => {
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

  function onChange(val) {
    const [start, end] = val;
    setStartDate(start);
    setEndDate(end);
  }
  console.log(selectedFeatures);

  return (
    <div>
      <form onSubmit={submitsession} className="mx-5" >
        <h3 className="muted d-flex justify-content-center align-items-center my-3">
          {" "}
          Create Session{" "}
        </h3>

        <div className="d-flex justify-content-center align-items-center my-3">
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
              className="rounded "
            />
          )}
        </div>
        <div className="d-flex justify-content-center w-100 m-3">
          <TableContainer className="" component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Cover:</TableCell>
                  <TableCell>
                    <StyledInput
                      type="file"
                      className="form-control visually-hidden"
                      id="customFile"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />

                    {!cover && (
                      <input
                        type="file"
                        className="form-control "
                        onChange={handleImageChange}
                        style={{ border: "1px solid #bfbab7", width: 290 }}
                      />
                    )}
                  </TableCell>
                  <TableCell className="fw-bold">Title:</TableCell>
                  <TableCell>
                    <input
                      required
                      type="text"
                      placeholder="Enter title"
                      name="title"
                      value={addSession?.title}
                      onChange={handleAddSessionChange}
                      style={{ border: "1px solid #bfbab7", width: 290 }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Description:</TableCell>
                  <TableCell>
                    <input
                      required
                      type="text"
                      value={addSession?.description}
                      placeholder="Enter description"
                      name="description"
                      onChange={handleAddSessionChange}
                      style={{ border: "1px solid #bfbab7", width: 290 }}
                    />
                  </TableCell>
                  <TableCell className="fw-bold">Category:</TableCell>
                  <TableCell>
                    <select
                      value={categoryId}
                      class="form-select "
                      aria-label="Default select example"
                      onChange={handleChange}
                      required
                      style={{
                        border: "1px solid #bfbab7",
                        width: 290,
                        height: 42,
                      }}
                    >
                      <option value="" disabled selected>
                        Choose your Session category
                      </option>
                      {categories.items.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.nameEn}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Start-End-Date:</TableCell>
                  {/* <TableCell>
                  <input
                    required
                    type="date"
                    value={addSession?.startDate}
                    name="startDate"
                    placeholder="startDate"
                    onChange={handleAddSessionChange}
                  />
                </TableCell>
                <TableCell className="fw-bold">End-Date:</TableCell>
                <TableCell>
                  <input
                    required
                    type="date"
                    name="endDate"
                    value={addSession?.endDate}
                    placeholder="endDate"
                    onChange={handleAddSessionChange}
                  />
                </TableCell> */}
                  <TableCell>
                    <RangePicker
                      format={"DD/MM/YYYY"}
                      
                      // defaultValue={
                      //   [ moment('2018-01-11T12:32:26.551Z'), 
                      //     moment('2018-02-19T12:32:26.551Z') ]
                      // }
                      onChange={onChange}
                      style={{ height: "40px" }}
                      className=""
                    />
                  </TableCell>
                  <TableCell className="fw-bold">Previous Session:</TableCell>
                  <TableCell>
                    <select
                      value={previousSessionId}
                      class="form-select "
                      aria-label="Default select example"
                      onChange={(e) => {
                        setPreviousSessionId(e.target.value);
                      }}
                      required
                      style={{
                        border: "1px solid #bfbab7",
                        width: 290,
                        height: 42,
                      }}
                    >
                      <option value="" disabled selected>
                        Choose your previous Session
                      </option>
                      {sessions?.items.map((session, index) => (
                        <option key={index} value={session.id}>
                          {session.title}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Gains:</TableCell>
                  <TableCell>
                    <div className="d-flex">
                      <AutoCompleteFilter
                        required
                        value={selectedGains}
                        data={gains?.items}
                        labelOptionName="content"
                        label="Add gains"
                        onChange={setSelectedGains}
                        placeholder="Add Your session's gain"
                        width={280}
                      />
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div>
                      {!selectedGains?.length && (
                        <p style={{ color: "red", textAlign: "start" }}>
                          You must select gains for the session !{" "}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="fw-bold">Prerequires:</TableCell>
                  <TableCell>
                    <div className="d-flex">
                      <AutoCompleteFilter
                        required
                        value={selectedPrerequire}
                        data={prerequires?.items}
                        labelOptionName="content"
                        label="Add prerequires"
                        onChange={setSelectedPrerequire}
                        placeholder="Add Your session's prerequire"
                        width={280}
                      />
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div>
                      {!selectedPrerequire?.length && (
                        <p style={{ color: "red", textAlign: "start" }}>
                          You must select prerequire for the session !{" "}
                        </p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Features:</TableCell>
                  <TableCell>
                    <div className="d-flex">
                      <AutoCompleteFilter
                        required
                        data={featuresStore?.items}
                        value={selectedFeatures}
                        labelOptionName="label"
                        label="Add features"
                        onChange={setSelectedFeatures}
                        placeholder="Add features"
                        width={280}
                      />
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div>
                      {!selectedFeatures?.length && (
                        <p style={{ color: "red", textAlign: "start" }}>
                          You must select features for the session !{" "}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="fw-bold">Types:</TableCell>
                  <TableCell>
                    {" "}
                    <div className="d-flex">
                      <AutoCompleteFilter
                        required
                        value={selectedTypes}
                        data={types?.items}
                        labelOptionName="title"
                        label="Add types"
                        onChange={setSelectedTypes}
                        placeholder="Select your session types !"
                        width={280}
                      />
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div>
                      {!selectedTypes?.length && (
                        <p style={{ color: "red", textAlign: "start" }}>
                          You must select types for the session !{" "}
                        </p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="p-5">
          <div className="d-flex justify-content-center">
            <AddButton
              disabled={selectedFeatures?.length ? false : true}
              onClick={() => {
                if (selectedFeatures?.length === 0) {
                  // Show a message to the user when features are not selected
                  setErrorMessage(true);
                } else {
                  setShowAddTarifModal(true);
                  setTarif({
                    ...tarif,
                    features: selectedFeatures.map((elem) => ({
                      ...elem,
                      isAvailable: false,
                    })),
                  });
                }
              }}
              content="Add Tarif"
            />
            {/* <CloseButton  modifTitle={"Add tarif"}
             disabled={selectedFeatures.length ? false : true}
             onClick={() => {
               setShowAddTarifModal(true);
               setTarif({
                 ...tarif,
                 features: selectedFeatures.map((elem) => ({
                   ...elem,
                   isAvailable: false,
                 })),
               });
             }}/> */}
            <DisplayLottie
              animationData={pricing1}
              style={{ width: "120px", height: "80px" }}
            />
            {errorMessage && (
              <div style={{ color: "black" }}> Nooooooooooooooooooo</div>
            )}
          </div>
          <div className="mt-4">
            <TrainingPricing
              session={addSession}
              setSession={setAddSession}
              fn={(t, i) => {
                setTarif(t);
                setIndex(i);
                setIsEdit(true);
                setShowAddTarifModal(true);
              }}
              header={true}
            />
          </div>

          <div className="text-center">
            <SaveButton
              variant="primary"
              mt={20}
              onSubmit={submitsession}
              type="submit"
            />
          </div>
        </div>
      </form>
      <Modal
        toggleShow={() => setShowAddTarifModal(false)}
        basicModal={showAddTarifModal}
        setBasicModal={setShowAddTarifModal}
        normal={true}
        title="Add new Tarif"
        noButtons={true}
        noFooter={true}
        body={
          <form
            onSubmit={submitTarif}
            // className="d-flex justify-content-center align-items-center "
            // style={{ marginRight: "50px" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="gap-3 d-flex ">
              <StyledInput
                value={tarif?.title || ""}
                label="Title"
                required
                onChange={(e) => {
                  setTarif((Tarif) => ({ ...Tarif, title: e.target.value }));
                }}
              />
              <StyledInput
                value={tarif?.price || ""}
                label="Price"
                type="number"
                required
                onChange={(e) => {
                  setTarif((Tarif) => ({ ...Tarif, price: +e.target.value }));
                }}
              />
            </div>
            <div>
              <TarifSection setTarif={setTarif} tarif={tarif} />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <CloseButton
                onClick={() => setShowAddTarifModal(false)}
                type={"button"}
              />
              <SaveButton onSubmit={submitTarif} type={"submit"} />
            </div>
          </form>
        }
      />
    </div>
  );
};

export default Addtarif;
