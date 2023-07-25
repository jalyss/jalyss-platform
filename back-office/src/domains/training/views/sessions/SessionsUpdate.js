import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { editsession, fetchOnesession } from "../../../../store/sessions";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { fetchCategories } from "../../../../store/category";
import { useNavigate } from "react-router-dom";
import CropEasy from "../../../../components/CropEasy";
import axios from "axios";
import moment from "moment";
const { RangePicker } = DatePicker;

const SessionsUpdate = () => {
  const sessions = useSelector((state) => state.sessions.session);
  const categoriesStore = useSelector((state) => state.category);
  const { categories } = categoriesStore;
  const [categoryId, setCategoryId] = useState("");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [session, setSession] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [opp, setOpp] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);
  const { sessionsId } = useParams();

  useEffect(() => {
    dispatch(fetchOnesession(sessionsId));
  }, [sessionsId]);
  // console.log("one session",sessions);
  useEffect(() => {
    setTitle(sessions?.title);
    setDescription(sessions?.description);
    setEndDate(sessions?.endDate);
    setStartDate(sessions?.startDate);
    setCategoryId(sessions?.category?.nameEn);
    setStartDate(moment(sessions?.startDate));
    setEndDate(moment(sessions?.endDate));
    //  console.log("session",session);
  }, [sessions]);
  console.log("s", startDate);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submitEditsession = async (event) => {
    event.preventDefault();
    if (!editMode) {
      setEditMode(true);
    } else {
      let body = {
        title,
        description,
        startDate,
        endDate,
        categoryId,
      };
      event.preventDefault();
      if (avatar !== null) {
        console.log("in if");
        const image = new FormData();
        image.append("file", avatar);
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          image
        );
        body.coverId = response.data.id;
      }

      console.log("bodyyyyy", body);
      dispatch(editsession({ id: sessionsId, body })).then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("session has been updated");
          navigate(-1);
        }
      });
      setEditMode(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setOpp(file);
    setPreview(URL.createObjectURL(file));

    setOpenCrop(true);
    setAvatar(opp);
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  function onChange(dates) {
    if (Array.isArray(dates) && dates.length === 2) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  }

  return !openCrop ? (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Update Session</h2>
      <form className="checkout-form" onSubmit={submitEditsession}>
        <div className="d-flex flex-wrap justify-content-center">
          <div class="">
            <div>
              <img
                src={preview ? preview : sessions?.cover?.path}
                alt="cover"
                className="rounded"
                // ref={imageRef}
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
          </div>
          {preview && (
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

          <div className="d-flex justify-content-center w-100 m-3">
            <TableContainer className="" component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" >
                      {t("title")}
                    </TableCell>
                    <TableCell align="right">
                      <input
                        id="title"
                        value={title}
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                    style={{ border: "1px solid #bfbab7", width: 290 }}

                      />
                    </TableCell>
                    <TableCell className="fw-bold" >
                      {t(" description")}
                    </TableCell>
                    <TableCell align="right">
                      <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className="form-control"
                    style={{ border: "1px solid #bfbab7", width: 290 }}

                      />
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
                        defaultPickerValue={[startDate, endDate]}
                      />
                    </TableCell>
                    <TableCell className="fw-bold">Category:</TableCell>
                    <TableCell>
                      <select
                        value={categoryId}
                        className="form-select "
                        aria-label="Default select example"
                        onChange={(e) => {
                          setCategoryId(e.target.value);
                        }}
                        required
                        style={{
                          border: "1px solid #bfbab7",
                          width: 290,
                          height: 42,
                        }}

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
                    </TableCell>
                  </TableRow>
                 
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onClick={submitEditsession}
          >
            <span className="label-btn">Submit</span>
          </button>
        </div>
      </form>
    </div>
  ) : (
    <CropEasy
      {...{ preview, setOpenCrop, setPreview, setOpp, setAvatar, avatar }}
    />
  );
};

export default SessionsUpdate;
