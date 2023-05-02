
import React, { useState } from "react";
import { Button, Typography,Form } from "antd";
import QuillEditor from "../components/QuillEditor";
const { Title } = Typography;

const BlogsForm = () => {

  const [content, setContent] = useState("");
  const [files,setFiles]=useState([])

  
  const onEditorChange = (newContent ) => {
    setContent(newContent);
    localStorage.setItem('blogContent', newContent); // store the content in localStorage
    console.log('newContent',newContent);
  };
  const onFilesChange = (files ) => {
    setFiles(files);
    console.log('files',files);
  };

 
  // Retrieve the content from localStorage on component mount
  useState(() => {
    const storedContent = localStorage.getItem('blogContent');
    if (storedContent) {
      setContent(storedContent);
    }
  }, []);


  
  const handleClearStorage = () => {
    localStorage.clear();
    setContent('');
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
      <div>
        <h2>Content from localStorage:</h2>
        <button onClick={handleClearStorage}>Clear Storage</button>
        <div dangerouslySetInnerHTML={{ __html: content }} />

      </div>
    </div>
  );
};

export default BlogsForm;