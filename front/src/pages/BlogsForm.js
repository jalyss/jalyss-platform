import React, { useState, useEffect } from "react";
import { Button, Typography, Form } from "antd";
import QuillEditor from "../components/QuillEditor";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchCategoriesBlogs } from "../store/category";
import { createBlog } from "../store/blog";

import axios from "axios";
const { Title } = Typography;

const BlogsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [staticModal, setStaticModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [formValidated, setFormValidated] = useState(false);

  const categoryStore = useSelector((state) => state.category);
  const { categories } = categoryStore;

  useEffect(() => {
    dispatch(fetchCategoriesBlogs());
  }, [dispatch]);

  const onEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCover(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      content,
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

    dispatch(createBlog(body)).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been created");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });

   
   
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  // const handleChange = (e) => {
  //   setCategoryId(e.target.value);
  // };


  const handleChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      // No option selected, display an error message or take appropriate action
      alert("Please choose a category!");
    } else {
      // Option selected, update the categoryId state
      setCategoryId(selectedOption);
    }
  };
  








  const toggleShow = () =>{ 
    
    setStaticModal(!staticModal);}

  (function () {
    "use strict";
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add("was-validated");
          } else {
            event.preventDefault(); // Prevent default form submission
            event.stopPropagation();
            toggleShow(); // Show the modal
          }
        },
        false
      );
    });
  })();
  

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <form className={`row g-3 needs-validation ${formValidated ? "was-validated" : ""}`} noValidate onSubmit={toggleShow}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>Start Write your Blog!</Title>
        </div>
        <div>
          {" "}
          <div class="input-group mb-3 ">
            <div class="input-group-append ">
              <span class="input-group-text" id="basic-addon2" style={{width:"162px"}}>
                Blog title
              </span>
            </div>
            <input
              type="text"
              className="form-control w-50"
              placeholder=""
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <div className="d-flex justify-content-end ">
              <input
                className="form-control"
                id="formFileLg"
                type="file"
                onChange={handleFileChange}
                
              />
            </div>
          </div>
        </div>

        <QuillEditor
          placeholder={"Start Posting Something"}
          onEditorChange={onEditorChange}
          onFilesChange={onFilesChange}
          value={content}
          required
        />

        <select
          value={categoryId}
          class="form-select mt-3"
          aria-label="Default select example"
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>Choose your Blog category</option>
          {categories.items.map((category, index) => (
            <option key={index} value={category.id}>
              {category.nameEn}
            </option>
          ))}
        </select>

        <div style={{ textAlign: "center", margin: "2rem auto" }}>
        <button class="btn btn-primary" type="submit" >
            Submit form
          </button>
        </div>
      </form>
      

     { staticModal &&  <MDBModal staticBackdrop tabIndex="-1" show={staticModal}>
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
      </MDBModal>}
    </div>
  );
};

export default BlogsForm;