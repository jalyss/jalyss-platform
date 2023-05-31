import React, { useRef, useState, useEffect } from "react";
import QuillEditor from "../components/QuillEditor";
import { Typography, Button, form } from "antd";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { editBlog, fetchBlog } from "../store/blog";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
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

const { Title } = Typography;

function UpdateBlog() {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const ref = useRef(null);
  const me = useSelector((state) => state.auth.me);
  const blogStore = useSelector((state) => state.blog);
  const { blog } = blogStore;

  const [Modal, setModal] = useState(false);
  const [staticModal, setStaticModal] = useState(false);
  const [newContent, setNewContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [cover, setCover] = useState(null);
  const [files, setFiles] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  const categoryStore = useSelector((state) => state.category);
  const { categories } = categoryStore;

  useEffect(() => {
    dispatch(fetchBlog(blogId));
  }, [dispatch]);

  // useEffect(() => {}, []);

  useEffect(() => {
    if (blog) {
      console.log("updateblog", ReactHtmlParser(blog.content));
      blog.content.split("width");
      setNewContent(blog.content);
      setCover(blog.cover);
      setTitle(blog.title);
      setCategoryId(blog.categoryId);
    }
  }, [blog]);

  const handleChange = (e) => {
    setCategoryId(e.target.value);
  };

  const onFilesChange = (files) => {
    setFiles(files);
    console.log("files", files);
  };
  const onEditorChange = (content) => {
    setNewContent(content);
  };

  const handleClick = () => {
    console.log(ref.current.value);
    if (!blog) {
      return <div>Loading...</div>;
    }
  };

  const toggleShow = () => {
    setStaticModal(!staticModal);
  };

  const showModal = () => {
    setModal(!Modal);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCover(e.target.files[0]);
      console.log("Selected cover file:", e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = blog.id;

    let body = {
      content: newContent,
      categoryId,
      title,
    };

    if (cover !== null) {
      try {
        const formData = new FormData();
        formData.append("file", cover);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.coverId = response.data.id;
      } catch (error) {
        console.error("Error uploading cover image:", error);
      }
    }

    dispatch(editBlog({ id, body })).then((res) => {
      if (!res.error) {
        // showSuccessAlert("Blog has been updated");
        showModal();
        navigate("/blogs");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <Title level={2}>Update your Blog!</Title>
      </div>
      <div class="input-group mb-3 ">
        <div class="input-group-append ">
          <span
            class="input-group-text"
            id="basic-addon2"
            style={{ width: "162px" }}
          >
            Blog title
          </span>
        </div>
        <input
          type="text"
          className="form-control w-50"
          placeholder=""
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          ref={ref}
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          onClick={handleClick}
        />
      </div>
      <div className="mb-3">
        <div className="d-flex justify-content-end ">
          <input
            ref={ref}
            // defaultValue={blog?.cover.path}
            className="form-control"
            id="formFileLg"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div id="editor-container">
        <QuillEditor
          placeholder={"Start Posting Something"}
          value={newContent}
          onEditorChange={onEditorChange}
          onFilesChange={onFilesChange}
        />
      </div>
      <select
        value={categoryId}
        class="form-select mt-3"
        aria-label="Default select example"
        onChange={handleChange}
      >
        <option selected>{blog?.category.nameEn}</option>
        {categories.items.map((category, index) => (
          <option key={index} value={category.id}>
            {category.nameEn}
          </option>
        ))}
      </select>

      <div style={{ textAlign: "center", margin: "2rem auto" }}>
        <button class="btn btn-primary" onClick={toggleShow}>
          Update
        </button>
      </div>

      {staticModal && (
        <MDBModal staticBackdrop tabIndex="-1" show={staticModal}>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>
                  Click on "Continue" to save the changes 
                </MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <span dangerouslySetInnerHTML={{ __html: newContent }}></span>
              </MDBModalBody>
              <MDBModalFooter>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ width: "80px" }}
                  onClick={() => navigate(-1)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleSubmit}
                >
                  Continue
                </button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
      {Modal && (
        <MDBModal staticBackdrop tabIndex="-1" show={Modal}>
          <MDBModalContent>
            <MDBModalBody>
              <span dangerouslySetInnerHTML={"Updated successfully"}></span>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModal>
      )}
    </div>
  );
}

export default UpdateBlog;
