import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../configs";
import axios from "axios";

export const fetchProviders = createAsyncThunk("providers/fetchProviders", async () => {
  try {
    const response = await axios.get(`${config.API_ENDPOINT}/providers/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const fetchProvider = createAsyncThunk("providers/fetchProvider", async (id) => {
  try {
    const response = await axios.get(`${config.API_ENDPOINT}/providers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createProvider = createAsyncThunk("providers/createProvider", async (body, { dispatch }) => {
  const response = await axios.post(`${config.API_ENDPOINT}/providers/`, body);
  // dispatch(fetchProvider(response.data.id))
  return response.data;
});

export const editProvider = createAsyncThunk("providers/editProvider", async (args) => {
  const { id, body } = args;
  try {
    const response = await axios.patch(`${config.API_ENDPOINT}/providers/${id}`, body);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const removeProvider = createAsyncThunk("providers/removeProvider", async (id) => {
  try {
    const response = await axios.delete(`${config.API_ENDPOINT}/providers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create a slice for managing providers
export const providerSlice = createSlice({
  name: "provider",
  initialState: {
    provider: null,
    providers: {
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
    builder.addCase(fetchProviders.fulfilled, (state, action) => {
      state.providers.items = action.payload;
    });
    builder.addCase(fetchProvider.fulfilled, (state, action) => {
      state.provider = action.payload;
    });
    builder.addCase(createProvider.fulfilled, (state, action) => {
      state.provider = action.payload;
    });
   
  },
});

export default providerSlice.reducer;
