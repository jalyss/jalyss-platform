import React, { useEffect, useState } from "react";
import "../../../assets/styles/signup.css";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  editUser,
  fetchUser,
  fetchUsers,
  removeUser,
} from "../../../store/user";
import { useParams } from "react-router-dom";
import CropEasy from "../../../components/CropEasy";

function EditUser() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { userId } = useParams();
  const [preview, setPreview] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [opp, setOpp] = useState(null);

  const userStore = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);

  useEffect(() => {
    if (userStore.user) setUser(userStore.user);
  }, [userStore.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((User) => ({ ...User, [name]: value }));
  };

  const submitEditProfile = async (event) => {
    if (!editMode) {
      event.preventDefault();
      setEditMode(true);
    } else {
      event.preventDefault();
      let aux = Object.assign({}, user);

      if (avatar !== null) {
        console.log("in if");
        const image = new FormData();
        image.append("file", avatar);
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          image
        );

        console.log("yraje3", response.data);
        aux.avatarId = response.data.id;
      }

      delete aux.avatar;
      dispatch(editUser(aux)).then((res) => {
        if (!res.error) {
          showSuccessToast("user has been updated");
          setEditMode(false);
        } else {
          showErrorToast(res.error.message);
        }
      });
    }
  };

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setOpp(file);
    setPreview(URL.createObjectURL(file));

    setOpenCrop(true);
    setAvatar(opp);
  };

  return !openCrop ? (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Profile User </h2>
      <form className="checkout-form" onSubmit={submitEditProfile}>
        <div className="d-flex flex-wrap justify-content-center">
          {/* <label id="image">{t('image')}</label> */}
          <div className="image-upload">
            <img src={preview ? preview : user?.avatar?.path} alt="taswira" />
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
                          value={user?.fullNameAr}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user?.fullNameAr}</span>
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
                          value={user?.fullNameEn}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user?.fullNameEn}</span>
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
                          value={user?.email}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user?.email}</span>
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
                          value={user?.tel}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user?.tel}</span>
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
                          value={user?.address}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user?.address}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("country")}
                    </TableCell>
                    {/* <TableCell align="right">
                        <input
                          type="tel"
                          class="form-control mt-2"
                          id="country"
                          name="countryId"
                          value={user?.countryId}
                          onChange={handleChange}
                        />
                    </TableCell> */}
                      {editMode ? (
                    <select  class="form-select mt-3" id="inputGroupSelect04" aria-label="Default select example">
                       <option selected>Choose...</option>
                        <option value="1">One</option>
                         <option value="2">Two</option>
                          <option value="3">Three</option>
                               </select>
                                  ) : (
                            <span>{user?.countryId}</span>
                              )}
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('city')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                     
                        // <input
                        //   required
                        //   type="text"
                        //   class="form-control mt-2"
                        //   id="cityId"
                        //   name="cityId"
                        //   value={user?.cityId}
                        //   onChange={handleChange}
                        // />
                        <select  class="form-select mt-3" id="inputGroupSelect04" aria-label="Default select example">
                        <option selected>Choose...</option>
                         <option value="1">One</option>
                          <option value="2">Two</option>
                           <option value="3">Three</option>
                                </select>
                        
                      ) : (
                        <span>{user?.cityId}</span>
                      )}
                    </TableCell>
                  </TableRow> 
                   <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('functionalArea')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        // <input
                        //   required
                        //   type="text"
                        //   class="form-control mt-2"
                        //   id="functionalArea"
                        //   name="functionalAreaId"
                        //   value={user?.functionalAreaId}
                        //   onChange={handleChange}
                        // />
                        <select  class="form-select mt-3" id="inputGroupSelect04" aria-label="Default select example">
                        <option selected>Choose...</option>
                         <option value="1">One</option>
                          <option value="2">Two</option>
                           <option value="3">Three</option>
                                </select>
                      ) : (
                        <span>{user?.functionalAreaId}</span>
                      )}
                    </TableCell>
                  </TableRow> 
                   <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('educationLevel')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          type="text"
                          class="form-control"
                          id="educationLevel"
                          name="educationLevelId"
                          value={user?.educationLevelId}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user?.educationLevelId}</span>
                      )}
                    </TableCell>
                  </TableRow> 
                   <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('jobTitle')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        // <input
                        // required
                        //   type="text"
                        //   class="form-control mt-2"
                        //   id="jobTitle"
                        //   name="jobTitleId"
                        //   value={user?.jobTitleId}
                        //   onChange={handleChange}
                        // />
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
                        <span>{user?.jobTitleId}</span>
                      )}
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
            onSubmit={submitEditProfile}
          >
            <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
          </button>
        </div>
      </form>
    </div>
  ) : (
    <CropEasy
      {...{ preview, setOpenCrop, setPreview, setOpp, setAvatar, avatar }}
    />
  );
}

export default EditUser;
