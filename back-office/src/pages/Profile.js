import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../assets/styles/profile.css";
import CropEasy from "../components/CropEasy";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { editEmployee, fetchEmployee } from "../store/employee";
import { fetchRoles } from "../store/role";
import { fetchMedias } from "../store/media";
import { fetchBranches } from "../store/branche";
import { Cancel } from "@mui/icons-material";
import { DialogActions, DialogContent } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";

function Profile() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const userStore = useSelector((state) => state.auth);
  const employeeStore = useSelector((state) => state.employee);
  const roleStore = useSelector((state) => state.role);
  const branchStore = useSelector((state) => state.branche);
  const mediaStore = useSelector((state) => state.media);

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [opp, setOpp] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchRoles());
    dispatch(fetchMedias());
    dispatch(fetchEmployee(userStore.meAdmin.id));
  }, []);

  useEffect(() => {
    if (employeeStore.employee) setUser(employeeStore.employee);
  }, [employeeStore.employee]);

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
          `${process.env.REACT_APP_SERVER_UPLOAD_ENDPOINT}/upload`,
          image
        );
        aux.avatarId = response.data.id;
      }
      delete aux.branch;
      delete aux.role;
      delete aux.avatar;
      delete aux.Media;
      dispatch(editEmployee(aux)).then((res) => {
        if (!res.error) {
          showSuccessToast(t("user.updated"));
          setEditMode(false);
        } else {
          console.log(res);
          showErrorToast(res.error.message);
        }
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      setOpenCrop(true);
      setAvatar(file);
    } else {
      setPreview(null);
      setAvatar(null);
    }
  };

  return !openCrop ? (
    <div className="container d-flex justify-content-center align-items-center">
      <div className=" col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 ">
        <div className="card h-100 ">
          <div className="card-body ">
            <div className="row gutters">
              <div className="card-body">
                <div className="user-profile ">
                  <div className="user-avatar">
                    <img src={preview ? preview : user.avatar?.path} alt="" />
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
                        class="delete-buttonUser"
                        onClick={() => {
                          setPreview(null);
                          setAvatar(null);
                        }}
                      >
                        X
                      </button>
                    )}
                    <h5 className="user-name fw-bold mt-3">
                      {user?.fullNameEn}
                    </h5>
                    <h6 className="user-email">{user?.email}</h6>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-2 text-primary">Personal Details</h6>
                </div>
              </div>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <div className="d-flex flex-column">
                      <Form.Label>Full Name Arabic</Form.Label>
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
                        <Form.Label className="fw-bold">
                          {user?.fullNameAr}
                        </Form.Label>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <div className="d-flex flex-column">
                      <Form.Label>Full Name English</Form.Label>
                      {editMode ? (
                        <input
                          class="form-control mt-2"
                          required
                          name="fullNameEn"
                          id="fullNameen"
                          value={user?.fullNameEn}
                          onChange={handleChange}
                        />
                      ) : (
                        <Form.Label className="fw-bold">
                          {user?.fullNameEn}
                        </Form.Label>
                      )}
                    </div>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <div className="d-flex flex-column">
                    <Form.Label>Email</Form.Label>
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
                      <Form.Label className="fw-bold">{user?.email}</Form.Label>
                    )}
                  </div>
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <div className="d-flex flex-column">
                      <Form.Label>Adress</Form.Label>
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
                        <Form.Label className="fw-bold">
                          {user?.address}
                        </Form.Label>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <div className="d-flex flex-column">
                      <Form.Label>Phone</Form.Label>
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
                        <Form.Label className="fw-bold">{user?.tel}</Form.Label>
                      )}
                    </div>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <div className="d-flex flex-column">
                      <Form.Label>Branch</Form.Label>
                      {editMode ? (
                        <select
                          name="branchId"
                          class="form-control mt-2"
                          id="branch"
                          value={user?.branchId}
                          onChange={handleChange}
                        >
                          <option value={null}>--حدد الفرع--</option>
                          {branchStore.branches.items.map((item) => (
                            <option value={item.id}>{item.name}</option>
                          ))}
                        </select>
                      ) : (
                        <Form.Label className="fw-bold">
                          {user?.branch?.name}
                        </Form.Label>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <div className="d-flex flex-column">
                      <Form.Label>Role</Form.Label>
                      {editMode ? (
                        <select
                          name="roleId"
                          class="form-control mt-2"
                          id="role"
                          value={user?.roleId}
                          onChange={handleChange}
                        >
                          <option value={null}>--حدد الدور--</option>
                          {roleStore.roles.items.map((item) => (
                            <option value={item.id}>{item.nameAr}</option>
                          ))}
                        </select>
                      ) : (
                        <Form.Label className="fw-bold">
                          {user?.role?.nameAr}
                        </Form.Label>
                      )}
                    </div>
                  </Form.Group>
                </Row>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  {editMode && (
                    <Button
                      variant="outlined"
                      // startIcon={<Cancel />}
                      style={{
                        backgroundColor: "#956EB1",
                        borderColor: "#956EB1",
                        color: "#fff",
                        fontSize: "17px",
                      }}
                      onClick={() => setEditMode(false)}
                    >
                      CANCEL
                    </Button>
                  )}
                  <Button
                    onClick={submitEditProfile}
                    type="submit"
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#956EB1",
                      borderColor: "#956EB1",
                      fontSize: "17px",
                    }}
                  >
                    {editMode ? "SAVE" : "Update"}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <CropEasy
      {...{ preview, setOpenCrop, setPreview, setOpp, setAvatar, avatar }}
    />
  );
}

export default Profile;
