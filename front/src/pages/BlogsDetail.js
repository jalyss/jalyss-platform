
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlog } from "../store/blog";
import { useSelector } from "react-redux";
import { fetchBlogs } from "../store/blog";
import { CircleDashed } from 'phosphor-react';
import { createBookmark } from "../store/bookmarks";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();

 
  const me = useSelector((state) => state.auth.me);
  const blogStore = useSelector((state) => state.blog);
  const { blogs } = blogStore;
  const { blog } = blogStore;
  useEffect(() => {
    dispatch(fetchBlog(blogId));
  }, [dispatch]);
  let take = 5;
  let skip = 0;
  const authorId = blog?.authorId;

  useEffect(() => {
    dispatch(fetchBlogs({ take, skip, authorId }));
  }, [dispatch, authorId, take, skip]);
  console.log("blooooo", blog);
  console.log("aloo", blogs);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateBookmarkOne = (blogId) => {
    let body = {
      blogId,
      userId:me.id,
    };
    dispatch(createBookmark(body)).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been saved");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  if (!blog) {
    
    return <div>Loading...</div>;
  }
  return (
    <div className="d-flex">
      <div
        className="d-flex flex-column  "
        style={{
          margin: "30px",
          flex: "1",
          paddingRight: "20px",
          borderRight: "1px dashed #ccc",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="goBackLink" onClick={() => navigate(-1)}>
            <span> &#8592;</span> <span>Go Back</span>
          </div>
          <div className="bookMarkIcon" onClick={()=>{handleCreateBookmarkOne(blog.id)}}>
            <span>&#x1F516;</span>
          </div>
        </div>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div className="d-flex flex-column align-items-center">
            <p
              style={{
                fontSize: " 0.8rem",
                color: "#a9a9a9",
                fontWeight: " 500",
              }}
            >
              Published {blog.createdAt}
            </p>

            <h1 style={{ whiteSpace: "pre-line", textAlign: "center" }}>
              {blog.title}
            </h1>

            <div className="categoryInfo">
              <span className="categoryLabel">Category:</span>
              <span className="chip">{blog.category.nameEn}</span>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ margin: "0.5rem" }}
            >
              {blog.author.avatar ? (
                <img
                  className="blogItemAuthorAvatar"
                  src={blog.author.avatar?.path}
                  alt="avatar"
                />
              ) : (
                <img
                  className="blogItemAuthorAvatar"
                  src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
                  alt="avatar"
                />
              )}
              <h3 style={{ fontSize: "1.2rem", color: "#333" }}>
                {blog.author.fullNameEn}
              </h3>
            </div>
          </div>
          {blog.cover   ? (
            <img
              style={{ width: "100%", borderRadius: "15px" }}
              src={blog.cover?.path}
              alt="cover"
            />
          ) : (
            <img
              style={{ width: "100%", borderRadius: "15px" }}
              src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
              alt="cover"
            />
          )}

          <p style={{ padding: "1rem", marginTop: "1.5rem" }}>
            {" "}
            <span dangerouslySetInnerHTML={{ __html: blog.content }}></span>
          </p>
        </div>
      </div>

      <div style={{ width: "300px", marginTop: "15px" }}>
        {blog.author.avatar ? (
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
            className="blogItemAuthorAvatar"
            src={blog.author.avatar?.path}
            alt="avatar"
          />
        ) : (
          <img
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
            className="blogItemAuthorAvatar"
            src="https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
            alt="avatar"
          />
        )}
        <p style={{fontSize:"1.2rem",fontWeight:"bold",marginBottom:"50px"}}>{blog.authorName}</p>
        <h2 className="moreFromAuthor">More from {blog.author.fullNameEn}</h2>
        <div style={{marginTop:"10px"}}>
          {blogs.items.map((blog) => (
            <div className="d-flex align-items-center" style={{cursor:"pointer",marginTop:"20px"}}
              key={blog.id}
              // onClick={() => handleBlogSelection(blog)}
            >
              <h6  className="sideBlogTitle">
                {blog.title}
                <br />
                <span className="spanBlog">Category: </span> <small>{blog.category.nameEn}</small>
              </h6 >
              {blog.cover ? (
                <img  className="sideBlogImage"  src={blog.cover?.path} alt="cover" />
              ) : (
                <img
                className="sideBlogImage"
                  src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
                  alt="cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default BlogDetail;
