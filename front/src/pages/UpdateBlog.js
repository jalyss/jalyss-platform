import React, { useRef, useState, useEffect } from "react";
import QuillEditor from "../components/QuillEditor";
import { Typography } from "antd";
import ReactQuill, { Quill } from "react-quill";

import { Container } from "@mui/material";
import { fetchBlog } from "../store/blog";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
const { Title } = Typography;

function UpdateBlog() {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const quillRef = useRef(null);
  const ref = useRef(null);
  const blogStore = useSelector((state) => state.blog);
  const { blog } = blogStore;
  const [newContent, setNewContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    dispatch(fetchBlog(blogId));
  }, [dispatch]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (blog) {
      htmlToText(blog.content);
      setCover(blog.cover);
      setTitle(blog.title);
    }
  }, [blog]);

  const htmlToText = (content) => {
    const parser = new DOMParser();
    const parsedContent = parser.parseFromString(content, "text/html");
    const textContent = parsedContent.documentElement.textContent;
    setNewContent(textContent);
  };
  const handleTextChange = (delta, oldDelta, source) => {
    const editorContent = quillRef.current.root.innerHTML;
    onEditorChange(editorContent);
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
  const defaultContent = "<p>Default value</p>";

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
      {/* <div className="mb-3">
            <div className="d-flex justify-content-end ">
              <input
              ref={ref} defaultValue={cover}
                className="form-control"
                id="formFileLg"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div> */}
      <div> {newContent}</div>

      <>
        <div id="editor-container">
          <QuillEditor
            placeholder={"Start Posting Something"}
            value={newContent}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
          />
        </div>
        {/* <QuillEditor
          ref={ref}
          value={defaultContent}
            placeholder={"Start Posting Something"}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
          >
            <div className="my-editing-area"/>
            </QuillEditor> */}
      </>
    </div>
  );
}

export default UpdateBlog;
