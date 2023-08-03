import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, CardContent, CardMedia, TextField } from "@mui/material";
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
    <Box sx={{ maxWidth: "100%",height: "100%", margin: "auto" }}>
       <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              height: "100%",
            }}
          >
            <Box sx={{ flexBasis: "45%", my: 3,ml:5 }}>
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
              />
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
              />
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
              />
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
            </Box>

           
          </Box>
        </CardContent>
      
       
      
    </Box>
  );
}

export default DetailAritcle;
