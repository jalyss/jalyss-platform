import React, { useState, useEffect } from "react";
import { Button, Typography, Form } from "antd";
import QuillEditor from "../components/QuillEditor";
import { useDispatch } from "react-redux";
import { createBlog } from "../store/blog";
import { fetchCategoriesBlogs } from "../store/category";
import { useSelector } from "react-redux";
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
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const BlogsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [staticModal, setStaticModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("")
  const categoryStore = useSelector((state) => state.category);
  const { categories } = categoryStore;

  useEffect(() => {
    dispatch(fetchCategoriesBlogs());
  }, [dispatch]);

  const onEditorChange = (newContent) => {
    setContent(newContent);
    localStorage.setItem("blogContent", newContent);
    console.log("newContent", newContent);
  };
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("file",file);
    }
  };


  const onFilesChange = (files) => {
    setFiles(files);
    console.log("files", files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      content,
      categoryId,
      title,
    };
    dispatch(createBlog(body)).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been created");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
    setStaticModal(!staticModal);
  };
  const handleChange = (e) => {
    setCategoryId(e.target.value);
    console.log("oo", categoryId);
  };
  const toggleShow = () => setStaticModal(!staticModal);
  return (
    <div>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>Start Write your Blog!</Title>
        </div>
        <div>
          {" "}
          <div class="input-group mb-3 ">
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">
                Blog title
              </span>
            </div>
          </div>
          <div className="mb-3">
            <input
              class="form-control form-control"
              id="formFileLg"
              type="file"
              onClick={handleFileChange}   
            />
          </div>
        </div>

        <QuillEditor
          placeholder={"Start Posting Something"}
          onEditorChange={onEditorChange}
          onFilesChange={onFilesChange}
        />

        <select
          value={categoryId}
          class="form-select mt-3"
          aria-label="Default select example"
          onChange={handleChange}
        >
          <option selected>Choose your Blog category</option>
          {categories.items.map((category, index) => (
            <option key={index} value={category.id}>
              {category.nameEn}
            </option>
          ))}
        </select>
        <form>
          {/* select category required */}
          <div style={{ textAlign: "center", margin: "2rem auto" }}>
            <Button size="large" className="" onClick={toggleShow}>
              submit
            </Button>

            <MDBModal staticBackdrop tabIndex="-1" show={staticModal}>
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>
                      Click on "continue" to post the Blog{" "}
                    </MDBModalTitle>
                    <MDBBtn
                      className="btn-close"
                      color="none"
                      onClick={toggleShow}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <span dangerouslySetInnerHTML={{ __html: content }}></span>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm"
                      style={{ width: "80px" }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      onClick={handleSubmit}
                    >
                      Continue
                    </button>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogsForm;
