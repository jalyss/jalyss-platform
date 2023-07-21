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
  Box, Button, Container, TextField, Typography } from "@mui/material";
import { updateArticleByBranch, fetchArticle } from "../../../store/article";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { fetchAuthors } from "../../../store/author";
import { fetchArticleTypes } from "../../../store/articleType";
import { fetchPublishingHouses } from "../../../store/publishingHouse";
import { fetchCategories } from "../../../store/category";
import { fetchBranches } from "../../../store/branche";
function EditArticle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articleId } = useParams();
  const articleStore = useSelector((state) => state.article.article);
  const authorStore = useSelector((state) => state.author);
  const articleTypeStore = useSelector((state) => state.articleType);
  const publishingHouseStore = useSelector((state) => state.publishingHouse);
  const categoryStore = useSelector((state) => state.category);
  const branchStore = useSelector((state) => state.branche);
  const [title, setTitle] = useState(articleStore?.title);
  const [weight, setWeight] = useState(articleStore?.weight);
  const [pageNumber, setPageNumber] = useState(articleStore?.pageNumber);
  const [code, setCode] = useState(articleStore?.code);
  const [shortDescriptionAr, setShortDescriptionAr] = useState(
    articleStore?.shortDescriptionAr
  );
  const [longDescriptionAr, setLongDescriptionAr] = useState(
    articleStore?.longDescriptionAr
  );
  const [category, setCategory] = useState(articleStore?.category);
  const [publishingHouse, setPublishingHouse] = useState(
    articleStore?.publishingHouse
  );
  const [type, setType] = useState(articleStore?.type);
  const [author, setAuthor] = useState(articleStore?.authors);
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
      const {
        title,
        weight,
        pageNumber,
        code,
        shortDescriptionAr,
        longDescriptionAr,
        category,
        publishingHouse,
        type,
        author,
      } = articleStore.article;

      setTitle(title);
      setWeight(weight.toString());
      setPageNumber(pageNumber.toString());
      setCode(code);
      setShortDescriptionAr(shortDescriptionAr);
      setLongDescriptionAr(longDescriptionAr);
      setCategory(category);
      setPublishingHouse(publishingHouse);
      setType(type);
      setAuthor(author);

    }
  }, [articleStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title,
      weight: Number(weight),
      pageNumber: Number(pageNumber),
      code,
      shortDescriptionAr,
      longDescriptionAr,
      category,
      publishingHouse,
      type,
      author,

    };

    try {
      if (cover) {
        const formData = new FormData();
        formData.append("file", cover);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.coverId = response.data.id;
      }

      const editedArticle = { ...body, articleId };
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
    <h2>Add Article</h2>
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="d-flex flex-wrap">
      
  
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        
        <TextField
          label="title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          label="Account Balance"
          variant="outlined"
          fullWidth
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          margin="normal"
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          label="shortDescriptionAr"
          variant="outlined"
          fullWidth
          value={shortDescriptionAr}
          onChange={(e) => setShortDescriptionAr(e.target.value)}
          margin="normal"
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          label="longDescriptionAr"
          variant="outlined"
          fullWidth
          value={longDescriptionAr}
          onChange={(e) => setLongDescriptionAr(e.target.value)}
          margin="normal"
        />
      </Grid>
      
        <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    name="categoryId"
                    value={article?.categoryId || ""}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value={category}>--select option--</MenuItem>
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
                    onChange={(e) => setPublishingHouse(e.target.value)}

                  >
                    <MenuItem value={publishingHouse}>--select option--</MenuItem>
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
                    onChange={(e) => setType(e.target.value)}

                  >
                    
                    <MenuItem value={type}>--select option--</MenuItem>
                    {articleTypeStore.articleTypes.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
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
                    multiple
                    value={article?.authorIds || []}
                    onChange={(e) => setAuthor(e.target.value)}
                    >
                    <MenuItem value={author}>--select option--</MenuItem>
                    {authorStore.authors.items.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameAr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
       
       
          <input
            type="file"
            accept="image/*"
            id="cover-file"
            style={{ display: "none" }}
            onChange={(e) => setCover(e.target.files[0])}
          />
          <label htmlFor="cover-file">
            <Button variant="outlined" component="span">
              Upload cover
            </Button>
          </label>
       
       
        </Grid>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <Button
            type="submit"
            className="confirm-button mt-3"
            onSubmit={handleSubmit}
            variant="contained"
          >
            update Article
          </Button>
        </div>
      </form>
    </div>
   
  );
}

export default EditArticle;
