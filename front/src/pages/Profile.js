import React, { useEffect, useState } from "react";
import "../assets/styles/profile.css";
import { authUpdate } from "../store/auth";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { navBarDataProfile } from "../constants/NavBarDataProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CropEasy from "../../src/components/Commun/inputs/CropEasy";
import Modal from "../components/Commun/Modal";
import Dropdown from "react-bootstrap/Dropdown";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbar,
} from "mdb-react-ui-kit";

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);

  const path = useLocation().pathname;

  const [user, setUser] = useState({});

  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (authStore.me) {
      setUser(authStore.me);
      console.log(user, "lenna");
    }
  }, [authStore.me]);

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setAvatar(file);
    setOpenCrop(true);
  };
  const submitEditAvatar = async () => {
    let aux = { id: user.id };
    if (avatar !== null) {
      const image = new FormData();
      image.append("file", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_UPLOAD_ENDPOINT}/upload`,
        image
      );
      aux.avatarId = response.data.id;
    } else if (preview === null && user.avatar !== null) {
      aux.avatarId = null;
    }
    dispatch(authUpdate(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(t("user.updated"));
        setPreview(null);
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };
  const submitEditProfile = async (event) => {
    event.preventDefault();

    let aux = { ...user };

    delete aux.avatar;
    delete aux.Media;
    delete aux.exp;
    delete aux.iat;

    dispatch(authUpdate(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(t("user.updated"));
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };

  const handleRemoveImage = () => {
    let aux = { id: user.id };
    setPreview(null);
    setAvatar(null);

    aux.avatarId = null;

    dispatch(authUpdate(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(t("user.updated"));

        toggleShowDeleteModal();
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };

  return !openCrop ? (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <div className="text-center d-flex justify-content-center " style={{marginleft:100}}>
                  <div className="position-relative">
                    <MDBCardImage
                      src={
                        preview
                          ? preview
                          : user?.avatar?.path ||
                            "https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
                      }
                      alt=" "
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      className="rounded-circle"
                      fluid
                    />

                    <Dropdown
                      className="position-absolute"
                      style={{ bottom: 15, right: 15 }}
                    >
                      <Dropdown.Toggle
                        className="ellipsis-btn dropdownToggleBlogCard upbtn"
                        style={{
                          all: "unset",
                          // backgroundColor:'purple', borderRadius:30
                        }}
                      >
                        <span style={{ color: "white" }}>&#8942;</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu size="sm" title="">
                        <>
                          <Dropdown.Item
                            style={{ position: "relative" }}
                            onClick={(event) => {
                              document.getElementById("upload-image").click();
                            }}
                          >
                            Upload new Avatar
                          </Dropdown.Item>
                          <input
                            id="upload-image"
                            type="file"
                            accept="image/*"
                            style={{
                              display: "none",
                            }}
                            onChange={handleImageChange}
                          />
                        </>
                        {user.avatar && (
                          <Dropdown.Item onClick={toggleShowDeleteModal}>
                            Delete{" "}
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="delete-icon"
                            />
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                {preview && (
                  <div className="d-flex gap-3 justify-content-center m-3">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => {
                        setPreview(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="save-button"
                      onClick={submitEditAvatar}
                    >
                      Save
                    </button>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8" >
            <MDBCard className="mb-4" >
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{
                        color: "rgb(156 39 176 / 70%)",
                        fontWeight: "bold",
                      }}
                    >
                      Full Name
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.fullNameEn}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{
                        color: "rgb(156 39 176 / 70%)",
                        fontWeight: "bold",
                      }}
                    >
                      Email
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{
                        color: "rgb(156 39 176 / 70%)",
                        fontWeight: "bold",
                      }}
                    >
                      Mobile
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user?.client?.tel}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText
                      style={{
                        color: "rgb(156 39 176 / 70%)",
                        fontWeight: "bold",
                      }}
                    >
                      Address
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.client?.address}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

<MDBNavbar className="justify-content-center align-items-center bg-light rounded-2 mb-4" style={{ width: "98%", margin: "0 "}}>

          <MDBNavbarNav className=" justify-content-center align-items-center ">
          {navBarDataProfile.map((elem, i) => (
              <>
    
              <MDBNavbarItem
                key={i}
                // className="label-btn pointer"
                  style={{
                  backgroundColor:
                  elem.path === path ? "rgb(156 39 176 / 34%)" : "",
                  borderRadius: "10px",
                  padding: "5px 10px",
                  margin: "0 5px",
                  minWidth: 100,
                }}
                >
                <MDBNavbarLink
                  onClick={() => {
                    navigate(elem.path);
                  }}
                  style={{
                    color: elem.path === path ? "#fff" : "rgb(156 39 176 )",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                  >
                  {elem.name}
                </MDBNavbarLink>
              </MDBNavbarItem>
              </>
            ))}
              <MDBNavbarItem
                // className="label-btn pointer"
                style={{
                   backgroundColor: "/profile/saved-tarining" ===  path  ? "rgb(156 39 176 / 34%)" : "",
                  borderRadius: "10px",
                  padding: "5px 10px",
                  margin: "0 5px",
                  minWidth: 100,
                  backgroundColor: "rgb(156 39 176 / 34%)"
                }}
              >
                <MDBNavbarLink
                
                  onClick={() => {
                    navigate("/profile/saved-tarining/"+user.id);
                  }}
                  // className="label-btn pointer"
                  style={{
                    color: "/profile/saved-tarining/"+user.id === path ? "#fff" : "rgb(156 39 176 )",
                    fontWeight: "bold",
                    color:"/profile/saved-tarining/"+user.id === path ? "#fff" : "rgb(156 39 176 )",
                  }}
                >
                 Session booked
                </MDBNavbarLink>
              </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBNavbar>

        <Outlet />
      </MDBContainer>
      <Modal
        yesFunc={handleRemoveImage}
        toggleShow={toggleShowDeleteModal}
        setBasicModal={setShowDeleteModal}
        basicModal={showDeleteModal}
        bodOfDelete="Are you sure ro delete you avatar?"
        ofDelete={true}
      />
    </section>
  ) : (
    <CropEasy {...{ preview, setPreview, setOpenCrop, avatar, setAvatar }} />
  );
}
