import React, { useRef, useState, useEffect } from "react";
import QuillEditor from "../components/QuillEditor";
import { Typography ,Button,form} from "antd";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import axios from "axios";

import "react-quill/dist/quill.snow.css";
import { editBlog, fetchBlog } from "../store/blog";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser'; 
const { Title } = Typography;

function UpdateBlog() {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const navigate=useNavigate()
  const quillRef = useRef(null);
  const ref = useRef(null);
  const me = useSelector((state) => state.auth.me);
  const blogStore = useSelector((state) => state.blog);
  const { blog } = blogStore;
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

  useEffect(() => {}, []);

  useEffect(() => {
    if (blog) {
        console.log('updateblog',ReactHtmlParser(blog.content));
        blog.content.split('width')
      setNewContent(blog.content);
      setCover(blog.cover);
      setTitle(blog.title);
    }
  }, [blog]);

 
  const handleChange = (e) => {
    setCategoryId(e.target.value);
    console.log("oo", categoryId);
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
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCover(e.target.files[0]);
      console.log("Selected cover file:", e.target.files[0]);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let id=blog.id
   
    let body = {
      content:newContent,
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

    dispatch(editBlog({id,body})).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been updated");
        navigate(-1);
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
              ref={ref} defaultValue={cover}
                className="form-control"
                id="formFileLg"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
      

      <>
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
          <option selected>Choose your Blog category</option>
          {categories.items.map((category, index) => (
            <option key={index} value={category.id}>
              {category.nameEn}
            </option>
          ))}
        </select>
        <form>
        
        <div style={{ textAlign: "center", margin: "2rem auto" }}>
            <Button size="large" className="" onClick={handleSubmit} >
              submit
            </Button>
        </div>
        </form>
      </>
    </div>
    
  );
}

export default UpdateBlog;
