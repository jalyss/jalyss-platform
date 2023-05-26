import React, { useState,useEffect } from "react";
import { Button, Typography, Form } from "antd";
import QuillEditor from "../components/QuillEditor";
import { useDispatch } from "react-redux";
import { createBlog } from "../store/blog";
import {fetchCategoriesBlogs} from "../store/category";
import { useSelector } from "react-redux";
const { Title } = Typography

const BlogsForm = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [categoryId,setCategoryId]=useState("")
  const categoryStore = useSelector((state) => state.category);
  const { categories } = categoryStore;

  const onEditorChange = (newContent) => {
    setContent(newContent);
    localStorage.setItem("blogContent", newContent);
    console.log("newContent", newContent);
  };

  const onFilesChange = (files) => {
    setFiles(files);
    console.log("files", files);
  };

  useEffect(() => {
    dispatch(fetchCategoriesBlogs());
  }, [dispatch]);
console.log("ooo",categories);
 

  const handleSubmit = (e) => {
    e.preventDefault()
    let body = {
      content,
      categoryId,
    };
    dispatch(createBlog(body));
  };
  const handleChange=(e)=>{
   setCategoryId(e.target.value)
   console.log("oo",categoryId);
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   let body = {
  //     content,
  //     // categoryId: "62ddd786-10a1-47fd-a412-a3175f171a4c",
  //   };
  //   dispatch(c(body));
  // };

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
       
       <select value={categoryId}class="form-select mt-4" aria-label="Default select example" onChange={handleChange}>
  <option selected>Choose your Blog category</option>
  {categories.items.map((category,index)=>(
    <option key={index} value={category.id}>{category.nameEn}</option>
  ))}
  
 
</select>
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
    
    </div>
  );
};

export default BlogsForm;
