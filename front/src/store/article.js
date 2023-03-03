import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchArticles = createAsyncThunk("articles/articles", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/articles/`);
  return response.data;
});
export const fetchArticlesByBranch = createAsyncThunk(
  "articles/articlesbyBranch",
  async (args) => {
    const identifier = args.identifier
    delete args.identifier
    console.log(args);
    const response = await axios.get(`${config.API_ENDPOINT}/articles/${identifier}`, { params: args });
    return response.data;
  });

export const fetchArticle = createAsyncThunk(
  "articles/article",
  async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/articles/one/${id}`);
    return response.data;
  });
export const fetchArticleByBranch = createAsyncThunk(
  "articles/articleByBranch",
  async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/articles/one-by-branch/${id}`);
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
    createArticleError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles.items = action.payload;
    });
    builder.addCase(fetchArticlesByBranch.fulfilled, (state, action) => {
      state.articles.items = action.payload;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload;
    });
    builder.addCase(fetchArticleByBranch.fulfilled, (state, action) => {
      state.article = action.payload;
    });
  },
});
export default articleSlice.reducer;
