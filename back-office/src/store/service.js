import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

// Async thunk for fetching services
export const fetchServices = createAsyncThunk("services/services", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/services`);
  return response.data;
});

// Async thunk for fetching a single service by ID
export const fetchService = createAsyncThunk(
  "services/fetchService",
  async (name, { dispatch }) => {
    try {
      const response = await axios.get(
        `${config.API_ENDPOINT}/services/one/${name}`
      );
      console.log(response.data, "response.data");
      return response.data;
    } catch (error) {
      // Handle error if needed
      throw error;
    }
  }
);

export const createService = createAsyncThunk(
  "services/createService",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/services`, body);
    dispatch(fetchService(response.data));
    return response.data;
  }
);

// Create a slice for managing services
export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    service: null,
    services: {
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
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.services.items = action.payload;
    });
    builder.addCase(fetchService.fulfilled, (state, action) => {
      state.service = action.payload;
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchService.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default serviceSlice.reducer;
