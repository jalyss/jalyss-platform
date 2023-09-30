import React, { useEffect, useState } from "react";

import background from "../../../assets/images/background-profile.png";
import userImage from "../../../assets/images/user.png";
import css from "../../../assets/styles/clientProfile.css";

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
const OneClient = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const clientStore = useSelector((state) => state.client);
  const [client, setClient] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    dispatch(fetchClient(clientId));
  }, [dispatch, clientId]);

  useEffect(() => {
    if (clientStore.client) setClient(clientStore.client);
  }, [clientStore.client]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          image,
          {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
              setTimeout(() => {
                setUploadProgress(0);
              }, 2000);
            },
          }
        );
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
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Client Profile</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap justify-content-center">
          <div className="image-upload">
            <img src={preview ? preview : client?.avatar?.path} alt="taswira" />
            <div>
              {uploadProgress > 0 && (
                <progress
                  value={uploadProgress}
                  max="100"
                  style={{ width: "300px" }}
                />
              )}
            </div>
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

          <div className="d-flex justify-content-center w-100 m-3">
            <TableContainer className="w-100" component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("nameAr")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          class="form-control mt-2"
                          required
                          name="fullNameAr"
                          id="fullNameAr"
                          value={client?.fullNameAr}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{client?.fullNameAr}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("nameEn")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          class="form-control mt-2"
                          name="fullNameEn"
                          id="fullNameEn"
                          value={client?.fullNameEn}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{client?.fullNameEn}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("email")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          class="form-control mt-2"
                          type="email"
                          id="email"
                          name="email"
                          value={client?.email}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{client?.email}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("phone")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          type="tel"
                          class="form-control mt-2"
                          id="tel"
                          name="tel"
                          value={client?.tel}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{client?.tel}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      العنوان
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          class="form-control mt-2"
                          id="address"
                          name="address"
                          value={client?.address}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{client?.address}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("country")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <select
                          class="form-select mt-3"
                          id="inputGroupSelect04"
                          aria-label="Default select example"
                        >
                          <option selected>Choose...</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      ) : (
                        <span>{client?.country?.nameAr}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("city")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <select
                          class="form-select mt-3"
                          id="inputGroupSelect04"
                          aria-label="Default select example"
                        >
                          <option selected>Choose...</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      ) : (
                        <span>{client?.cityId}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("functionalArea")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <select
                          class="form-select mt-3"
                          id="inputGroupSelect04"
                          aria-label="Default select example"
                        >
                          <option selected>Choose...</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      ) : (
                        <span>{client?.functionalAreaId}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("educationLevel")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <select
                          class="form-select mt-3"
                          id="inputGroupSelect04"
                          aria-label="Default select example"
                        >
                          <option selected>Choose...</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      ) : (
                        <span>{client?.educationLevelId}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("jobTitle")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <select
                          class="form-select mt-3"
                          id="inputGroupSelect04"
                          aria-label="Default select example"
                        >
                          <option selected>Choose...</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      ) : (
                        <span>{client?.jobTitleId}</span>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

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
    </div>
  ) : (
    <CropEasy {...{ preview, setOpenCrop, setPreview, setAvatar, avatar }} />
  );
};
export default OneClient;
