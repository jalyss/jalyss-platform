import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchJobTitles = createAsyncThunk("jobTitles/jobTitle", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/jobTitle/`);
  return response.data;
});

export const fetchJobTitle = createAsyncThunk("jobTitles/jobTitle", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/jobTitle/${id}`);
  return response.data;
});

export const createJobTitle = createAsyncThunk("jobTitles/jobTitle", async (body, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const response = await axios.post(`${config.API_ENDPOINT}/jobTitle`, body, configs);
  dispatch(fetchJobTitle())
  return response.data;
});

export const removeJobTitle = createAsyncThunk("jobTitles/jobTitle", async (id, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.delete(`${config.API_ENDPOINT}/jobTitle/${id}`, configs);
  dispatch(fetchjobTitles())
  return response.data;
});

export const editJobTitle = createAsyncThunk("jobTitles/jobTitle", async (args, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const { id, ...body } = args
  console.log("args",args);
  const response = await axios.patch(`${config.API_ENDPOINT}/jobTitle/${id}`, body, configs);
  return response.data;
});




export const jobTitleSlice = createSlice({
  name: "jobTitle",
  initialState: {
    jobTitle: null,
    jobTitles: {
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
    builder.addCase(fetchJobTitles.fulfilled, (state, action) => {
      state.jobTitles.items = action.payload;
    });
    builder.addCase(fetchJobTitle.fulfilled, (state, action) => {
      state.jobTitle = action.payload;
    });
  },
});
export default jobTitleSlice.reducer;
