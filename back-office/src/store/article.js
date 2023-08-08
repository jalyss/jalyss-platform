import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchArticles = createAsyncThunk(
  "articles/articles",
  async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/articles/`);
    return response.data;
  }
);
export const fetchArticlesByBranch = createAsyncThunk(
  "articles/articlesbyBranch",
  async (args) => {
    const identifier = args.identifier;
    delete args.identifier;
    const response = await axios.get(
      `${config.API_ENDPOINT}/articles/${identifier}`,
      { params: args }
    );
    return response.data;
  }
);

export const fetchArticle = createAsyncThunk("articles/article", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/articles/one/${id}`);
  return response.data;
});

export const fetchArticleByBranch = createAsyncThunk(
  "articles/articleByBranch",
  async (id) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/articles/one-by-branch/${id}`
    );
    return response.data;
  }
);

export const addTransactionStock = createAsyncThunk(
  "mvt/createMvt",
  async (args, { dispatch }) => {
    console.log(args,'a777a')
    const response = await axios.post(`${config.API_ENDPOINT}/mvts`, args);
    dispatch(fetchArticles());
    return response.data;
  }
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/articles/`, body);
    dispatch(fetchArticle(response.data.id));
    return response.data;
  }
);

export const createArticleByBranchRating = createAsyncThunk(
  "articles/rating",
  async (body, { dispatch }) => {
    console.log(body);
    const articleByBranchId = body.articleByBranchId;
    delete body.articleByBranchId;
    let token = JSON.parse(localStorage.getItem("token"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    if (!token) return; //if u don't have token inthe localstorage this meaning that u are not a user so will break the function with return nothing
    console.log(token);
    const response = await axios.post(
      `${config.API_ENDPOINT}/articles/rating/${articleByBranchId}`,
      body,
      configs
    );
    dispatch(fetchArticleByBranch(articleByBranchId));
    return response.data;
  }
);

export const updateArticleByBranch = createAsyncThunk(
  "articles/updateArticleByBranch",
  async (args, { dispatch }) => {
    const { articleId, ...rest } = args;
    console.log(args, "args");
    console.log(rest, "rest");
    const response = await axios.patch(
      `${config.API_ENDPOINT}/articles/${articleId}`,
      { ...rest }
    );

    console.log(response.data, "response.data");

    return response.data;
  }
);
export const removeArticle = createAsyncThunk(
  "articles/removeArticle",
  async (id) => {
 
      const response = await axios.delete(
        `${config.API_ENDPOINT}/articles/${id}`
      );
      return response.data;
   
  }
);
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
