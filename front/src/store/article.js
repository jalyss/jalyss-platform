import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchArticles = createAsyncThunk("articles/articles", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/articles/`);
  return response.data;
});

export const fetchArticle = createAsyncThunk("articles/article", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/articles/${id}`);
  return response.data;
});

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: null,
    articles: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createUserError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload;
    });
  },
});
export default articleSlice.reducer;
