import React, { useEffect, useState } from "react";
import "../../../assets/styles/signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { editUser, fetchUser } from "../../../store/user";
import { useParams } from "react-router-dom";
import CropEasy from "../../../components/CropEasy";
import { fetchRoles } from "../../../store/role";
import { fetchBranches } from "../../../store/branche";
import axios from "axios";

function EditUser() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userStore = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const roles = useSelector((state) => state.role);
  const brancheStore = useSelector((state) => state.branche);
  const [opp, setOpp] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  console.log(selectedBranch, "selectedBranch");
  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchRoles());
    dispatch(fetchBranches());
  }, [dispatch, userId]);

  useEffect(() => {
    if (userStore.user) setUser(userStore.user);
  }, [userStore.user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const submitEditProfile = async (event) => {
    event.preventDefault();

    if (editMode) {
      let aux = { ...user };

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
      delete aux.avatar;
      delete aux.client;
      delete aux.employee;
      dispatch(editUser(aux)).then((res) => {
        if (!res.error) {
          showSuccessToast("User has been updated");
          setEditMode(false)
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

  const renderImageUpload = () => (
    <div className="image-upload">
      <img src={preview || user?.avatar?.path} alt="avatar" />
      {editMode && (
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      )}
      {preview && editMode && (
        <button
          type="button"
          className="delete-button"
          onClick={() => {
            setPreview(null);
            setAvatar(null);
          }}
        >
          X
        </button>
      )}
    </div>
  );

  const renderUserData = () => {
    const clientData = user?.isClient ? user?.client || {} : {};
    const employeeData = user?.isClient ? {} : user?.employee || {};

    return (
      <div className="d-flex justify-content-center w-100 m-3">
        <TableContainer className="w-100" component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="fw-bold" align="right">
                  {t("fullNameAr")}
                </TableCell>
                <TableCell align="right">
                  <span>{user?.fullNameAr || ""}</span>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="fw-bold" align="right">
                  {t("fullNameEn")}
                </TableCell>
                <TableCell align="right">
                  <span>{user?.fullNameEn || ""}</span>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="fw-bold" align="right">
                  {t("isClient")}
                </TableCell>
                <TableCell align="right">
                  {editMode ? (
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="isClient"
                      name="isClient"
                      checked={user?.isClient}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{user?.isClient ? "Yes" : "No"}</span>
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
                  <span>{user?.email || ""}</span>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="fw-bold" align="right">
                  {t("isActive")}
                </TableCell>
                <TableCell align="right">
                  <span>{user?.isActive ? "Yes" : "No"}</span>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="fw-bold" align="right">
                  {t("isCoach")}
                </TableCell>
                <TableCell align="right">
                  {editMode ? (
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="isCoach"
                      name="isCoach"
                      checked={user?.isCoach}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{user?.isCoach ? "Yes" : "No"}</span>
                  )}
                </TableCell>
              </TableRow>
              {user?.isClient ? (
                <React.Fragment>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      adress
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          className="form-control mt-2"
                          required
                          name="address"
                          id="address"
                          value={clientData?.address || ""}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{clientData?.address || ""}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("tel")}
                    </TableCell>
                    <TableCell align="right">
                      <span>{clientData?.tel || ""}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("accountBalance")}
                    </TableCell>
                    <TableCell align="right">
                      <span>{clientData?.accountBalance || ""}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      educationLevel
                    </TableCell>
                    <TableCell align="right">
                      <span>{clientData?.educationLevel || ""}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      functionalArea
                    </TableCell>
                    <TableCell align="right">
                      <span>{clientData?.functionalArea || ""}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      jobTitle
                    </TableCell>
                    <TableCell align="right">
                      <span>{clientData?.jobTitle || ""}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      country
                    </TableCell>
                    <TableCell align="right">
                      <span>{clientData?.country || ""}</span>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("isAdmin")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="isAdmin"
                          name="isAdmin"
                          checked={employeeData?.isAdmin}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{employeeData?.isAdmin ? "Yes" : "No"}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("branch")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <select
                          className="form-control mt-2"
                          name="branch"
                          id="branch"
                          value={selectedBranch}
                          onChange={(e) => setSelectedBranch(e.target.value)}
                        >
                          <option value="">Select a branch</option>
                          {brancheStore?.branches?.items.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                              {branch.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{employeeData?.branch?.name || ""}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      branch location
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          className="form-control mt-2"
                          name="branch"
                          id="branch"
                          value={employeeData?.branch?.address || ""}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{employeeData?.branch?.address || ""}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("role")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <select
                          className="form-control mt-2"
                          name="role"
                          id="role"
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                        >
                          <option value="">Select a role</option>
                          {roles?.roles?.items.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.nameEn}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{employeeData?.role?.nameEn || ""}</span>
                      )}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  return !openCrop ? (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Profile User</h2>

      <form className="checkout-form" onSubmit={submitEditProfile}>
        <div className="d-flex flex-wrap justify-content-center">
          {renderImageUpload()}
          {renderUserData()}
        </div>

        <div className="w-100 d-flex justify-content-center mt-3">
          <button type="submit" className="confirm-button">
            <span className="label-btn">
              {editMode ? "Save Changes" : "Edit Profile"}
            </span>
          </button>
        </div>
      </form>
    </div>
  ) : (
    <CropEasy {...{ preview, setOpenCrop, setPreview, setAvatar, avatar }} />
  );
}

export default EditUser;
