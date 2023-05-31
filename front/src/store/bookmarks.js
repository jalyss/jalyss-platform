import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchBookmarks = createAsyncThunk("bookmarks/bookmarks", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/bookmarks/`);
  return response.data;
});


export const fetchBookmark = createAsyncThunk("bookmarks/bookmark", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/bookmarks/${id}`);
  return response.data;
});

export const createBookmark = createAsyncThunk(
    "bookmarks/createBookmark",
    async (body) => {
      const token = JSON.parse(localStorage.getItem("token")).Authorization;
  
      const configs = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
  
      const response = await axios.post(
        `${config.API_ENDPOINT}/bookmarks`,
        body,
        configs
      );
    
      return response.data;
    }
  );

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: null,
    bookmarks: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createCategoryError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
      state.bookmarks.items = action.payload;
    });
    builder.addCase(fetchBookmark.fulfilled, (state, action) => {
      state.bookmark = action.payload;
    });
  },
});
export default bookmarkSlice.reducer;
