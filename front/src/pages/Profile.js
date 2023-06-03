import React, { useEffect, useState } from "react";
import "..//assets/styles/profile.css";
import auth, { authUpdate, register } from "../store/auth";
import "../assets/styles/signup.css";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { fetchBlogs } from "../store/blog";
import Dropdown from "react-bootstrap/Dropdown";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function ProfilePage() {

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);
  const blogStore = useSelector((state) => state.blog);
  const me = useSelector((state) => state.me);

  const { blogs } = blogStore;

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {

    if (authStore.me) {
      setUser(authStore.me);
      dispatch(fetchBlogs({ authorId: authStore.me.id,skip:0, take:6  }));
    }
  }, [authStore.me,dispatch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((User) => ({ ...User, [name]: value }));
  };

    function extractTextFromHTML(html) {
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = html;
    return (
      temporaryElement.textContent.substring(0, 100) ||
      temporaryElement.innerText.substring(0, 100) ||
      ""
    );
  }

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
        aux.avatarId = response.data.id;
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
    }
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
                <MDBCardImage
                  src={preview ? preview : authStore?.me?.avatar?.path}
                  alt=" "
                  className="rounded-circle"
                  style={{ width: "125px" }}
                  fluid
                />

<div className="d-flex justify-content-between align-items-center p-3">
  <label htmlFor="upload-image">
    <span className="material-symbols-outlined upbtn">&#128247;</span>
  </label>
  <input
    id="upload-image"
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    onChange={handleImageChange}
  />
</div>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4 nav">
                  <MDBBreadcrumbItem
                    type="submit"
                    className="confirm-button mt-3"
                  >
                    <a className="label-btn">bio</a>
                  </MDBBreadcrumbItem>

                  <MDBBreadcrumbItem
                    type="submit"
                    className="confirm-button mt-3"
                  >
                    <a className="label-btn">My blogs</a>
                  </MDBBreadcrumbItem>


                  <MDBBreadcrumbItem
                    type="submit"
                    className="confirm-button mt-3"
                  >
                    <a className="label-btn">Saved Blogs</a>
                  </MDBBreadcrumbItem>
                  <MDBBreadcrumbItem
                    type="submit"
                    className="confirm-button mt-3"
                  >
                    <a className="label-btn">My orders</a>
                  </MDBBreadcrumbItem>

                  <MDBBreadcrumbItem
                    type="submit"
                    className="confirm-button mt-3"
                  >
                    <a className="label-btn">My orders history</a>
                  </MDBBreadcrumbItem>


                  <MDBBreadcrumbItem
                    type="submit"
                    className="confirm-button mt-3"
                  >
                    <a className="label-btn">Balance</a>
                  </MDBBreadcrumbItem>

                  <MDBBreadcrumbItem
                    type="submit"
                    className="confirm-button mt-3"
                  >
                    <a className="label-btn" type="button"
                        onClick={() => setEditMode(true)}
                      >
                        Setting</a>
                  </MDBBreadcrumbItem>

                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>
           

                    
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
                      Johnatan Smith
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
                      example@example.com
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (098) 765-4321
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Bay Area, San Francisco, CA
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
         
          </MDBRow>

        </MDBContainer>
      <div className="blogListWrapper">
          {blogs.items.map((blog, i) => (
            <div
              className="blogItemWrapper"
              key={blog.id}
              style={{ cursor: "pointer" }}
            >
              {blog.cover ? (
                <img
                  className="blogItemCover"
                  src={blog.cover.path}
                  alt="cover"
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                />
              ) : (
                <img
                  className="blogItemCover"
                  src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
                  alt="cover"
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                />
              )}
              <div
                className="chip mt-3"
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                {blog.category.nameEn}
              </div>
              <div
                className="d-flex flex-column gap-2"
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                <h5 style={{ margin: "20px", flex: "1" }}>{blog.title}</h5>

                <p className="blogItemDescription">
                  {" "}
                  <p>{extractTextFromHTML(blog.content)}</p>
                </p>
              </div>

              <div className="blogItemFooter d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  {blog.author.avatar ? (
                    <img
                      className="blogItemAuthorAvatar"
                      src={blog.author.avatar?.path}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      className="blogItemAuthorAvatar"
                      src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
                      alt="avatar"
                    />
                  )}
                  <div className="d-flex flex-column">
                    <h6 className="mt-3">{blog.author.fullNameEn}</h6>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        color: "#a9a9a9",
                        fontWeight: "600",
                      }}
                    >
                      {blog.createdAt}
                    </p>
                  </div>
                </div>

                
                <Dropdown>
                  <Dropdown.Toggle
                    className="ellipsis-btn dropdownToggleBlogCard"
                    style={{ all: "unset" }}
                  >
                    <span>&#8942;</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu size="sm" title="">
                    {me?.id === blog.authorId ? (
                      <>
                        <Dropdown.Item
                          onClick={() => {
                            setSelectedId(blog.id);
                            setBasicModal(true);
                          }}
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item  onClick={() => navigate(`/update-blog/${blog.id}`)}>Update</Dropdown.Item>
                      </>
                    ) : (
                      <Dropdown.Item
                        onClick={() => {
                          handleCreateBookmark(blog.id);
                        }}
                      >
                        Save
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}
