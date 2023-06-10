import React, { useEffect, useState } from "react";
import "../assets/styles/profile.css";
import auth, { authUpdate, register } from "../store/auth";
import "../assets/styles/signup.css";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Edit from "../components/Profile/Edit";
import MyBlogs from "../components/Profile/MyBlogs";
import MyBookmarks from "../components/Profile/MyBookmarks";
import Bio from "../components/Profile/bio";
import { navBarDataProfile } from "../constants/NavBarDataProfile";

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
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);
  const blogStore = useSelector((state) => state.blog);
  const navigate = useNavigate();
  const me = useSelector((state) => state.me);
  const path = useLocation().pathname;

  const blogs = blogStore;

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [showBio, setShowBio] = useState(false);
  const [showMyBlogs, setShowMyBlogs] = useState(false);
  const [showMyBookmarks, setShowMyBookmarks] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (authStore.me) {
      setUser(authStore.me);
      console.log(user, "lenna");
    }
  }, [authStore.me]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((User) => ({ ...User, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setAvatar(file);
    setEditMode(true);
  };

  const submitEditProfile = async (event) => {
    event.preventDefault();

    let aux = { ...user };

    if (avatar !== null) {
      const image = new FormData();
      image.append("file", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/upload`,
        image
      );
      aux.avatarId = response.data.id;
    } else if (preview === null && user.avatar !== null) {
      aux.avatarId = null;
    }

    delete aux.avatar;
    delete aux.Media;
    delete aux.exp;
    delete aux.iat;

    dispatch(authUpdate(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(t("user.updated"));
        setEditMode(false);
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };

  const handleRemoveImage = () => {
    let aux = { ...user };
    setPreview(null);
    setAvatar(null);

    delete aux.avatar;
    delete aux.Media;
    delete aux.exp;
    delete aux.iat;

    aux.avatarId = null;

    dispatch(authUpdate(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(t("user.updated"));
        setEditMode(false);
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {user.avatar || preview ? (
                  <MDBCardImage
                    src={preview ? preview : authStore?.me?.avatar?.path}
                    alt=" "
                    className="rounded-circle"
                    style={{ width: "125px" }}
                    fluid
                  />
                ) : (
                  <MDBCardImage
                    className="rounded-circle"
                    style={{ width: "125px" }}
                    src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
                    alt="avatar"
                    fluid
                  />
                )}
                <div className="d-flex justify-content-between align-items-center p-3">
                  <label htmlFor="upload-image">
                    <span className="material-symbols-outlined upbtn">
                      &#128247;
                    </span>
                  </label>
                  <input
                    id="upload-image"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />

                  {user.avatar && (
                    <button
                      type="button"
                      className="delete-button"
                      onClick={handleRemoveImage}
                    >
                      Delete Image
                    </button>
                  )}
                </div>

                { editMode && (user.avatar || preview) && (
                  <>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="save-button"
                      onClick={submitEditProfile}
                    >
                      Save
                    </button>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
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
                    <MDBCardText>Email</MDBCardText>
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
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.tel}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.address}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBNavbar className=" d-flex justify-content-center align-items-center bg-light rounded-3  mb-4 ">
          <MDBNavbarNav className=" justify-content-center align-items-center ">
            {navBarDataProfile.map((elem, i) => (
              <MDBNavbarItem
                key={i}
                style={{
                  backgroundColor:
                    elem.path === path ? "rgb(156 39 176 / 34%)" : "",
                }}
              >
                <MDBNavbarLink
                  onClick={() => {
                    navigate(elem.path);
                  }}
                  className="label-btn"
                >
                  {elem.name}
                </MDBNavbarLink>
              </MDBNavbarItem>
            ))}
          </MDBNavbarNav>
        </MDBNavbar>

        <Outlet />
      </MDBContainer>
    </section>
  );
}
