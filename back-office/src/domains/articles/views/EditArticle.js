import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { updateArticleByBranch, fetchArticle } from "../../../store/article";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function EditArticle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articleId } = useParams();
  const articleStore = useSelector((state) => state.article.article);

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

  const [cover, setCover] = useState(null);

  useEffect(() => {
    dispatch(fetchArticle(articleId));
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
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <Typography variant="h6" align="center" gutterBottom>
          Edit article
        </Typography>
        <TextField
          label="title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Account Balance"
          variant="outlined"
          fullWidth
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          margin="normal"
        />
        <TextField
          label="shortDescriptionAr"
          variant="outlined"
          fullWidth
          value={shortDescriptionAr}
          onChange={(e) => setShortDescriptionAr(e.target.value)}
          margin="normal"
        />
        <TextField
          label="longDescriptionArephone Number"
          variant="outlined"
          fullWidth
          value={longDescriptionAr}
          onChange={(e) => setLongDescriptionAr(e.target.value)}
          margin="normal"
        />
        <TextField
          label="category"
          variant="outlined"
          fullWh
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
        />
        <TextField
          label="publishingHouse"
          variant="outlined"
          fullWh
          value={publishingHouse}
          onChange={(e) => setPublishingHouse(e.target.value)}
          margin="normal"
        />
        <TextField
          label="type"
          variant="outlined"
          fullWh
          value={type}
          onChange={(e) => setType(e.target.value)}
          margin="normal"
        />
        <TextField
          label="author"
          variant="outlined"
          fullWh
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          margin="normal"
        />
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
            Update article
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditArticle;
