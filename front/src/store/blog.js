import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/blogs`);
  return response.data;
});

export const fetchBlog = createAsyncThunk("blogs/fetchBlog", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/blogs/one/${id}`);
  return response.data;
});
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (body, { dispatch }) => {
    const token = JSON.parse(localStorage.getItem("token")).Authorization;
    
    console.log(token);
    const configs = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };
    const response = await axios.post(
      `${config.API_ENDPOINT}/blogs`,
      body,
      configs
    );
    dispatch(fetchBlogs());
    return response.data;
  }
);

export const brancheSlice = createSlice({
  name: "blog",
  initialState: {
    blog: null,
    blogs: {
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
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs.items = action.payload;
    });
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.blog = action.payload;
    });
  },
});
export default brancheSlice.reducer;
