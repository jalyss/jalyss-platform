import React, { useEffect, useState } from "react";
// import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import "../../../assets/styles/signup.css";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../../store/article";
import { fetchAuthors } from "../../../store/author";
import { fetchArticleTypes } from "../../../store/articleType";
import { fetchPublishingHouses } from "../../../store/publishingHouse";
import { fetchCategories } from "../../../store/category";
import { fetchBranches } from "../../../store/branche";
import { uploadFileAxios } from "../../../helpers/uploadFileAxios";

function CreateArticle() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [article, setArticle] = useState({});
  const [cover, setCover] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  const authorStore = useSelector((state) => state.author);
  const articleTypeStore = useSelector((state) => state.articleType);
  const publishingHouseStore = useSelector((state) => state.publishingHouse);
  const categoryStore = useSelector((state) => state.category);
  const branchStore = useSelector((state) => state.branche);

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchArticleTypes());
    dispatch(fetchPublishingHouses());
    dispatch(fetchCategories());
    dispatch(fetchBranches());
  }, [dispatch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((Article) => ({
      ...Article,
      [name]: ["weight", "pageNumber"].includes(name)
        ? +value
        : name === "authorIds"
        ? [value]
        : value,
    }));
  };

  const submitCreate = async (event) => {
    event.preventDefault();
    let aux = Object.assign({}, article);
    if (cover !== null) {
      const image = new FormData();
      image.append("file", cover);
      const response = await uploadFileAxios(image, setProgress);
      console.log(response);
      aux.coverId = response.data.id;
    }
    dispatch(createArticle(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(t("article.created"));
        navigate(-1);
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // const reader = new FileReader()
    // if (file) {
    //   reader.readAsDataURL(file)
    // }
    // reader.onloadend = () => {
    //   setPreview(reader.result)
    // }
    setPreview(URL.createObjectURL(file));
    setCover(file);
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Add Article</h2>
      <form className="checkout-form" onSubmit={submitCreate}>
        <div className="d-flex flex-wrap">
          <div className="position-relative m-3">
            <label id="image">Image</label>
            <div class="image-upload">
              <img
                src={
                  preview
                    ? preview
                    : "http://tsr-industrie.fr/wp-content/uploads/2016/04/ef3-placeholder-image.jpg"
                }
                alt=""
              />
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {preview && (
              <button
                type="button"
                class="delete-button"
                onClick={() => {
                  setPreview(null);
                  setCover(null);
                }}
              >
                X
              </button>
            )}
          </div>
          <div className=" m-3">
            <div class="row">
              <div class="col mb-3 ">
                <label for="title">
                  Title<span style={{ color: "red" }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  name="title"
                  id="title"
                  value={article?.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="weight">
                  Weight<span style={{ color: "red" }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  id="weight"
                  name="weight"
                  type="number"
                  value={article?.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="pageNumber">
                  Page Number<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  class="form-control mt-2"
                  type="number"
                  id="pageNumber"
                  name="pageNumber"
                  value={article?.pageNumber}
                  onChange={handleChange}
                />
              </div>
              <div class="col mb-3 ">
                <label for="code">
                  Code<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  class="form-control mt-2"
                  id="code"
                  name="code"
                  value={article?.code}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3 ">
                <label for="shortDescriptionEn">Short Description</label>
                <div className=" d-flex  ">
                  <textarea
                    rows={4}
                    cols={60}
                    value={article?.shortDescriptionEn}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    required
                    className="form-control"
                    id="shortDescriptionEn"
                    name="shortDescriptionEn"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col mb-3 ">
                <label for="longDescriptionEn">Long Description</label>
                <div className=" d-flex  ">
                  <textarea
                    rows={4}
                    cols={60}
                    required
                    class="form-control mt-2"
                    id="longDescriptionEn"
                    name="longDescriptionEn"
                    value={article?.longDescriptionEn}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col mb-3 ">
                <label for="category">Category</label>
                <select
                  name="categoryId"
                  class="form-control mt-2"
                  id="category"
                  value={article?.categoryId}
                  onChange={handleChange}
                >
                  <option value={null}>--select option--</option>
                  {categoryStore.categories.items.map((item) => (
                    <option value={item.id}>{item.nameAr}</option>
                  ))}
                </select>
              </div>
              <div class="col mb-3 ">
                <label for="publishingHouse">publishing House</label>
                <select
                  name="publishingHouseId"
                  class="form-control mt-2"
                  id="publishingHouse"
                  value={article?.publishingHouseId}
                  onChange={handleChange}
                >
                  <option value={null}>--select option--</option>
                  {publishingHouseStore.publishingHouses.items.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="type"> Type</label>
                <select
                  name="typeId"
                  class="form-control mt-2"
                  id="type"
                  value={article?.typeId}
                  onChange={handleChange}
                >
                  <option value={null}>--select option--</option>
                  {articleTypeStore.articleTypes.items.map((item) => (
                    <option value={item.id}>{item.nameAr}</option>
                  ))}
                </select>
              </div>
              <div class="col mb-3 ">
                <label for="branch">Branch</label>
                <select
                  name="branchId"
                  class="form-control mt-2"
                  id="branch"
                  value={article?.ArticleByBranch?.branchId}
                  onChange={handleChange}
                >
                  <option value={null}>--select option--</option>
                  {branchStore.branches.items.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="author">
                  Author<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="authorIds"
                  class="form-control mt-2"
                  id="author"
                  value={article?.ArticleByAuthor?.authorId}
                  onChange={handleChange}
                >
                  <option value={null}>--select option--</option>
                  {authorStore.authors.items.map((item) => (
                    <option value={item.id}>{item.nameAr}</option>
                  ))}
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 "></div>
            </div>
          </div>
        </div>
        {progress && <ProgressBar now={progress} label={`${progress}%`} />}
        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onSubmit={submitCreate}
          >
            <span className="label-btn">Create Article</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateArticle;
