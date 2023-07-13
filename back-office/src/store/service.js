import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

// Async thunk for fetching services
export const fetchServices = createAsyncThunk("services/services", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/services`);
  return response.data;
});

// Async thunk for fetching a single service by ID
export const fetchServiceById = createAsyncThunk(
  "services/service",
  async (id) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/services/one/${id}`
    );
    return response.data;
  }
);

export const createService = createAsyncThunk(
  "services/createService",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/services`, body);
    dispatch(fetchServices(response.data));
    return response.data;
  }
);

export const removeService = createAsyncThunk(
  "services/deleteservice",
  async (id) => {
    const response = await axios.delete(
      `${config.API_ENDPOINT}/services/${id}`
    );
    return response.data;
  }
);

export const editService = createAsyncThunk(
  "services/editservice",
  async (args) => {
    const { id, body } = args;
    const response = await axios.patch(
      `${config.API_ENDPOINT}/services/${id}`,
      body
    );
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
    builder.addCase(fetchServiceById.fulfilled, (state, action) => {
      state.service = action.payload;
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchServiceById.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default serviceSlice.reducer;
