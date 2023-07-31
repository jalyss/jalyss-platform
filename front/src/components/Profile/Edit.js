import React, { useEffect, useState } from "react";
import "../../assets/styles/profile.css";
import auth, { authUpdate, register } from "../../store/auth";
import "../../assets/styles/signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { fetchCountries } from "../../store/country";
import { fetchCities } from "../../store/city";
import { fetchFunctionalAreas } from "../../store/functionalArea";
import { fetchJobTitles } from "../../store/jobTitle";
import { fetchEducationLevels } from "../../store/educationLevel";
import { updateUser } from "../../store/user";

const Edit = () => {
  const countryStore = useSelector((state) => state.country);
  const { countries } = countryStore;
  const cityStore = useSelector((state) => state.city);
  const { cities } = cityStore;
  const functionalAreasStore = useSelector((state) => state.functionalArea);
  const { functionalAreas } = functionalAreasStore;
  const educationLevelsStore = useSelector((state) => state.educationLevel);
  const { educationLevels } = educationLevelsStore;
  const jobTitleStore = useSelector((state) => state.jobTitle);
  const { jobTitles } = jobTitleStore;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);
  const blogStore = useSelector((state) => state.blog);
  const navigate = useNavigate();
  const me = useSelector((state) => state.me);

  const { blogs } = blogStore;

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [functionalAreaId, setFunctionalAreaId] = useState(null);

  useEffect(() => {
    if (authStore.me) {
      setUser(authStore.me);
    }
    dispatch(fetchCountries());
    dispatch(fetchFunctionalAreas());
    dispatch(fetchJobTitles());
    dispatch(fetchEducationLevels());
  }, [authStore.me, dispatch]);

  useEffect(() => {
    dispatch(fetchCities(user?.client?.country?.id));
  }, [user?.client?.country?.id]);

  const handleChange = (e, key, isSelect, array) => {
    const { name, value } = e.target;
    if (key) {
      setUser((User) => ({
        ...User,
        [key]: {
          ...user[key],
          [name]: isSelect ? array.find((elem) => elem.id === value) : value,
        },
      }));
    } else {
      setUser((User) => ({ ...User, [name]: value }));
    }
  };

  // fama hajet m3ach mawjoudin fil user direct walou mawjoudin fil client ma3neha user.client
  // l back khadmou khayri
  // ena badel wala 3ana user w el user ynajem ykoun client w ynajem ykoun employee eyy fhmtek
  // hatta fil bach office fama hajet user.employee eyy kima lcoach bravo

  const submitEditProfile = async (event) => {
    event.preventDefault();
    if (!editMode) {
      setEditMode(true);
    } else {
      dispatch(authUpdate(user)).then((res) => {
        if (!res.error) {
          showSuccessToast(t("user.updated"));
          setEditMode(false);
        } else {
          showErrorToast(res.error.message);
        }
      });
    }
  };

  return (
    <form className="checkout-form" onSubmit={submitEditProfile}>
      <div className="d-flex flex-wrap">
        <div className="d-flex justify-content-center w-100 m-3">
          <TableContainer className="w-100" component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
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
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
                    {t("nameEn")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <input
                        class="form-control mt-2"
                        required
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
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
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
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
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
                        value={user?.client?.tel}
                        onChange={(e) => handleChange(e, "client")}
                      />
                    ) : (
                      <span>{user?.client?.tel}</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
                    {t("address")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <input
                        required
                        class="form-control mt-2"
                        id="address"
                        name="address"
                        value={user?.client?.address}
                        onChange={(e) => handleChange(e, "client")}
                      />
                    ) : (
                      <span>{user?.client?.address}</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
                    {t("country")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <select
                        value={user?.client?.country?.id}
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          handleChange(e, "client", true, countries.items)
                        }
                        name="country"
                      >
                        <option disabled selected>
                          Select your country
                        </option>
                        {countries?.items.map((country, index) => (
                          <option key={index} value={country.id}>
                            {country.nameEn}
                          </option>
                        ))}
                      </select>
                    ) : (
                      // <input
                      //   type="tel"
                      //   class="form-control mt-2"
                      //   id="country"
                      //   name="countryId"
                      //   value={user?.client?.country?.nameAr}
                      //   onChange={handleChange}
                      // />
                      <span>{user?.client?.country?.nameAr}</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
                    {t("city")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <select
                        value={user?.client?.city?.id}
                        name="city"
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          handleChange(e, "client", true, cities.items)
                        }
                      >
                        <option disabled selected>
                          Select your city
                        </option>
                        {cities?.items.map((city, index) => (
                          <option key={index} value={city.id}>
                            {city.nameEn}
                          </option>
                        ))}
                      </select>
                    ) : (
                      // <input
                      //   class="form-control mt-2"
                      //   id="city"
                      //   name="cityId"
                      //   value={user?.client?.city?.nameAr}
                      //   onChange={handleChange}
                      // />
                      <span>{user?.client?.city?.nameAr}</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
                    {t("functionalArea")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <select
                        value={user?.client?.functionalArea?.id}
                        name="functionalArea"
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          handleChange(e, "client", true, functionalAreas.items)
                        }
                      >
                        <option disabled selected>
                          Select your functionalArea
                        </option>
                        {functionalAreas?.items.map((functionalArea, index) => (
                          <option key={index} value={functionalArea.id}>
                            {functionalArea.nameEn}
                          </option>
                        ))}
                      </select>
                    ) : (
                      // <input
                      //   class="form-control mt-2"
                      //   id="functionalArea"
                      //   name="functionalAreaId"
                      //   value={user?.client?.functionalArea?.nameAr}
                      //   onChange={handleChange}
                      // />
                      <span>{user?.client?.functionalArea?.nameAr}</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
                    {t("educationLevel")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <select
                        value={user?.client?.educationLevel?.id}
                        name="educationLevel"
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          handleChange(e, "client", true, educationLevels.items)
                        }
                      >
                        <option disabled selected>
                          Select your educationLevel
                        </option>
                        {educationLevels?.items.map((educationLevel, index) => (
                          <option key={index} value={educationLevel.id}>
                            {educationLevel.nameEn}
                          </option>
                        ))}
                      </select>
                    ) : (
                      // <input
                      //   class="form-control"
                      //   id="educationLevel"
                      //   name="educationLevelId"
                      //   value={user?.client?.educationLevel?.nameAr}
                      //   onChange={handleChange}
                      // />
                      <span>{user?.client?.educationLevel?.nameAr} </span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="fw-bold" align="left">
                    {t("jobTitle")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <select
                        value={user?.client?.jobTitle?.id}
                        name="jobTitle"
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          handleChange(e, "client", true, jobTitles.items)
                        }
                      >
                        <option disabled selected>
                          Select your jobTitle
                        </option>
                        {jobTitles?.items.map((jobTitle, index) => (
                          <option key={index} value={jobTitle.id}>
                            {jobTitle.nameEn}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>{user?.client?.jobTitle?.nameAr}</span>
                    )}{" "}
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
  );
};

export default Edit;
