import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  Grid,
  Input,
  Box,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@mui/material";
import { updateArticleByBranch, fetchArticle } from "../../../store/article";
import { fetchAuthors } from "../../../store/author";
import { fetchArticleTypes } from "../../../store/articleType";
import { fetchPublishingHouses } from "../../../store/publishingHouse";
import { fetchCategories } from "../../../store/category";
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

  const [title, setTitle] = useState(articleStore?.title);
  const [weight, setWeight] = useState(articleStore?.weight);
  const [pageNumber, setPageNumber] = useState(articleStore?.pageNumber);
  const [code, setCode] = useState(articleStore?.code);
  const [shortDescriptionEn, setShortDescriptionEn] = useState(
    articleStore?.shortDescriptionEn
  );
  const [longDescriptionEn, setLongDescriptionEn] = useState(
    articleStore?.longDescriptionEn
  );
  const [shortDescriptionAr, setShortDescriptionAr] = useState(
    articleStore?.shortDescriptionAr
  );
  const [longDescriptionAr, setLongDescriptionAr] = useState(
    articleStore?.longDescriptionAr
  );
  const [nameEn, setNameEn] = useState(articleStore?.category?.nameEn);
  const [name, setName] = useState(articleStore?.publishingHouse?.name);
  const [typeNameEn, setTypeNameEn] = useState(articleStore?.type?.nameEn);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    dispatch(fetchArticle(articleId));
    dispatch(fetchAuthors());
    dispatch(fetchArticleTypes());
    dispatch(fetchPublishingHouses());
    dispatch(fetchCategories());

  }, [dispatch, articleId]);

  useEffect(() => {
    if (articleStore && articleStore.article) {
      const {
        title,
        weight,
        pageNumber,
        code,
        shortDescriptionEn,
        longDescriptionEn,
        shortDescriptionAr,
        longDescriptionAr,
        nameEn,
        name,
        typeNameEn,
      } = providerStore.provider;
      setTitle(title);
      setWeight(weight.toString());
      setPageNumber(pageNumber.toString());
      setCode(code);
      setShortDescriptionEn(shortDescriptionEn);
      setLongDescriptionEn(longDescriptionEn);
      setShortDescriptionAr(shortDescriptionAr);
      setLongDescriptionAr(longDescriptionAr);
      setNameEn(nameEn);
      setName(name);
      setTypeNameEn(typeNameEn);
    }
  }, [articleStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title,
      weight: Number(weight),
      pageNumber:Number(pageNumber),
      code,
      shortDescriptionEn,
      longDescriptionEn,
      shortDescriptionAr,
      longDescriptionAr,
      categoryId:nameEn,
      publishingHouseId:name,
      typeId:typeNameEn,
    };

    try {
      if (cover !== null) {
        const formData = new FormData();
        formData.append("file", cover);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.coverId = response.data.id;
      }

      const editedArticle = {  articleId,...body };
      dispatch(updateArticleByBranch(editedArticle));
      showSuccessToast("article edited successfully");
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
                value={title }
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
                name="weight"
                value={weight}
               onChange={(e) => setWeight(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="page Number"
                variant="outlined"
                fullWidth
                name="pageNumber"
                value={pageNumber }
               onChange={(e) => setPageNumber(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="code"
                variant="outlined"
                fullWidth
                name="code"
                value={code }
               onChange={(e) => setCode(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Short Description"
                variant="outlined"
                fullWidth
                name="shortDescriptionEn"
                value={shortDescriptionEn}
               onChange={(e) => setShortDescriptionEn(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Short Description in Arabic"
                variant="outlined"
                fullWidth
                name="shortDescriptionAr"
                value={shortDescriptionAr}
               onChange={(e) => setShortDescriptionAr(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Long Description "
                variant="outlined"
                fullWidth
                name="longDescriptionEn"
                value={longDescriptionEn}
               onChange={(e) => setLongDescriptionEn(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Long Description in Arabic"
                variant="outlined"
                fullWidth
                name="longDescriptionAr"
                value={longDescriptionAr}
               onChange={(e) => setLongDescriptionAr(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  name="category"
                  value={nameEn }
                 onChange={(e) => setNameEn(e.target.value)}
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
              <FormControl fullWidth>
                <InputLabel id="publishingHouse">Publishing House</InputLabel>
                <Select
                  labelId="publishingHouse"
                  name="publishingHouse"
                  value={name }
                 onChange={(e) => setName(e.target.value)}
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
              <FormControl fullWidth>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  name="type"
                  value={typeNameEn}
                 onChange={(e) => setTypeNameEn(e.target.value)}
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
           
           
          </Grid>
        </div>
        <Box my={2}>
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
        </Box>
        <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Update Provider
          </Button>
          </Box>
      </form>
    </div>
  );
}

export default EditArticle;
