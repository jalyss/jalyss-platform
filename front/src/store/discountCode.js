import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../configs";
import axios from "axios";

export const fetchDiscountCodes = createAsyncThunk(
  "discountCodes/discountCodes",
  async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/discountCodes`);
    return response.data;
  }
);

export const fetchDiscountCode = createAsyncThunk(
  "discountCodes/fetchDiscountCode",
  async (params) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/discount-codes/${params}`
    );
    return response.data;
  }
);

export const editDiscountCode = createAsyncThunk(
  "discountCodes/editDiscountCode",
  async (args) => {
    const { id, ...rest } = args;
    const response = await axios.patch(
      `${config.API_ENDPOINT}/discount-codes/${id}`,
      { ...rest }
    );

    return response.data;
  }
);
export const createDiscountCode = createAsyncThunk(
  "discountCodes/createDiscountCode",
  async (body, { dispatch }) => {
    const response = await axios.post(
      `${config.API_ENDPOINT}/discountCodes/`,
      body
    );
    dispatch(fetchDiscountCode(response.data.id));
    return response.data;
  }
);

export const removeDiscountCode = createAsyncThunk(
  "discountCodes/removeDiscountCode",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `${config.API_ENDPOINT}/discountCodes/${id}`
    );
    dispatch(fetchDiscountCodes());

    return response.data;
  }
);

// Create a slice for managing discountCodes
export const discountCodeSlice = createSlice({
  name: "discountCode",
  initialState: {
    discountCode: null,
    discountCodes: {
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
    builder.addCase(fetchDiscountCodes.fulfilled, (state, action) => {
      state.discountCodes.items = action.payload;
    });
    builder.addCase(fetchDiscountCode.fulfilled, (state, action) => {
      state.discountCode = action.payload;
    });
    builder.addCase(fetchDiscountCodes.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchDiscountCode.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default discountCodeSlice.reducer;
