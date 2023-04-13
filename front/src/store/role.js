import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchRoles = createAsyncThunk("roles/roles", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/roles/all`);
  return response.data;
});

export const fetchRole = createAsyncThunk("roles/role", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/roles/one/${id}`);
  return response.data;
});

export const roleSlice = createSlice({
  name: "role",
  initialState: {
    role: null,
    roles: {
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
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.roles.items = action.payload;
    });
    builder.addCase(fetchRole.fulfilled, (state, action) => {
      state.role = action.payload;
    });
  },
});
export default roleSlice.reducer;
