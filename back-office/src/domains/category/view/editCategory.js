import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import { fetchCategory, updateCategory } from "../../../store/category";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import EditModal from "../../../components/Commun/Modal";

function EditCategory() {
  const [renderEditView, setRenderEditView] = useState(false);
  const category = useSelector((state) => state.category.category);
  const [editCategoryData, seteditCategoryData] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, []);

  useEffect(() => {
    seteditCategoryData({ ...category });
  }, [category]);

  const toggleShow = () => {
    setRenderEditView(!renderEditView);
  };

  const handleSubmit = () => {
    const names = {
      ...editCategoryData,
    };
    let aux = Object.assign({}, names);
    dispatch(updateCategory(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast("Category Edited successful");
        Navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const toggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
  };
  const onCanceltoggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
    setRenderEditView(false);
  };
  return (
    <div className="container">
      <div className="card">
        <div className="container">
          {!renderEditView ? (
            <div
              class="row"
              style={{ marginBottom: "10px", marginTop: "50px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
                      fontSize: "large",
                      paddingRight: "40px",
                    }}
                  >
                    Name (Ar) :
                  </span>
                  <span style={{ display: "table-cell" }}>
                    {category?.nameAr}
                  </span>
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
                      fontSize: "large",
                      paddingRight: "40px",
                    }}
                  >
                    Name (En):
                  </span>
                  <span style={{ display: "table-cell" }}>
                    {category?.nameEn}
                  </span>
                </Typography>
              </div>
              <div className="w-100 d-flex justify-content-center">
                <button
                  type="submit"
                  onClick={() => toggleShow()}
                  className="confirm-button mt-5   mb-3"
                >
                  <span className="label-btn"> Edit Category </span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div class="row">
                <div class="form-group col-6 mt-3">
                  <label>NameAr</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="name"
                    value={editCategoryData?.nameAr || ""}
                    onChange={(e) => {
                      seteditCategoryData({
                        ...editCategoryData,
                        nameAr: e.target.value,
                      });
                    }}
                  />
                </div>
                <div class="form-group col-6 mt-3">
                  <label>NameEn</label>
                  <input
                    placeholder={category?.nameEn}
                    type="text"
                    class="form-control"
                    value={editCategoryData?.nameEn || ""}
                    onChange={(e) => {
                      seteditCategoryData({
                        ...editCategoryData,
                        nameEn: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
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
          <div className="d-flex justify-content-center align-items-center">
            Are you sure !
          </div>
        }
        body={
          <div className="d-flex justify-content-center align-items-center">
            You want to edit this category ?
          </div>
        }
        fn={() => {
          handleSubmit();
        }}
      />
    </div>
  );
}

export default EditCategory;
