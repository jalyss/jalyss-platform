import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchauthor ,editAuthor} from "../../../store/author";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import EditModal from "../../../components/Commun/Modal";

function DetailAuthor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authorId } = useParams();
  const authorStore = useSelector((state) => state.author.author);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [authorData, setAuthorData] = useState();
  const [renderEditMode, setrenderEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchauthor(authorId));
  }, [authorId, dispatch]);

  useEffect(() => {
    setAuthorData({ ...authorStore });
  }, [authorStore]);

  const submitAuth = async () => {
    let aut = { ...authorData };
    dispatch(editAuthor(aut)).then((res) => {
      if (!res.error) {
        showSuccessToast("author created successfully");
        navigate(-1)
      } else {
        showErrorToast(res.error.message);
      }
    });
  };
  const toggleShow = () => {
    setrenderEditMode(!renderEditMode);
  };
  const toggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
  };
  const onCanceltoggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
    setrenderEditMode(false);
  };
  return (
    <div className="container">
      <div className="card">
        <div className="container">
          {!renderEditMode ? (
            <>
              <div className="row mt-4">
                <div className="col-2 mb-4">
                  <h6>Name AR :</h6>
                </div>
                <div className="col-6">
                  <p>{authorData?.nameAr}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-2 mb-4">
                  <h6>biography AR :</h6>
                </div>
                <div className="col-6">
                  <p>{authorData?.biographyAr}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-2 mb-4">
                  <h6>Name EN :</h6>
                </div>
                <div className="col-6">
                  <p>{authorData?.nameEn}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-2 mb-4">
                  <h6>biography EN:</h6>
                </div>
                <div className="col-6">
                  <p>{authorData?.biographyEn}</p>
                </div>
              </div>
              <div className="w-100 d-flex justify-content-center mt-4 ">
                <button
                  type="submit"
                  onClick={() => toggleShow()}
                  className="confirm-button mt-4 mb-3"
                >
                  <span className="label-btn"> Edit Author </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Typography
                style={{
                  fontFamily: "Arial",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#333",
                  display: "table-row",
                }}
 
              >
                <span
                  style={{
                    display: "table-cell",
                    paddingRight: "40px",

                  }}
                >
                  Edit Name (Ar) :
                </span>
                <div class="form-group col-7 mt-3">
                  <input
                    type="text"
                    class="form-control"
                    style={{width:"250px"}}
                    placeholder="name"
                    value={authorData?.nameAr || ""}
                    onChange={(e) => {
                      setAuthorData({
                        ...authorData,
                        nameAr: e.target.value,
                      });
                    }}
                  />
                </div>
              </Typography>
              <Typography
                style={{
                  fontFamily: "Arial",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#333",
                  display: "table-row",
                }}
              >
                <span
                  style={{
                    display: "table-cell",
                    paddingRight: "40px",
                  }}
                >
                  Biography (Ar) :
                </span>
                <div class="form-group col-7 mt-3">
                  <input
                    type="text"
                    style={{width:"250px"}}
                    class="form-control"
                    placeholder="biographyAr"
                    value={authorData?.biographyAr || ""}
                    onChange={(e) => {
                      setAuthorData({
                        ...authorData,
                        biographyAr: e.target.value,
                      });
                    }}
                  />
                </div>
              </Typography>
              <Typography
                style={{
                  fontFamily: "Arial",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#333",
                  display: "table-row",
                }}
              >
                <span
                  style={{
                    display: "table-cell",
                    paddingRight: "40px",
                  }}
                >
                  Edit Name (En) :
                </span>
                <div class="form-group col-7 mt-3">
                  <input
                    type="text"
                    class="form-control"
                    style={{width:"250px"}}
                    placeholder="name"
                    value={authorData?.nameEn || ""}
                    onChange={(e) => {
                      setAuthorData({
                        ...authorData,
                        nameEn: e.target.value,
                      });
                    }}
                  />
                </div>
              </Typography>
              <Typography
                style={{
                  fontFamily: "Arial",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#333",
                  display: "table-row",
                }}
              >
                <span
                  style={{
                    display: "table-cell",
                    paddingRight: "40px",
                  }}
                >
                  Biography (En) :
                </span>
                <div class="form-group col-7 mt-3">
                  <input
                    type="text"
                    class="form-control"
                    style={{width:"250px"}}
                    placeholder="biographyEn"
                    value={authorData?.biographyEn || ""}
                    onChange={(e) => {
                      setAuthorData({
                        ...authorData,
                        biographyEn: e.target.value,
                      });
                    }}
                  />
                </div>
              </Typography>
              <div className="w-100 d-flex justify-content-center">
                <button
                  type="submit"
                  onClick={() => toggleShowDelete()}
                  className="confirm-button mt-5   mb-3"
                >
                  <span className="label-btn"> Save changes </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <EditModal
        toggleShow={onCanceltoggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={true}
        ofDelete={!true}
        title={
          <div style={{width:"200%",marginLeft:"100%"}} className="d-flex justify-content-center align-items-center">
            Are you sure !
          </div>
        }
        body={
          <div className="d-flex justify-content-center align-items-center">
            You want to edit this Author ?
          </div>
        }
        fn={() => {
          submitAuth();
        }}
      />
    </div>
  );
}

export default DetailAuthor;
