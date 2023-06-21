import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchSpaces = createAsyncThunk(
  "work-spaces/work-spaces",
  async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/work-spaces`);
    return response.data;
  }
);

export const fetchSpaceById = createAsyncThunk(
  "work-spaces/fetchSpacesById",
  async (serviceId) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/work-spaces/one/${serviceId}`
    );
    return response.data;
  }
);

export const fetchWorkSpaces = createAsyncThunk(
  "workSpaces/workSpaces",
  async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/work-spaces`);
    return response.data;
  }
);



export const createWorkSpace = createAsyncThunk(
  "workSpaces/createWorkSpace",
  async (body, { dispatch }) => {
    const response = await axios.post(
      `${config.API_ENDPOINT}/work-spaces`,
      body
    );
    dispatch(fetchWorkSpace(response.data));
    return response.data;
  }
);

export const removeSpace = createAsyncThunk(
  "spaces/deleteSpace",
  async (id) => {  
    // const { id } = args;
    const response = await axios.delete(`${config.API_ENDPOINT}/work-spaces/${id}`);
    return response.data;
  }
);

export const editSpace = createAsyncThunk(
  "spaces/editSpace",
  async (args) => {
    const { id,...body } = args;
    const response = await axios.patch(
      `${config.API_ENDPOINT}/work-spaces/${id}`,
      body
    );
    return response.data;
  }
);

export const spaceSlice = createSlice({
  name: "space",
  initialState: {
    space: null,
    spaces: {
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
    builder.addCase(fetchSpaces.fulfilled, (state, action) => {
        state.spaces.items = action.payload.items;
        state.spaces.count = action.payload.count;
      })
     builder.addCase(fetchSpaceById.fulfilled, (state, action) => {
        state.service = action.payload;
      });
  },
});

export default spaceSlice.reducer;
