import React, { useState } from "react";
import { Button, Typography, Form } from "antd";
import QuillEditor from "../components/QuillEditor";
import { useDispatch } from "react-redux";
import { createBlog } from "../store/blog";

const { Title } = Typography;

const BlogsForm = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const onEditorChange = (newContent) => {
    setContent(newContent);
    localStorage.setItem("blogContent", newContent);
    console.log("newContent", newContent);
  };

  const onFilesChange = (files) => {
    setFiles(files);
    console.log("files", files);
  };

  useState(() => {
    const storedContent = localStorage.getItem("blogContent");
    if (storedContent) {
      setContent(storedContent);
    }
  }, []);

  const handleClearStorage = () => {
    localStorage.clear();
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let body = {
      content,
      // categoryId: "62ddd786-10a1-47fd-a412-a3175f171a4c",
    };
    dispatch(createBlog(body));
  };

  return (
    <div>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>Editor</Title>
        </div>
        <QuillEditor
          placeholder={"Start Posting Something"}
          onEditorChange={onEditorChange}
          onFilesChange={onFilesChange}
        />

        {/* <textarea value={text} onChange={(e) => setText(e.target.value)} /> */}
        <form onSubmit={handleSubmit}>
          {/* select category required */}
          <div style={{ textAlign: "center", margin: "2rem auto" }}>
            <Button
              size="large"
              htmlType="submit"
              className=""
              onSubmit={handleSubmit}
            >
              submit
            </Button>
          </div>
        </form>
      </div>
      <div>
        <h2>Content from localStorage:</h2>
        <button onClick={handleClearStorage}>Clear Storage</button>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default BlogsForm;
