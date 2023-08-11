import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchEducationLevels = createAsyncThunk("educationLevels/educationLevel", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/educationLevel/`);
  return response.data;
});

export const fetchEducationLevel = createAsyncThunk("educationLevels/educationLevel", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/educationLevel/${id}`);
  return response.data;
});

export const createEducationLevel = createAsyncThunk("educationLevels/educationLevel", async (body, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const response = await axios.post(`${config.API_ENDPOINT}/educationLevel`, body, configs);
  dispatch(fetchEducationLevel())
  return response.data;
});

export const removeEducationLevel = createAsyncThunk("educationLevels/educationLevel", async (id, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.delete(`${config.API_ENDPOINT}/educationLevel/${id}`, configs);
  dispatch(fetchEducationLevels())
  return response.data;
});

export const editEducationLevel = createAsyncThunk("educationLevels/educationLevel", async (args, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const { id, ...body } = args
  console.log("args",args);
  const response = await axios.patch(`${config.API_ENDPOINT}/educationLevel/${id}`, body, configs);
  return response.data;
});




export const educationLevelSlice = createSlice({
  name: "educationLevel",
  initialState: {
    educationLevel: null,
    educationLevels: {
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
    builder.addCase(fetchEducationLevels.fulfilled, (state, action) => {
      state.educationLevels.items = action.payload;
    });
    builder.addCase(fetchEducationLevel.fulfilled, (state, action) => {
      state.educationLevel = action.payload;
    });
  },
});
export default educationLevelSlice.reducer;
