import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


// Async thunk for fetching WorkSpaces
export const fetchWorkSpaces = createAsyncThunk("workSpaces/workSpaces", async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/workSpaces`);
    return response.data;
  });
  
  // Async thunk for fetching a single WorkSpace by ID
  export const fetchWorkSpace = createAsyncThunk(
    "workSpaces/fetchWorkSpace",
    async (name, { dispatch }) => {
      try {
        const response = await axios.get(
          `${config.API_ENDPOINT}/workSpace/one/${name}`
        );
        console.log(response.data, "response.data");
        return response.data;
      } catch (error) {
        // Handle error if needed
        throw error;
      }
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
  
  // Create a slice for managing WorkSpaces
  export const workSpaceSlice = createSlice({
    name: "workSpace",
    initialState: {
      workSpace: null,
      workSpaces: {
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
      builder.addCase(fetchWorkSpaces.fulfilled, (state, action) => {
        state.workSpaces.items = action.payload;
      });
      builder.addCase(fetchWorkSpace.fulfilled, (state, action) => {
        state.workSpace = action.payload;
      });
      builder.addCase(fetchWorkSpaces.rejected, (state, action) => {
        state.error = action.error.message;
      });
      builder.addCase(fetchWorkSpace.rejected, (state, action) => {
        state.error = action.error.message;
      });
    },
  });
  
  export default workSpaceSlice.reducer;
  