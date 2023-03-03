import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchArticleTypes = createAsyncThunk("types/types", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/article-types/`);
  return response.data;
});

export const fetchArticleType = createAsyncThunk("types/type", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/article-types/${id}`);
  return response.data;
});

export const articleTypeSlice = createSlice({
  name: "articleType",
  initialState: {
    articleType: null,
    articleTypes: {
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
    builder.addCase(fetchArticleTypes.fulfilled, (state, action) => {
      state.articleTypes.items = action.payload;
    });
    builder.addCase(fetchArticleType.fulfilled, (state, action) => {
      state.articleType = action.payload;
    });
  },
});
export default articleTypeSlice.reducer;
