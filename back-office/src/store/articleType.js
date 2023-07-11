import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchArticleTypes = createAsyncThunk("types/types", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/article-types/`);
  return response.data;
});

export const fetchArticleType = createAsyncThunk("types/type", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/article-types/${id}`);
  return response.data;
});

export const createType = createAsyncThunk("types/type", async (body, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const response = await axios.post(`${config.API_ENDPOINT}/article-types`, body, configs);
  dispatch(fetchArticleType())
  return response.data;
});

export const removType = createAsyncThunk("types/deleteType", async (id, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.delete(`${config.API_ENDPOINT}/article-types/${id}`, configs);
  dispatch(fetchArticleTypes())
  return response.data;
});

export const editType = createAsyncThunk("types/editType", async (args, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const { id, ...body } = args
  const response = await axios.patch(`${config.API_ENDPOINT}/article-types/${id}`, body, configs);
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
