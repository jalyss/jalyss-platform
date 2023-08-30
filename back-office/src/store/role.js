import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchRoles = createAsyncThunk("roles/roles", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/roles/all`);
  return response.data;
});

export const fetchRole = createAsyncThunk("roles/role", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/roles/one${id}`);
  return response.data;
});

export const updateRole = createAsyncThunk("roles/role", async (args) => {
  const { id, ...body } = args;
  const response = await axios.patch(
    `${config.API_ENDPOINT}/roles/${id}`,
    body
  );
  return response.data;
});

export const createRole = createAsyncThunk("roles/role", async (dto) => {
  try {
    const response = await axios.post(
      `${config.API_ENDPOINT}/roles/create`,
      dto
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating role:", error);
    throw error;
  }
});

export const deleteRole = createAsyncThunk("roles/roles", async (id) => {
  const response = await axios.delete(`${config.API_ENDPOINT}/roles/${id}`);
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
