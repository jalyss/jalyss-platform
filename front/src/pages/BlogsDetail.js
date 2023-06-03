import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlog, createView } from "../store/blog";
import { useSelector } from "react-redux";
import { fetchBlogs, removeBlog } from "../store/blog";

import { createBookmark } from "../store/bookmarks";
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
import Dropdown from "react-bootstrap/Dropdown";
import { showErrorToast, showSuccessToast } from "../utils/toast";


const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [categoryId, setCategoryId] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [basicModal, setBasicModal] = useState(false);
  const categoryStore = useSelector((state) => state.category);
  const { categories } = categoryStore;

  const me = useSelector((state) => state.auth.me);
  const blogStore = useSelector((state) => state.blog);
  const { blogs, blog } = blogStore;
  const toggleShow = () => setBasicModal(!basicModal);

  useEffect(() => {
    dispatch(fetchBlog(blogId));
    dispatch(createView({ blogId }));
  }, [dispatch]);

  let take = 5;
  let skip = 0;
  const authorId = blog?.authorId;

  useEffect(() => {
    if (blog)
      dispatch(fetchBlogs({ take: 5, skip: 0, authorId: blog.authorId }));
  }, [dispatch, blog]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemove = (id) => {
    dispatch(removeBlog({ id, take, skip, categoryId, authorId })).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been saved");
      } else {
        showErrorToast("alredy saved");
      }
  });
};

  const handleCreateBookmarkOne = (blogId) => {
    let body = {
      blogId,
      userId: me.id,
    };
    dispatch(createBookmark(body)).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been saved");
      } else {
        showErrorToast("alredy saved");
      }
    });
  };
  console.log("blog", blog);

  if (!blog) {
    return (
      <div
        className="d-flex justify-content-center align-items-center "
        style={{
          position: "fixed",
          zIndex: 100,
          width: "100%",
          height: "100%",
          backgroundColor: "gray",
        }}
      >
        Loading...
      </div>
    );
  }
  return (
    <div className="d-flex">
      <div
        className="d-flex flex-column  "
        style={{
          margin: "30px",
          flex: "1",
          paddingRight: "20px",
          borderRight: "1px dashed #ccc",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">

          <div className="goBackLink" onClick={() => navigate(-1)}>
            <span> &#8592;</span> <span>Go Back</span>
          </div>
          <div>
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
                      ;
                      }}
                    >
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => navigate(`/update-blog/${blog.id}`)}
                    >
                      Update
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item
                    onClick={() => {
                      handleCreateBookmarkOne(blog.id);
                    }}
                  >
                    Save
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
              <style>
                {`
          .ellipsis-btn:hover {
            background-color: #8c21bd45 !important;
          }
        `}
              </style>
            </Dropdown>
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
                  <MDBModalBody>
                    Press continue to delete this blog
                  </MDBModalBody>

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
                        navigate(-1);
                      }}
                    >
                      Continue
                    </button>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </>
        </div>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div className="d-flex flex-column align-items-center">
            <p
              style={{
                fontSize: " 0.8rem",
                color: "#a9a9a9",
                fontWeight: " 500",
              }}
            >
              Published {blog.createdAt}
            </p>

            <h1 style={{ whiteSpace: "pre-line", textAlign: "center" }}>
              {blog.title}
            </h1>

            <div className="categoryInfo">
              <span className="categoryLabel">Category:</span>
              <span className="chip">{blog.category.nameEn}</span>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ margin: "0.5rem" }}
            >
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
              <h3 style={{ fontSize: "1.2rem", color: "#333" }}>
                {blog.author.fullNameEn}
              </h3>
            </div>
          </div>
          {blog.cover ? (
            <img
              style={{ width: "100%", borderRadius: "15px" }}
              src={blog.cover?.path}
              alt="cover"
            />
          ) : (
            <img
              style={{ width: "100%", borderRadius: "15px" }}
              src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
              alt="cover"
            />
          )}

          <p style={{ padding: "1rem", marginTop: "1.5rem" }}>
            {" "}
            <span dangerouslySetInnerHTML={{ __html: blog.content }}></span>
          </p>
        </div>
      </div>

      <div style={{ width: "300px", marginTop: "15px" }}>
        {blog.author.avatar ? (
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
            className="blogItemAuthorAvatar"
            src={blog.author.avatar?.path}
            alt="avatar"
          />
        ) : (
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
            className="blogItemAuthorAvatar"
            src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
            alt="avatar"
          />
        )}
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "50px",
          }}
        >
          {blog.authorName}
        </p>
        <h2 className="moreFromAuthor">More from {blog.author.fullNameEn}</h2>
        <div style={{ marginTop: "10px" }}>
          {blogs.items.map((blog) => (
            <div
              className="d-flex align-items-center"
              style={{ cursor: "pointer", marginTop: "20px" }}
              key={blog.id}
              // onClick={() => handleBlogSelection(blog)}
            >
              <h6 className="sideBlogTitle">
                {blog.title}
                <br />
                <span className="spanBlog">Category: </span>{" "}
                <small>{blog.category.nameEn}</small>
              </h6>
              {blog.cover ? (
                <img
                  className="sideBlogImage"
                  src={blog.cover?.path}
                  alt="cover"
                />
              ) : (
                <img
                  className="sideBlogImage"
                  src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
                  alt="cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
