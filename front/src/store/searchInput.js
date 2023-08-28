import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const filteredSearch = createAsyncThunk(
  "search/search",
  async (query) => {
    try {
      console.log(query);
      const response = await axios.get(
        `${config.API_ENDPOINT}/search/${query}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const searchSlice = createSlice({
  name: "searchs",
  initialState: {
    sessions: [],
    blogs: [],
    articles: [],
    error: null,
    deleteError: null,
    saveError: null,
    createUserError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(filteredSearch.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
      state.blogs = action.payload.blogs;
      state.sessions = action.payload.sessions;
    });
  },
});
export default searchSlice.reducer;
