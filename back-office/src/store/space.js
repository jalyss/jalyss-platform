import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchspaces = createAsyncThunk("spaces/fetchSpaces", async (args) => {
    const response = await axios.get(`${config.API_ENDPOINT}/spaces`, {
      params: {
        ...args,
      },
    });
    return response.data;
});


// Async thunk for fetching spaces
export const fetchSpaces = createAsyncThunk("work-spaces/work-spaces", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/work-spaces`);
  return response.data;
});

// Async thunk for fetching multiple spaces by ID
export const fetchSpacesById = createAsyncThunk("work-spaces/fetchSpacesById",async (id) => {
      const response = await axios.get(
        `${config.API_ENDPOINT}/work-spaces/all/${id}`
      );
      return response.data;
  }
);


export const createService = createAsyncThunk(
  "spaces/createSpace",
  async (body) => {
    const response = await axios.post(`${config.API_ENDPOINT}/work-spaces`, body);

    return response.data;
  }
);

// Create a slice for managing spaces
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
      state.spaces.items = action.payload;
    });
    builder.addCase( fetchSpacesById.fulfilled, (state, action) => {
      state.service = action.payload;
    });
    builder.addCase(fetchSpaces.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase( fetchSpacesById.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default spaceSlice.reducer;
