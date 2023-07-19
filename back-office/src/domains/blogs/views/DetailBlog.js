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
    let id = blogId;
    let body = {
      confirm: "refused",
      reason: reason,
    };
    dispatch(editBlogDecision({ id, body })).then((res) => {
      if (!res.error) {
        showSuccessToast("Blog has been refused");
        navigate(-1)
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const [basicModalDelete, setBasicModalDelete] = useState(false);

  const toggleShowDelete = () => {
    setBasicModalDelete(!basicModalDelete);
  };

  return (
    <div className="container">
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
          refuseBlogFun();
        }}
      />
      <h5> {blog?.category.nameEn}</h5>
      <div className="card mb-3" style={{ width: 1000 }}>
        <div className="row g-0">
          <div className="col-md-4">
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
                  className="img-fluid rounded-start"
                  src={blog?.cover.path}
                  alt={blog?.cover.alt}
                  style={{ height: 300, width: 500 }}
                />
              ) : (
                <img
                  className="img-fluid rounded-start"
                  src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
                  alt="cover"
                />
              )}
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title"> {blog?.title}</h5>
              <p className="card-text">{extractTextFromHTML(blog?.content)}.</p>
              <p className="card-text">
                <small className="text-muted">{blog?.articleCategory}</small>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBlog;
