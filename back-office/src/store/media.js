import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchMedias = createAsyncThunk("medias/medias", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/medias`);
  return response.data;
});

export const fetchMedia = createAsyncThunk("medias/media", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/medias/${id}`);
  console.log("data",response.data);
  return response.data;
  
});

export const mediaSlice = createSlice({
  name: "media",
  initialState: {
    media: null,
    medias: {
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
    builder.addCase(fetchMedias.fulfilled, (state, action) => {
      state.medias.items = action.payload;
    });
    builder.addCase(fetchMedia.fulfilled, (state, action) => {
      state.media = action.payload;
    });
  },
});
export default mediaSlice.reducer;
