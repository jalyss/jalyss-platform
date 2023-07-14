import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchAuthors = createAsyncThunk("authors/authors", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/authors/`);
  return response.data;
});

export const fetchauthor = createAsyncThunk("authors/author", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/authors/${id}`);
  return response.data;
});



export const createAuthor = createAsyncThunk("authors/createAuthor", async (body, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const response = await axios.post(`${config.API_ENDPOINT}/authors`, body, configs);
  dispatch(fetchauthor())
  return response.data;
});

export const removAuthor = createAsyncThunk("authors/deleteAuthor", async (id, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.delete(`${config.API_ENDPOINT}/authors/${id}`, configs);
  dispatch(fetchAuthors())
  return response.data;
});


export const editAuthor = createAsyncThunk("authors/editAuthor", async (args, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const { id, ...body } = args
  const response = await axios.patch(`${config.API_ENDPOINT}/authors/${id}`, body, configs);
  return response.data;
});



export const authorSlice = createSlice({
  name: "author",
  initialState: {
    author: null,
    authors: {
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
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.authors.items = action.payload;
    });
    builder.addCase(fetchauthor.fulfilled, (state, action) => {
      state.author = action.payload;
    });
  },
});
export default authorSlice.reducer;
