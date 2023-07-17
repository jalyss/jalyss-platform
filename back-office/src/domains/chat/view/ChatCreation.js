import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import { createCategory,fetchCategories } from "../../../store/category";
import { useNavigate } from "react-router-dom";

function CreateChat() {
  const [nameAr, setNameAr] = useState();
  const [nameEn, setNameEn] = useState();

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { t, i18n } = useTranslation()

  const handleSubmit = () => {
    const names = {
      nameAr:nameAr,
      nameEn:nameEn
    }
    let aux = Object.assign({}, names);
    dispatch(createCategory(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(("category created"));
        dispatch(fetchCategories());
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
                onChange={(e)=>setNameAr(e.target.value)}
                placeholder="NameAr"
              />
            </div>
            <div class="form-group col-6 mt-3">
              <label>NameEn</label>
              <input
                type="text"
                class="form-control"
                onChange={(e)=>setNameEn(e.target.value)}
                placeholder="NameEn"
              />
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="confirm-button mt-5   mb-3"
            >
              <span className="label-btn"> Add Category </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateChat;
