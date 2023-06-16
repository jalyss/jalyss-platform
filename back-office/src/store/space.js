import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


// Async thunk for fetching spaces
export const fetchSpaces = createAsyncThunk("work-spaces/work-spaces", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/work-spaces`);
  return response.data;
});

// Async thunk for fetching multiple spaces by ID
export const fetchSpacesById = createAsyncThunk("work-spaces/fetchSpacesById",async (serviceId) => {
      const response = await axios.get(
        `${config.API_ENDPOINT}/work-spaces/all/${serviceId}`
      );
      return response.data;
  }
);


// Async thunk for fetching WorkSpaces
export const fetchWorkSpaces = createAsyncThunk("workSpaces/workSpaces", async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/workSpaces`);
    return response.data;
  });
  
  // Async thunk for fetching a single WorkSpace by ID
  export const fetchWorkSpace = createAsyncThunk(
    "workSpaces/fetchWorkSpace",
    async (id) => {

        const response = await axios.get(
          `${config.API_ENDPOINT}/workSpace/all/${id}`
        );

        return response.data;
      
    }
  );
  
  export const createWorkSpace = createAsyncThunk(
    "workSpaces/createWorkSpace",
    async (body, { dispatch }) => {
      const response = await axios.post(`${config.API_ENDPOINT}/work-spaces`, body);
      dispatch(fetchWorkSpace(response.data));
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
