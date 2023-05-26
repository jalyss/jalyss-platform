import React, { useState, useEffect } from "react";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
import landingPerson from "../assets/styles/landingPerson.json";
import data from "../assets/styles/data.json";
import DisplayLottie from "./DisplayLottie";
import DocumentMeta from "react-document-meta";
import useMeta from "../hooks/useMeta";
import { useTranslation } from "react-i18next";
import { fetchBlogs, fetchTrends, removeBlog } from "../store/blog";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import AutoCompleteFilter from "../components/AutoCompleteFilter";
import { fetchUsers } from "../store/user";
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

function Blogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const meta = useMeta(t("blog.title"), t("blog.description"));

  const me = useSelector((state) => state.auth.me);
  const blogStore = useSelector((state) => state.blog);
  const { blogs, trends } = blogStore;
  const categoryStore = useSelector((state) => state.category);
  const { categories } = categoryStore;
  const userStore = useSelector((state) => state.user);
  const { users } = userStore;

  const [categoryId, setCategoryId] = useState([]);
  const [authorId, setAuthorId] = useState([]);
  const [skip, setSkip] = useState(0);
  const [basicModal, setBasicModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const take = 6;
  let trend = 1;
  let confirm = 1;

  const greeting = {
    title: "Welcome to Jalyss Blog 👋",
    subTitle:
      "where personal growth meets insightful reading! Are you looking to expand your knowledge, gain new insights, and explore your full potential? Then look no further than Jalyss Blog. Our platform offers a wide range of articles, book reviews, and personal stories .",
    displayGreeting: true, // Set false to hide this section, defaults to true
  };

  useEffect(() => {
    dispatch(fetchBlogs({ take, skip, categoryId, authorId }));
    dispatch(fetchTrends());
    dispatch(fetchUsers());
  }, [dispatch, authorId, categoryId, skip]);

  function extractTextFromHTML(html) {
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = html;
    return (
      temporaryElement.textContent.substring(0, 100) ||
      temporaryElement.innerText.substring(0, 100) ||
      ""
    );
  }
  const handleChange = (event, value) => {
    console.log(value);
    setSkip((value - 1) * take);
  };
  const toggleShow = () => setBasicModal(!basicModal);
  console.log("count", blogs.count);
  const handleRemove = (id) => {
    dispatch(removeBlog({ id, take, skip, categoryId, authorId }));
  };

  return (
    <DocumentMeta {...meta} className="container-fluid">
      <div>
        <Fade bottom duration={1000} distance="40px">
          <div
            style={{ alignItems: "normal", height: "600px", margin: "0 70px" }}
          >
            <div
              className="d-flex align-items-center justify-content-center  "
              style={{ margin: 30 }}
            >
              <div className="col-lg-6">
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ margin: 20 }}
                >
                  <h1 className="greetingText">
                    Welcome to Jalyss Blog <br />
                    👋
                  </h1>

                  <p className="fs-4 lh-base" style={{ color: "#868e96" }}>
                    {greeting.subTitle}
                  </p>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ height: "50px", width: "172px" }}
                    >
                      <div href="#blogListWrapper">Explore &#9654;</div>
                    </button>

                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      style={{
                        height: "50px",
                        width: "172px",
                        marginLeft: "20px",
                      }}
                      onClick={() => {
                        navigate("/BlogsForm");
                      }}
                    >
                      Write yours
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="landingPerson">
                  <DisplayLottie animationData={landingPerson} />
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <Fade bottom duration={3000} distance="40px">
          <div style={{ alignItems: "normal", margin: "95px 70px" }}>
            <div className=" d-flex align-items-center">
              <div className="col-lg-6" style={{ marginTop: "70px" }}>
                <div>
                  <DisplayLottie animationData={data} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex">
                  <div className="d-flex flex-column align-items-center">
                    <h1
                      className="text-center"
                      style={{ marginBottom: "20px", fontSize: "50px" }}
                    >
                      Trending on Jalyss <br /> <FaFire />
                    </h1>
                    <div className="d-flex flex-wrap justify-content-center">
                      {trends.map((blog, index) => (
                        <div
                          className="d-flex gap-2 align-items-center"
                          style={{
                            width: "300px",
                            marginTop: "20px",
                            marginBottom: "20px",
                          }}
                          key={blog.id}
                        >
                          <h3
                            style={{
                              color: "#a9a9a9",
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                            }}
                          >{`${(index + 1).toString().padStart(2, "0")}`}</h3>
                          <img
                            style={{
                              width: "4rem",
                              height: "4rem",
                              borderRadius: "50%",
                            }}
                            src={blog.authorAvatar}
                            alt={blog.authorName}
                          />
                          <div className="d-flex flex-column ">
                            <p style={{ fontSize: "1rem" }}>
                              {blog.authorName}
                            </p>
                            <h6 style={{ fontWeight: "bold" }}>{blog.title}</h6>
                            <p style={{ fontSize: "0.75rem", color: "#666" }}>
                              {blog.createdAt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>

        <div
          style={{
            borderTop: "0.5px",
            height: "1px",
            width: "100%",
            backgroundColor: "#a9a9a9",
          }}
        />
        <div className="d-flex flex-wrap justify-content-around mt-3">
          <AutoCompleteFilter
            data={categories.items}
            valueOptionName="id"
            labelOptionName="nameEn"
            label="Filter by Category"
            onChange={setCategoryId}
          />
          <AutoCompleteFilter
            data={users.items}
            valueOptionName="id"
            labelOptionName="fullNameEn"
            label="Filter by author"
            onChange={setAuthorId}
          />
        </div>

        <div className="blogListWrapper">
          {blogs.items.map((blog, i) => (
            <div
              className="blogItemWrapper"
              key={blog.id}
              style={{ cursor: "pointer" }}
            >
              {blog.cover ? (
                <img
                  className="blodItemCover"
                  src={blog.cover}
                  alt="cover"
                  onClick={() => navigate("/blogs/${blog.id}")}
                />
              ) : (
                <img
                  src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
                  alt="cover"
                  onClick={() => navigate("/blogs/${blog.id}")}
                />
              )}
              <div
                className="chip mt-3"
                onClick={() => navigate("/blogs/${blog.id}")}
              >
                {blog.category.nameEn}
              </div>
              <div
                className="d-flex flex-column gap-2"
                onClick={() => navigate("/blogs/${blog.id}")}
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
                    className="ellipsis-btn"
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
                        <Dropdown.Item>Update</Dropdown.Item>
                      </>
                    ) : (
                      <Dropdown.Item>Save</Dropdown.Item>
                    )}
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
                  <MDBBtn color="secondary" onClick={toggleShow}>
                    Close
                  </MDBBtn>
                  <MDBBtn
                    onClick={() => {
                      handleRemove(selectedId);
                      setBasicModal(false);
                    }}
                  >
                    Continue
                  </MDBBtn>
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
            onChange={handleChange}
          />
        </div>
      </div>
    </DocumentMeta>
  );
}

export default Blogs;
