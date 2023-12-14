import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  CardContent,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Box,
  Select,
  Button,
  IconButton,
} from "@mui/material";
import { updateArticleByBranch, fetchArticle } from "../../../store/article";
import { fetchAuthors } from "../../../store/author";
import { fetchArticleTypes } from "../../../store/articleType";
import { fetchPublishingHouses } from "../../../store/publishingHouse";
import { fetchCategories } from "../../../store/category";
import EditIcon from "@mui/icons-material/Edit";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { fetchBranches } from "../../../store/branche";

function DetailAritcle() {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState();
  const article = useSelector((state) => state.article.article);
  const branches = useSelector((state) => state.branche.branches.items);
  const categoryStore = useSelector((state) => state.category);
  const publishingHouseStore = useSelector((state) => state.publishingHouse);
  const articleTypeStore = useSelector((state) => state.articleType);
  const [ediMode, setEditMode] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const authorStore = useSelector((state) => state.author);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [columns, setColumns] = useState([]);
  const [rows,setRows]=useState([])
  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchArticleTypes());
    dispatch(fetchPublishingHouses());
    dispatch(fetchCategories());
    dispatch(fetchAuthors());
    dispatch(fetchBranches());
  }, [dispatch, articleId]);

  useEffect(() => {
    dispatch(fetchArticle(articleId));
  }, [dispatch, articleId]);

  useEffect(() => {
    setArticleData({ ...article });
  }, [articleId, dispatch, article]);
  // useEffect(() => {
  //   if(branches)
  //   setColumns(
  //     branches.map((branch) => ({
  //       field: branch.name,
  //       headerName: branch.name,
  //       width: 120,
  //       sortable: false,
  //     }))
  //   );
  // }, [branches]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    const {
      title,
      coverId,
      weight,
      pageNumber,
      code,
      shortDescriptionAr,
      shortDescriptionEn,
      longDescriptionAr,
      longDescriptionEn,
      categoryId,
      publishingHouseId,
      typeId,
      ArticleByAuthor,
    } = articleData;

    const body = {
      title,
      coverId,
      weight,
      pageNumber,
      code,
      shortDescriptionAr,
      shortDescriptionEn,
      longDescriptionAr,
      longDescriptionEn,
      categoryId,
      publishingHouseId,
      typeId,
      authorIds: [ArticleByAuthor[0].authorId],
    };

    try {
      if (selectedFile !== null) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_UPLOAD_ENDPOINT}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
              setTimeout(() => {
                setUploadProgress(0);
              }, 2000);
            },
          }
        );
        body.coverId = response.data.id;
      }

      const editedArticle = { articleId, ...body };
      dispatch(updateArticleByBranch(editedArticle));
      showSuccessToast("article edited successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error editing article:", error);
      showErrorToast(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", height: "100%", margin: "auto" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            container
            className="d-flex justify-content-center align-items-center"
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "cenetr",
                position: "relative",
              }}
            >
              <div className="position-relative">
                <img
                  className="img-fluid mt-1"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : article?.cover?.path ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU"
                  }
                  alt="Card image cap"
                  style={{
                    height: "80%",
                    width: "300px",
                    borderRadius: "8px",
                    filter: "blur(0.5px)",
                  }}
                />

                <div className="position-absolute top-50 start-50 translate-middle">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />

                  {!ediMode && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "62%",
                        transform: "translate(-50%, -50%)",
                        color: "#8a2be2",
                        backgroundColor: "#fff",
                        border: "1px solid #8a2be2",
                        "&:hover": {
                          backgroundColor: "#8a2be2",
                          color: "#fff",
                        },
                      }}
                      onClick={handleButtonClick}
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>
                  )}
                </div>
                <div>
                  {uploadProgress > 0 && (
                    <progress
                      value={uploadProgress}
                      max="100"
                      style={{ width: "300px" }}
                    />
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="title"
              disabled={ediMode}
              value={articleData?.title || ""}
              onChange={(e) => {
                setArticleData({ ...articleData, title: e.target.value });
              }}
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
              disabled={ediMode}
              label="weight"
              value={articleData?.weight || ""}
              onChange={(e) => {
                setArticleData({ ...articleData, weight: +e.target.value });
              }}
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
              label="pageNumber"
              disabled={ediMode}
              value={articleData?.pageNumber || ""}
              onChange={(e) => {
                setArticleData({ ...articleData, pageNumber: +e.target.value });
              }}
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
              label="code"
              value={articleData?.code || ""}
              disabled={ediMode}
              onChange={(e) => {
                setArticleData({ ...articleData, code: e.target.value });
              }}
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
              disabled={ediMode}
              value={articleData?.shortDescriptionEn || ""}
              onChange={(e) => {
                setArticleData({
                  ...articleData,
                  shortDescriptionEn: e.target.value,
                });
              }}
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
              disabled={ediMode}
              value={articleData?.shortDescriptionAr || ""}
              onChange={(e) => {
                setArticleData({
                  ...articleData,
                  shortDescriptionAr: e.target.value,
                });
              }}
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
              disabled={ediMode}
              value={articleData?.longDescriptionEn || ""}
              onChange={(e) => {
                setArticleData({
                  ...articleData,
                  longDescriptionEn: e.target.value,
                });
              }}
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
              disabled={ediMode}
              value={articleData?.longDescriptionAr || ""}
              onChange={(e) => {
                setArticleData({
                  ...articleData,
                  longDescriptionAr: e.target.value,
                });
              }}
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
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                value={articleData?.categoryId || ""}
                onChange={(e) => {
                  setArticleData({
                    ...articleData,
                    categoryId: e.target.value,
                  });
                }}
                disabled={ediMode}
                name="category"
              >
                {categoryStore.categories.items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nameEn}{" "} {item.nameAr}
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
                disabled={ediMode}
                name="publishingHouse"
                value={articleData?.publishingHouseId || ""}
                onChange={(e) => {
                  setArticleData({
                    ...articleData,
                    publishingHouseId: e.target.value,
                  });
                }}
              >
                <MenuItem value="">
                  {articleData?.publishingHouse?.name}
                </MenuItem>
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
                disabled={ediMode}
                name="type"
                value={articleData?.typeId || ""}
                onChange={(e) => {
                  setArticleData({
                    ...articleData,
                    typeId: e.target.value,
                  });
                }}
              >
                <MenuItem value="">{articleData?.type?.nameEn || ""}</MenuItem>
                {articleTypeStore.articleTypes.items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nameEn}{" "} {item.nameAr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="author">Author</InputLabel>
              <Select
                labelId="author"
                disabled={ediMode}
                name="author"
                value={
                  articleData?.ArticleByAuthor?.map((e, i) => e.authorId) || ""
                }
                onChange={(e) => {
                  setArticleData({
                    ...articleData,
                    ArticleByAuthor: [
                      {
                        ...articleData?.ArticleByAuthor?.map(
                          (e, i) => e.authorId
                        ),
                        authorId: e.target.value,
                      },
                    ],
                  });
                }}
              >
                <MenuItem value="">Select an Author</MenuItem>
                {authorStore.authors.items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                   {item.nameEn}{" "} {item.nameAr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      {ediMode ? (
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => {
              setEditMode(!ediMode);
            }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Update Article
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save changes
          </Button>
        </Box>
      )}
       {/* <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
       </Box> */}
       <div className="p-5">
            
            <div className="d-flex justify-content-center">
              <div className="">
                <div className="d-flex">
                  <div style={{ width: 100 }}>
                    <h6>Branch</h6>
                  </div>
                  <div style={{ width: 50 }}>
                    <h6>Qte</h6>
                  </div>
                  <div style={{ width: 50 }}>
                    <h6>Price</h6>
                  </div>
                </div>
                {branches?.map((branch, j) => (
                  <div className="d-flex py-2">
                    <div style={{ width: 100 }}>{branch?.name}</div>
                    <div style={{ width: 50 }}>{articleData?.ArticlesByBranch?.find(elem=>elem.branchId===branch.id)?.stock||"--"}</div>
                    <div style={{ width: 50 }}>{articleData?.ArticlesByBranch?.find(elem=>elem.branchId===branch.id)?.price||"--"}</div>
                    <Button
                      variant="contained"
                      color="warning"
                      style={{
                        height: 25,
                        width: 80,
                        fontSize: 10,
                        padding: 0,
                      }}
                      onClick={() => {
                        console.log(elem);
                        setSelectedForPrice(elem);
                        setOpenDialogPrice(true);
                      }}
                    >
                      Change Price
                    </Button>
                  </div>
                ))}
                <div className="d-flex">
                  <div style={{ width: 100 }}>total</div>
                  <div style={{ width: 100 }}>{articleData?.ArticlesByBranch?.reduce((acc,val)=>acc+val.stock,0)}</div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-end  h-100">
              
            </div>
          </div>
    </Box>
  );
}

export default DetailAritcle;
