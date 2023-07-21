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
  const [weight, setWeight] = useState(
    articleStore?.weight
  );
  const [pageNumber, setPageNumber] = useState(
    articleStore?.pageNumber
  );
  const [shortDescriptionAr, setShortDescriptionAr] = useState(articleStore?.shortDescriptionAr);
  const [longDescriptionAr, setLongDescriptionAr] = useState(articleStore?.longDescriptionAr);
  const [categoryId, setCategoryId] = useState(articleStore?.categoryId);
  const [publishingHouseId, setPublishingHouseId] = useState(articleStore?.publishingHouseId);
  const [typeId, setTypeId] = useState(articleStore?.typeId);
  const [authorIds, setauthorIds] = useState(articleStore?.authorIds);

  const [coverId, setCoverId] = useState(null);

  useEffect(() => {
    dispatch(fetchArticle(articleId));
  }, [dispatch, articleId]);

  useEffect(() => {
    if (articleStore && articleStore.article) {
      const { name, accountBalance, email, tel, address } =
        articleStore.article;

      setName(name);
      setAccountBalance(accountBalance.toString());
      setEmail(email);
      setTel(tel);
      setAddress(address);
    }
  }, [articleStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name,
      accountBalance: Number(accountBalance),
      email,
      tel,
      address,
    };

    try {
      if (logo) {
        const formData = new FormData();
        formData.append("file", logo);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.logoId = response.data.id;
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
          label="Name"
      
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Account Balance"
        
          variant="outlined"
          fullWidth
          type="number"
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Telephone Number"
          variant="outlined"
          fullWidth
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
        <Box my={2}>
          <input
            type="file"
            accept="image/*"
            id="logo-file"
            style={{ display: "none" }}
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <label htmlFor="logo-file">
            <Button variant="outlined" component="span">
              Upload Logo
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
