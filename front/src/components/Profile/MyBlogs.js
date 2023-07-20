import React, { useEffect, useState } from "react";
import "../../assets/styles/profile.css";
import auth, { authUpdate, register } from "../../store/auth";
import "../../assets/styles/signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { fetchBlogs,removeBlog } from "../../store/blog";
import Pagination from "@mui/material/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from "mdb-react-ui-kit";


const MyBlogs = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);
  const blogStore = useSelector((state) => state.blog);
  const navigate = useNavigate();
  const me = useSelector((state) => state.me);

  const { blogs } = blogStore;

  const [user, setUser] = useState({});
  const [authorId, setAuthorId] = useState([]);
  const [skip, setSkip] = useState(0);
  const [basicModal, setBasicModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const take = 6;

  const toggleShow = () => setBasicModal(!basicModal);


  useEffect(() => {
    if (authStore.me) {
      setUser(authStore.me);
      setAuthorId(authStore.me.id);
      dispatch(fetchBlogs({ authorId: authStore.me.id, skip, take }));
      console.log(user, "lenna");
    }
  }, [authStore.me, dispatch, skip, take]);

  const handleChangeSkip = (event, value) => {
    setSkip((value - 1) * take);
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

const handleRemove = (id) => {
    dispatch(removeBlog({ id, take, skip, authorId }));
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>

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
                  {
                    <>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedId(blog.id);
                          setBasicModal(true);
                        }}
                      >
                      
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigate(`/update-blog/${blog.id}`)}
                      >
                        Update
                      </Dropdown.Item>
                    </>
                  }
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
      <>
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Delete</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>Press continue to delete this blog</MDBModalBody>

                <MDBModalFooter>
                  <button
                    color="secondary"
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={toggleShow}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handleRemove(selectedId);
                      setBasicModal(false);
                    }}
                  >
                    Continue
                  </button>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>

      <div className="d-flex justify-content-center my-5">
        <Pagination
          count={
            blogs.count % take === 0
              ? Math.floor(blogs.count / take)
              : Math.floor(blogs.count / take) + 1
          }
          color="secondary"
          variant="outlined"
          onChange={handleChangeSkip}
        />
      </div>
    </section>
  );
}


export default MyBlogs;