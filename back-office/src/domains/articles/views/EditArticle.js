import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@mui/material";
import {
  updateArticleByBranch,
  fetchArticle,
  
} from "../../../store/article";
import { fetchAuthors } from "../../../store/author";
import { fetchArticleTypes } from "../../../store/articleType";
import { fetchPublishingHouses } from "../../../store/publishingHouse";
import { fetchCategories } from "../../../store/category";
import { fetchBranches } from "../../../store/branche";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function EditArticle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articleId } = useParams();

  const articleStore = useSelector((state) => state.article.article);
  const authorStore = useSelector((state) => state.author);
  const articleTypeStore = useSelector((state) => state.articleType);
  const publishingHouseStore = useSelector((state) => state.publishingHouse);
  const categoryStore = useSelector((state) => state.category);
  const branchStore = useSelector((state) => state.branch);

  const [article, setArticle] = useState({});
  const [cover, setCover] = useState(null);

  useEffect(() => {
    dispatch(fetchArticle(articleId));
    dispatch(fetchAuthors());
    dispatch(fetchArticleTypes());
    dispatch(fetchPublishingHouses());
    dispatch(fetchCategories());
    dispatch(fetchBranches());
  }, [dispatch, articleId]);

  useEffect(() => {
    if (articleStore && articleStore.article) {
      setArticle(articleStore.article);
    }
  }, [articleStore]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
  };

  const handleCoverChange = (event) => {
    setCover(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (cover) {
        const formData = new FormData();
        formData.append("file", cover);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        article.coverId = response.data.id;
      }

      const editedArticle = { ...article, articleId };
      dispatch(updateArticleByBranch(editedArticle));
      showSuccessToast("Article edited successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error editing article:", error);
      showErrorToast(error.message);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Edit Article</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                value={article.title || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Balance"
                variant="outlined"
                fullWidth
                type="number"
                name="weight"
                value={article.weight || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Short Description (Arabic)"
                variant="outlined"
                fullWidth
                name="shortDescriptionAr"
                value={article.shortDescriptionAr || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Long Description (Arabic)"
                variant="outlined"
                fullWidth
                name="longDescriptionAr"
                value={article.longDescriptionAr || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  name="category"
                  value={article.category || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="">--select option--</MenuItem>
                  {categoryStore.categories.items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nameAr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <InputLabel id="publishingHouse">Publishing House</InputLabel>
                <Select
                  labelId="publishingHouse"
                  name="publishingHouse"
                  value={article.publishingHouse || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="">--select option--</MenuItem>
                  {publishingHouseStore.publishingHouses.items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  name="type"
                  value={article.type || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="">--select option--</MenuItem>
                  {articleTypeStore.articleTypes.items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nameAr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <InputLabel id="author">Author</InputLabel>
                <Select
                  labelId="author"
                  name="author"
                  multiple
                  value={article.author || []}
                  onChange={handleChange}
                >
                  <MenuItem value="">--select option--</MenuItem>
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
        <div className="w-100 d-flex justify-content-center">
          <input
            type="file"
            accept="image/*"
            id="cover-file"
            style={{ display: "none" }}
            onChange={handleCoverChange}
          />
          <label htmlFor="cover-file">
            <Button variant="outlined" component="span">
              Upload Cover
            </Button>
          </label>
          <Button
            type="submit"
            className="confirm-button mt-3"
            variant="contained"
          >
            Update Article
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditArticle;
