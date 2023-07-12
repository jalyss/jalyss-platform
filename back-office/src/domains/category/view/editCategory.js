import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import { fetchCategory, updateCategory } from "../../../store/category";
import { useNavigate, useParams } from "react-router-dom";

function EditCategory() {
  const [nameAr, setNameAr] = useState();
  const [nameEn, setNameEn] = useState();

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();

  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, []);

  const handleSubmit = () => {
    const names = {
      id: id,
      nameAr: nameAr,
      nameEn: nameEn,
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

  return (
    <div className="container">
      <div className="card">
        <div className="container">
          <div class="row">
            <div class="form-group col-6 mt-3">
              <label>NameAr</label>
              <input
                type="text"
                class="form-control"
                placeholder={category?.nameAr}
                onChange={(e) => setNameAr(e.target.value)}
              />
            </div>
            <div class="form-group col-6 mt-3">
              <label>NameEn</label>
              <input
                placeholder={category?.nameEn}
                type="text"
                class="form-control"
                onChange={(e) => setNameEn(e.target.value)}
              />
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="confirm-button mt-5   mb-3"
            >
              <span className="label-btn"> Edit Category </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
