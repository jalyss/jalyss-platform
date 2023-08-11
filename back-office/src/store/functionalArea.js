import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchFunctionalAreas = createAsyncThunk("functionalAreas/functionalArea", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/functionalArea/`);
  return response.data;
});

export const fetchFunctionalArea = createAsyncThunk("functionalAreas/functionalArea", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/functionalArea/${id}`);
  return response.data;
});

export const createFunctionalArea = createAsyncThunk("functionalAreas/functionalArea", async (body, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const response = await axios.post(`${config.API_ENDPOINT}/functionalArea`, body, configs);
  dispatch(fetchFunctionalArea())
  return response.data;
});

export const removeFunctionalArea = createAsyncThunk("functionalAreas/functionalArea", async (id, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.delete(`${config.API_ENDPOINT}/functionalArea/${id}`, configs);
  dispatch(fetchFunctionalAreas())
  return response.data;
});

export const editFunctionalArea = createAsyncThunk("functionalAreas/functionalArea", async (args, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const { id, ...body } = args
  console.log("args",args);
  const response = await axios.patch(`${config.API_ENDPOINT}/functionalArea/${id}`, body, configs);
  return response.data;
});




export const functionalAreaSlice = createSlice({
  name: "functionalArea",
  initialState: {
    functionalArea: null,
    functionalAreas: {
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
    builder.addCase(fetchFunctionalAreas.fulfilled, (state, action) => {
      state.functionalAreas.items = action.payload;
    });
    builder.addCase(fetchFunctionalArea.fulfilled, (state, action) => {
      state.functionalArea = action.payload;
    });
  },
});
export default functionalAreaSlice.reducer;
