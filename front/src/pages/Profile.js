import React, { useEffect, useState } from "react";
import "..//assets/styles/profile.css";
import auth, { authUpdate, register } from "../store/auth";
import "../assets/styles/signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Edit from "../components/Profile/Edit";
import MyBlogs from "../components/Profile/MyBlogs";
import MyBookmarks from "../components/Profile/MyBookmarks";
import Bio from "../components/Profile/bio";

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
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {user.avatar ? (
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
                </div>
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
        <MDBNavbarItem >
          <MDBNavbarLink
            to="/bio"
            className="label-btn"
            onClick={() => {
              setShowBio(true);
              setShowMyBlogs(false);
              setShowMyBookmarks(false);
              setShowOrderHistory(false);
              setShowBalance(false);
              setShowSettings(false);
            }}
          >
            Bio
          </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem style={{all:"unset"}}>
          <MDBNavbarLink
            to="/blogs"
            className="label-btn"
            onClick={() => {
              setShowBio(false);
              setShowMyBlogs(true);
              setShowMyBookmarks(false);
              setShowOrderHistory(false);
              setShowBalance(false);
              setShowSettings(false);
            }}
          >
            My Blogs
          </MDBNavbarLink>
        </MDBNavbarItem >
        <MDBNavbarItem style={{all:"unset"}} >
          <MDBNavbarLink
            to="/saved-blogs"
            className="label-btn"
            onClick={() => {
              setShowBio(false);
              setShowMyBlogs(false);
              setShowMyBookmarks(true);
              setShowOrderHistory(false);
              setShowBalance(false);
              setShowSettings(false);
            }}
          >
            Saved Blogs
          </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem style={{all:"unset"}}>
          <MDBNavbarLink
            to="/order-history"
            className="label-btn"
            onClick={() => {
              setShowBio(false);
              setShowMyBlogs(false);
              setShowMyBookmarks(false);
              setShowOrderHistory(true);
              setShowBalance(false);
              setShowSettings(false);
            }}
          >
            My Order History
          </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem style={{all:"unset"}}>
          <MDBNavbarLink
            to="/balance"
            className="label-btn"
            onClick={() => {
              setShowBio(false);
              setShowMyBlogs(false);
              setShowMyBookmarks(false);
              setShowOrderHistory(false);
              setShowBalance(true);
              setShowSettings(false);
            }}
          >
            Balance
          </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem style={{all:"unset"}}>
          <MDBNavbarLink
            className="label-btn"
            type="button"
            onClick={() => {
              setShowBio(false);
              setShowMyBlogs(false);
              setShowMyBookmarks(false);
              setShowOrderHistory(false);
              setShowBalance(false);
              setShowSettings(true);
            }}
          >
            Settings
          </MDBNavbarLink>
        </MDBNavbarItem >
      </MDBNavbarNav>
    </MDBNavbar>

        {showBio && <Bio />}
        {showMyBlogs && <MyBlogs />}
        {showMyBookmarks && <MyBookmarks/>}
        {/* {showOrderHistory && <OrderHistory />} */}
        {/* {showBalance && <Balance />} */}
        {showSettings && <Edit />}
      </MDBContainer>
    </section>
  );
}
