import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import blogs, { fetchBlog, editBlogDecision } from "../../../store/blogs";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import DeleteModal from "../../../components/Commun/Modal";

function DetailBlog() {
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const blog = useSelector((state) => state?.blogs?.blog);
  
  
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
    }, [dispatch, blogId]);
    
    const toggleShowDelete = () => {
      setBasicModalDelete(!basicModalDelete);
    };

    const acceptBlogFun = async (e) => {
      e.preventDefault();

    let id = blogId;
    let body = {
      confirm: "confirmed",
    };

    dispatch(editBlogDecision({ id, body })).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog decision has been accepted");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const refuseBlogFun = async (e) => {

    if (!reason) {
      showErrorToast("Please provide a reason for refusal.");
      return;
    }

    let id = blogId;
    let body = {
      confirm: "refused",
      reason: reason,
    };
    dispatch(editBlogDecision({ id, body })).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been refused");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  return (
    <div className="container">
      <div className="card mb-3" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center">
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
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "50px",
                }}
              >
                {blog.author.fullNameEn}
              </p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#a9a9a9",
                  fontWeight: "500",
                  marginBottom: "1rem",
                }}
              >
                Published {blog.createdAt}
              </p>
              <h1
                style={{
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                {blog.title}
              </h1>
              <div className="categoryInfo" style={{ marginBottom: "1rem" }}>
                <span className="categoryLabel">Category:</span>
                <span className="chip">{blog.category.nameEn}</span>
              </div>
              {blog.cover ? (
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
                <span dangerouslySetInnerHTML={{ __html: blog.content }}></span>
              </p>
            </div>
            {blog?.confirm === "pending" && (
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
                  className="btn btn-success mb-2"
                  style={{ marginLeft: "10px" }}
                  onClick={acceptBlogFun}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="btn btn-danger mb-2"
                  style={{ marginLeft: "20px" }}
                  onClick={toggleShowDelete}
                >
                  Refuse
                </button>
              </div>
            )}
                  {blog?.confirm === "refused" && (
        <p style={{ alignSelf: "flex-end", margin: "20px 0", color: "red" }}>
          Reason for Refusal: {blog?.reason}
        </p>
      )}
          </div>
        </div>
      </div>

      <DeleteModal
        toggleShow={toggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={!true}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            <div className="form-group">
              <label htmlFor="reason">Reason for Refusal</label>
              <input
                type="text"
                className="form-control"
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </div>
        }
        confirm={() => {
          refuseBlogFun()
        }}
      />
    </div>
  );
}

export default DetailBlog;
