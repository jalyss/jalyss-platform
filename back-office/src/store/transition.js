import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchTransitions = createAsyncThunk(
  "transaction/fetchTransitions",
  async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/transaction`);
    return response.data;
  }
);

export const fetchTransition = createAsyncThunk(
  "transaction/fetchTransition",
  async (id) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/transaction/${id}`
    );
    return response.data;
  }
);

export const findTransitionsByBranchId = createAsyncThunk(
  "transaction/findTransitionsByBranchId",
  async (id) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/transaction/branchSenderId/${id}`
    );
    return response.data;
  }
);

export const removeTransition = createAsyncThunk(
  "transaction/removeTransition",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `${config.API_ENDPOINT}/transaction/${id}`
    );
    dispatch(fetchProviders()); // Assuming fetchProviders() is defined and dispatches an action
    return response.data;
  }
);

export const editTransition = createAsyncThunk(
  "transaction/editTransition",
  async (args) => {
    const { id } = args;
    const response = await axios.patch(
      `${config.API_ENDPOINT}/transaction/${id}`,
      args
    );
    return response.data;
  }
);

export const transitionSlice = createSlice({
  name: "transaction",
  initialState: {
    transition: null,
    transitions: {
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
    builder.addCase(fetchTransitions.fulfilled, (state, action) => {
      state.transitions.items = action.payload;
    });

    builder.addCase(fetchTransition.fulfilled, (state, action) => {
      state.transition = action.payload;
    });

    builder.addCase(findTransitionsByBranchId.fulfilled, (state, action) => {
      state.transitions.items = action.payload;
    });
  },
});

export default transitionSlice.reducer;
