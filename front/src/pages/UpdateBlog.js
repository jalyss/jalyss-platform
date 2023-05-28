import { React, useRef, useState, useEffect } from "react";
import QuillEditor from "../components/QuillEditor";
import { Typography, Button, Form } from "antd";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import axios from "axios";

import { Container } from "@mui/material";
import { editBlog, fetchBlog } from "../store/blog";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
const { Title } = Typography;

function UpdateBlog() {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const quillRef = useRef(null);
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
  }, [dispatch, blogId]);

  useEffect(() => {
    if (blog) {
      setNewContent(blog.content);
      setCover(blog.cover);
      setTitle(blog.title);
    }
  }, [blog]);

  const handleChange = (e) => {
    setCategoryId(e.target.value);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const onEditorChange = (content) => {
    setNewContent(content);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCover(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("content", newContent);
    formData.append("categoryId", categoryId);
    formData.append("title", title);

    if (cover !== null) {
      formData.append("file", cover);
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_ENDPOINT}/blogs/${blog.id}`,
        formData
      );
      showSuccessToast("Blog has been updated");
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <Title level={2}>Update your Blog!</Title>
      </div>
      <Form>
        <Form.Item>
          <input
            type="text"
            className="form-control w-50"
            placeholder=""
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <input
            className="form-control"
            id="formFileLg"
            type="file"
            onChange={handleFileChange}
          />
        </Form.Item>

        <div id="editor-container">
          <QuillEditor
            placeholder={"Start Posting Something"}
            value={newContent}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
          />
        </div>
        <Form.Item>
          <select
            value={categoryId}
            className="form-select mt-3"
            aria-label="Default select example"
            onChange={handleChange}
          >
            <option value="">Choose your Blog category</option>
            {categories.items.map((category, index) => (
              <option key={index} value={category.id}>
                {category.nameEn}
              </option>
            ))}
          </select>
        </Form.Item>
        <Button size="large" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateBlog;
