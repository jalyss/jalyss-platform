import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Button, Typography,Form } from "antd";
import QuillEditor from "../components/QuillEditor";
const { Title } = Typography;
const BlogsForm = () => {
  const [content, setContent] = useState("");
  const [files,setFiles]=useState([])
  const onEditorChange = (value ) => {
    setContent(value);
    console.log('value',value);
  };
  const onFilesChange = (files ) => {
    setFiles(files);
    console.log('files',files);
  };

  return (
    <div>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>Editor</Title>
        </div>
        <QuillEditor
          placeholder={"Start Posting Somthing"}
         onEditorChange={onEditorChange}
         onFilesChange={onFilesChange}
        />

        {/* <textarea value={text} onChange={(e) => setText(e.target.value)} /> */}
      <Form>
        <div style={{ textAlign:"center",margin:"2rem auto"}}>
          <Button
          size="large"
          htmlType="submit"
          className=""

          >
          submit
          </Button>
        </div>
      </Form>
      </div>
    </div>
  );
};

export default BlogsForm;