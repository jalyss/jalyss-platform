import React, { useEffect, useState } from "react";
import { Card, Button, Form, Table } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateNeswSession, fetchsessions } from "../../../../store/sessions";
import { Title } from "@mui/icons-material";
import AutoCompleteFilter from "../../../../components/Commun/AutoCompleteFilter";
import { fetchCategories } from "../../../../store/category";
import AddButton from "../../../../components/buttons/AddButton";
import { useNavigate } from "react-router-dom";
import SaveButton from "../../../../components/Commun/buttons/SaveButton";
import { useRef } from "react";
import Modal from "../../../../components/Commun/Modal";
import Select from "react-select";
import { MDBModalFooter } from "mdb-react-ui-kit";
import axios from "axios";
import { fetchFeatures } from "../../../../store/tarifSession";
import TarifSection from "../../../../components/TarifSection";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

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
import AddLecture from "../../components/AddLecture";
import { fetchcours } from "../../../../store/courses";
import moment from "moment";
import uploadImage from "../../../../assets/images/uploadImage.png";
import UpdateButton from "../../../../components/Commun/buttons/UpdateButton";

const { RangePicker } = DatePicker;

const AddSession = () => {
  const dispatch = useDispatch();
  const sessionStore = useSelector((state) => state.sessions);
  const { sessions } = sessionStore;
  const categoriesStore = useSelector((state) => state.category);
  const { categories } = categoriesStore;
  const featuresStore = useSelector((state) => state.tarifSession.features);
  const gainsStore = useSelector((state) => state.gain);
  const { gains } = gainsStore;
  const prereqStore = useSelector((state) => state.gain);
  const { prerequires } = prereqStore;
  const typesStore = useSelector((state) => state.sessiontypes);
  const { types } = typesStore;
  const lecturesStore = useSelector((state) => state.courses);
  const { cours } = lecturesStore;
  const navigate = useNavigate();

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedGains, setSelectedGains] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrerequire, setSelectedPrerequire] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [cover, setCover] = useState(null);
  const [addSession, setAddSession] = useState({ tarifs: [], lectures: [] });
  const [tarif, setTarif] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [rows, setRows] = useState([]);
  const [idOfDelete, setIdOfDelete] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [index, setIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [previousSessionId, setPreviousSessionId] = useState(null);
  const [showAddTarifModal, setShowAddTarifModal] = useState(false);
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const fileInputRef = useRef(null); // Reference to the file input element
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [titleOfDelete, setTitleOfDelete] = useState(null);
  const take = sessions?.count
  const skip = 0;
 
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFeatures());
    dispatch(fetchGains());
    dispatch(fetchPrerequires());
    dispatch(fetchsessionstypes());
    dispatch(fetchcours());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchsessions({ take, skip }));
  }, [dispatch, take]);

  useEffect(() => {
    setAddSession({ ...addSession, tarifs: [] });
  }, [selectedFeatures]);

  useEffect(() => {
    if (deleteModal && idOfDelete) {
      const row = rows.find((row) => row.id === idOfDelete);
      if (row) {
        setTitleOfDelete(row.title);
      }
    }
  }, [idOfDelete, rows]);

  const handleAddSessionChange = (e) => {
    const { name, value } = e.target;

    setAddSession((AddSession) => ({
      ...AddSession,
      [name]: value,
    }));
  };
  const submitLecture = (e) => {
    e.preventDefault();

    let auxLectures = [...addSession.lectures, lecture];

    setAddSession((AddSession) => ({
      ...AddSession,
      lectures: auxLectures,
    }));

    setLecture(null);
    // setIndex(null);
    setShowAddLectureModal(false);
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

  const handleDeleteLecture = () => {
    const updatedLectures = addSession.lectures.filter(
      (lecture) => lecture.lectureId !== idOfDelete
    );

    setAddSession((AddSession) => ({
      ...AddSession,
      lectures: updatedLectures,
    }));

    setDeleteModal(false);
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
    if (addSession.lectures.length === 0) {
      showErrorToast("create one lecture as minimun");
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
    document.getElementById("coverUpload").click(); // Programmatically trigger the file input click event
  };

  function onChange(val) {
    const [start, end] = val;
    setStartDate(start);
    setEndDate(end);
  }
  console.log("addSession", addSession);

  useEffect(() => {
    if (addSession?.lectures.length) {
      let aux = addSession?.lectures?.map((e) => {
        const formattedStartAt = moment(e.startAt).format("YYYY-MM-DD");
        const formattedEndAt = moment(e.endAt).format("YYYY-MM-DD");
        return {
          ...e,
          title: e.title,
          startAt: formattedStartAt,
          endAt: formattedEndAt,
        };
      });
      setRows(aux);
    }
  }, [addSession?.lectures]);
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 250,
      editable: false,
    },
    {
      field: "startAt",
      headerName: "StartAt",
      width: 120,
      sortable: false,
    },
    {
      field: "endAt",
      headerName: "EndAt",
      width: 120,
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 330,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            color="error"
            onClick={() => {
              setDeleteModal(!deleteModal);
              setIdOfDelete(id);
            }}
          />,
        ];
      },
    },
  ];
  const generateRowId = (row) => {
    return row.lectureId;
  };

  return (
    <div>
      <input
        type="file"
        className="form-control visually-hidden"
        id="coverUpload"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      <form onSubmit={submitsession} className="mx-5">
        <h3 className="muted d-flex justify-content-center align-items-center my-3">
          {" "}
          Create Session{" "}
        </h3>

        <div className="d-flex justify-content-center align-items-center my-3">
          {cover ? (
            <div
              style={{
                width: "600px",
                height: "300px",
                marginTop: "10px",
                position: "relative",
                border: "1px solid black",
              }}
            >
              <img
                src={cover ? URL.createObjectURL(cover) : null}
                style={{
                  width: "600px",
                  height: 300,
                  objectFit: "contain",
                }}
                alt="Cover Image"
                className="rounded "
              />
              <div
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                <UpdateButton
                  type="button"
                  onClick={handleImageClick}
                  content="Upload New Cover"
                ></UpdateButton>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "600px",
                height: "300px",
                marginTop: "10px",
                position: "relative",
                border: "1px solid black",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            >
              <img
                alt="add cover"
                style={{
                  width: "600px",
                  height: 300,
                  objectFit: "contain",
                }}
                src={uploadImage}
                className="rounded "
              />
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center w-100 m-3">
          <TableContainer className="" component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">TitleEn:</TableCell>
                  <TableCell>
                  <input
                      required
                      type="text"
                      placeholder="Enter titleEn"
                      name="titleEn"
                      value={addSession?.TitleEn}
                      onChange={handleAddSessionChange}
                      style={{ border: "1px solid #bfbab7", width: 290 }}
                    />
                    {/* {!cover && (
                      <input
                        type="file"
                        className="form-control "
                        onChange={handleImageChange}
                        style={{ border: "1px solid #bfbab7", width: 290 }}
                      />
                    )} */}
                  </TableCell>
                  <TableCell className="fw-bold">TitleAr:</TableCell>
                  <TableCell>
                    <input
                      required
                      type="text"
                      placeholder="Enter titleAr"
                      name="titleAr"
                      value={addSession?.TitleAr}
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

                  <TableCell>
                    <RangePicker
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
                      style={{
                        border: "1px solid #bfbab7",
                        width: 290,
                        height: 42,
                      }}
                    >
                      <option value="" disabled selected>
                        Choose your previous Session
                      </option>
                      {sessions?.items?.map((session, index) => (
                        <option key={index} value={session.id}>
                          {session.titleEn}
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
                        value={selectedGains}
                        required
                        data={gains?.items}
                        labelOptionName="contentEn"
                        label="Add gains"
                        onChange={setSelectedGains}
                        placeholder="Add Your session's gain"
                        width={280}
                      />
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div>
                      {!selectedGains.length && (
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
                        labelOptionName="contentEn"
                        label="Add prerequires"
                        onChange={setSelectedPrerequire}
                        placeholder="Add Your session's prerequire"
                        width={280}
                      />
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div>
                      {!selectedPrerequire.length && (
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
                        value={selectedFeatures}
                        required
                        data={featuresStore?.items}
                        labelOptionName="labelEn"
                        label="Add features"
                        onChange={setSelectedFeatures}
                        placeholder="Add features"
                        width={280}
                      />
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div>
                      {!selectedFeatures.length && (
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
                        labelOptionName="titleEn"
                        label="Add types"
                        onChange={setSelectedTypes}
                        placeholder="Select your session types !"
                        width={280}
                      />
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div>
                      {!selectedTypes.length && (
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
        <div className="">
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex flex-column justify-content-center align-items-center ">
              <AddButton
                onClick={() => {
                  setShowAddLectureModal(true);
                }}
                content="Add Lecture"
              />
              {addSession?.lectures?.length > 0 && (
                <Box sx={{ height: 300, width: "99%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={generateRowId}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                  />
                </Box>
              )}
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center mt-2">
              <div className="d-flex">
                <AddButton
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
                  }}
                  content="Add Tarif"
                />
                <DisplayLottie
                  animationData={pricing1}
                  style={{ width: "30px", height: "30px" }}
                />
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
            </div>
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
      <Modal
        toggleShow={() => setShowAddLectureModal(false)}
        basicModal={showAddLectureModal}
        setBasicModal={setShowAddLectureModal}
        normal={true}
        title="Add new Lecture"
        noButtons={true}
        noFooter={true}
        body={
          <form
            onSubmit={submitLecture}
            // className="d-flex justify-content-center align-items-center "
            // style={{ marginRight: "50px" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div>
              <AddLecture
                setLecture={setLecture}
                session={addSession}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <CloseButton
                onClick={() => setShowAddLectureModal(false)}
                type={"button"}
              />
              <SaveButton onSubmit={submitLecture} type={"submit"} />
            </div>
          </form>
        }
      />

      <Modal
        basicModal={deleteModal}
        setBasicModal={setDeleteModal}
        toggleShow={() => setDeleteModal(!deleteModal)}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            {`Are you sure you want to delete `}
            <span style={{ color: "red", margin: "10px" }}>
              {titleOfDelete}
            </span>
          </div>
        }
        confirm={handleDeleteLecture}
      />
    </div>
  );
};

export default AddSession;