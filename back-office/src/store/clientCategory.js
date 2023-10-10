import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchClientCategories = createAsyncThunk(
  "client-categories/categories",
  async () => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/client-categories/`
    );
    return response.data;
  }
);

export const fetchClientCategory = createAsyncThunk(
  "client-categories/category",
  async (id) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/client-categories/${id}`
    );
    return response.data;
  }
);

export const deleteClientCategory = createAsyncThunk(
  "client-categories/category",
  async (id) => {
    const response = await axios.delete(
      `${config.API_ENDPOINT}/client-categories/${id}`
    );
    return response.data;
  }
);

export const createClientCategory = createAsyncThunk(
  "client-categories/categories",
  async (dto) => {
    try {
      const response = await axios.post(
        `${config.API_ENDPOINT}/client-categories/`,
        dto
      );
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error creating category:", error);
      throw error;
    }
  }
);

export const updateClientCategory = createAsyncThunk(
  "client-categories/category",
  async (args, { dispatch }) => {
    const { id, ...rest } = args;
    const response = await axios.patch(
      `${config.API_ENDPOINT}/client-categories/${id}`,
      rest
    );
    dispatch(fetchCategories());
    return response.data;
  }
);

export const clientCategorySlice = createSlice({
  name: "client-category",
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
    builder.addCase(fetchClientCategories.fulfilled, (state, action) => {
      state.categories.items = action.payload;
    });
    builder.addCase(fetchClientCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});
export default clientCategorySlice.reducer;
