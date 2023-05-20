import React, { useState } from "react";
import { Button, Typography, Form } from "antd";
import QuillEditor from "../components/QuillEditor";
import axios from "axios";
import jwt_decode from "jwt-decode";

const { Title } = Typography;

const BlogsForm = () => {
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

  const decoded = jwt.verify(token, "your secret or key");  
var userId = decoded.id  
console.log(userId)  

  const handleClearStorage = () => {
    localStorage.clear();
    setContent("");
  };

  const handleSubmit = async () => {
    try {

      const response = await axios.post(
        `localhost:3000/api/v1/blogs`,
        {body:{
          content,
          userId,
          categoryId,
        }
        },
        {
          headers: {
            Authorization: localStorage.getItem("bearer"+json.parse(localstorage.getItem("token")).Authorization)
          },
        }
      );
      const data = response.data;
console.log(data);
    } catch (error) {
      console.error(error);
    }
    
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

      
            <Button onClick={handleSubmit} >
              Submit
            </Button>
          
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
