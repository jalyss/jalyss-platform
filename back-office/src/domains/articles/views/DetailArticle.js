import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, CardContent, CardMedia, TextField, Box } from "@mui/material";
import { fetchArticle } from "../../../store/article";

function DetailAritcle() {
  const { articleId } = useParams();
  const dispatch = useDispatch();

  const article = useSelector((state) => state.article.article);

  useEffect(() => {
    dispatch(fetchArticle(articleId));
  }, [dispatch, articleId]);
  console.log("=>>>>>",article)
  return (
    <Box sx={{ maxWidth: "100%", height: "100%", margin: "auto" }}>
    <CardContent>
      <Grid container spacing={2}>
    
      <Grid container justifyContent="center">
  <Grid item xs={12} sm={6}>
    <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem" }}>
    {article?.cover ? (
      <img
        style={{ width: "120%", borderRadius: "15px" }}
        src={article?.cover?.path}
        alt="cover"
      />
      ) : (
        <img
          style={{ width: "120%", borderRadius: "15px" }}
          src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
          alt="cover"
        />
      )}
    </div>
  </Grid>
</Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="title"
                value={article?.title}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2",
                  }, 
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#8a2be2",  
                  },
                
                }}
              /></Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                label="weight"
                value={article?.weight}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              /></Grid>
              <Grid item xs={12} sm={6}>

              <TextField
                label="pageNumber"
                value={article?.pageNumber}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              /></Grid>
            <Grid item xs={12} sm={6}>

               <TextField
                label="code"
                value={article?.code}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="shortDescriptionEn"
                value={article?.shortDescriptionEn}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                label="shortDescriptionAr"
                value={article?.shortDescriptionAr}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="longDescriptionEn"
                value={article?.longDescriptionEn}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="longDescriptionAr"
                value={article?.longDescriptionAr}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                value={article?.category?.nameEn}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="PublishingHouse"
                value={article?.publishingHouse?.name}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                value={article?.type?.nameEn}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                label="Author"
                value={article?.authorIds}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
            </Grid>

           
        </Grid>
      </CardContent>
    </Box>
  );
}

export default DetailAritcle;
