import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchBranches = createAsyncThunk("branches/branches", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/branches/all`);
  return response.data;
});

export const fetchBranche = createAsyncThunk("branches/branche", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/branches/one/${id}`);
  return response.data;
});

export const brancheSlice = createSlice({
  name: "branche",
  initialState: {
    branche: null,
    branches: {
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
    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      state.branches.items = action.payload;
    });
    builder.addCase(fetchBranche.fulfilled, (state, action) => {
      state.branche = action.payload;
    });
  },
});
export default brancheSlice.reducer;
