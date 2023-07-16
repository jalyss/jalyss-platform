import React, { useEffect, useState } from "react";
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

import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import "../../../assets/styles/signup.css";

function CreateArticle() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [article, setArticle] = useState({});
  const [cover, setCover] = useState(null);
  const [progress, setProgress] = useState(null);
  
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
      [name]: ["weight", "pageNumber"].includes(name) ? +value : value,
    }));
  };

  const submitCreate = async (event) => {
    event.preventDefault();
    let aux = { ...article };
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
    setPreview(URL.createObjectURL(file));
    setCover(file);
  };

    return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Add Article</h2>
      <form className="checkout-form" onSubmit={submitCreate}>
        <div className="d-flex flex-wrap">
          <div className="position-relative m-3">
            <InputLabel htmlFor="image">Image</InputLabel>
            <div className="image-upload">
              <img
                src={
                  preview
                    ? preview
                    : "http://tsr-industrie.fr/wp-content/uploads/2016/04/ef3-placeholder-image.jpg"
                }
                alt=""
              />
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {preview && (
              <Button
                variant="outlined"
                className="delete-button"
                onClick={() => {
                  setPreview(null);
                  setCover(null);
                }}
              >
                X
              </Button>
            )}
          </div>
          <div className=" m-3">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  multiline
                  name="title"
                  label="Title"
                  value={article?.title || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  multiline
                  type="number"
                  name="weight"
                  label="Weight"
                  value={article?.weight || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  multiline
                  type="number"
                  name="pageNumber"
                  label="Page Number"
                  value={article?.pageNumber || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  multiline
                  name="code"
                  label="Code"
                  value={article?.code || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  required
                  name="shortDescriptionEn"
                  label="Short Description"
                  rows={4}
                  value={article?.shortDescriptionEn || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  required
                  name="longDescriptionEn"
                  label="Long Description"
                  rows={4}
                  value={article?.longDescriptionEn || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required >
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                 
                
                   
                    labelId="category"
                    name="categoryId"
                    value={article?.categoryId || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {categoryStore.categories.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="publishingHouse">Publishing House</InputLabel>
                  <Select
                  
                 
                    labelId="publishingHouse"
                    name="publishingHouseId"
                    value={article?.publishingHouseId || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {publishingHouseStore.publishingHouses.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="type">Type</InputLabel>
                  <Select
                  
                 
                    labelId="type"
                    name="typeId"
                    value={article?.typeId || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {articleTypeStore.articleTypes.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="branch">Branch</InputLabel>
                  <Select
                  
                  
                    labelId="branch"
                    name="branchId"
                    value={article?.ArticleByBranch?.branchId || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {branchStore.branches.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="author">Author</InputLabel>
                  <Select
                  
                  
                    labelId="author"
                    name="authorIds"
                    value={article?.ArticleByAuthor?.authorId || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value={null}>--select option--</MenuItem>
                    {authorStore.authors.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </div>
        {progress && (
          <ProgressBar now={progress} label={`${progress}%`} />
        )}
        <div className="w-100 d-flex justify-content-center">
          <Button
            type="submit"
            className="confirm-button mt-3"
            onSubmit={submitCreate}
            variant="contained"
          >
            Create Article
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateArticle;
