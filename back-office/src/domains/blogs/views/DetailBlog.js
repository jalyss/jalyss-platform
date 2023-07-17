import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { rows } from "../../../constants/blogData";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import blogs, { fetchBlog, editBlog } from "../../../store/blogs";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function DetailBlog() {
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const [confirm , setConfirm] = useState();
  const navigate = useNavigate(); 
  
  const blog = useSelector((state) => state?.blogs?.blog);
  console.log(blogId, "bloggg");
  
  function extractTextFromHTML(html) {
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = html;
    return (
      temporaryElement.textContent.substring(0, 100) ||
      temporaryElement.innerText.substring(0, 100) ||
      ""
      );
    }
    
    useEffect(() => {
      dispatch(fetchBlog(blogId));
    }, [dispatch,blogId]);
    
    const acceptBlogFun = async (e) => {
      e.preventDefault();

      let id = blogId;

    let body = {
      confirm:"confirmed",
    };
   
    dispatch(editBlog({id,body})).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been confirmed ");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const refuseBlogFun = async (e) => {
    e.preventDefault();

    let id = blogId;
    let body = {
      confirm:"refused",
    };
    dispatch(editBlog({id,body})).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been refused");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };
  return (
    <div class="container" >
      <h5> {blog?.category.nameEn}</h5>
      <div class="card mb-3" style={{ width: 1000 }}>
        <div class="row g-0">
          <div class="col-md-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {blog?.cover ? (
                <img
                  class="img-fluid rounded-start"
                  src={blog?.cover.path}
                  alt={blog?.cover.alt}
                  style={{ height: 300, width: 500 }}
                />
              ) : (
                <img
                  class="img-fluid rounded-start"
                  src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
                  alt="cover"
                />
              )}
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title"> {blog?.title}</h5>
              <p class="card-text">{extractTextFromHTML(blog?.content)}.</p>
              <p class="card-text">
                <small class="text-muted">{blog?.articleCategory}</small>
              </p>
            </div>
            <div
              className="form-group"
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <button
                type="button"
                class="btn btn-success mb-2"
                style={{ marginLeft: "10px" }}
                onClick={acceptBlogFun}
              >
                Accept
              </button>
              <button
                type="button"
                class="btn btn-danger mb-2"
                style={{ marginLeft: "20px" }}
                onClick={refuseBlogFun}
              >
                Refuse{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBlog;
