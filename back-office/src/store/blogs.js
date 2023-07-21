import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs/index";


export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (args) => {
  const response = await axios.get(`${config.API_ENDPOINT}/blogs`, {
    params: {
      ...args,
    },
  });

  return response.data;
});


export const fetchTrends = createAsyncThunk("blogs/fetchTrends", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/blogs`, {
    params: {
      trend: 1,
    },
  });
  return response.data;
});

export const fetchBlog = createAsyncThunk("blogs/fetchBlog", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/blogs/one/${id}`);
  
  return response.data;
});

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (body, { dispatch }) => {
    const token = JSON.parse(localStorage.getItem("tokenAdmin")).Authorization;

    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.post(
      `${config.API_ENDPOINT}/blogs`,
      body,
      configs
    );
    return response.data;
  }
);
export const createView = createAsyncThunk("views/createView", async (body) => {
  const response = await axios.post(`${config.API_ENDPOINT}/views`, body);

  return response.data;
});
export const removeBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id,{ dispatch }) => {
    const token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.delete(
      `${config.API_ENDPOINT}/blogs/${id}`,
      configs
    );
    dispatch(fetchBlogs(queries));
    return response.data;
  }
);

export const editBlogDecision = createAsyncThunk(
  "blogs/editBlog",
  async (args)=>{
    const {id,body}=args
   
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.put(
      `${config.API_ENDPOINT}/blogs/${id}`,
      body,
      configs 
    );
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
    trends: [],
    Bookmarks: [],
    error: null,
    deleteError: null,
    saveError: null,
    createUserError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs.items = action.payload.items;
      state.blogs.count = action.payload.count;
    });
    builder.addCase(fetchTrends.fulfilled, (state, action) => {
      state.trends = action.payload;
    });
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.blog = action.payload;
    });
  },
});
export default brancheSlice.reducer;
