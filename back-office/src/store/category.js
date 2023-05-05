import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchCategories = createAsyncThunk("categories/categories", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/categories/`);
  return response.data;
});

export const fetchCategory = createAsyncThunk("categories/category", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/categories/${id}`);
  return response.data;
});

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: null,
    categories: {
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
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories.items = action.payload;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});
export default categorySlice.reducer;
