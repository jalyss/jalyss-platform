import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchPaymentChoices = createAsyncThunk("paymentChoices/paymentChoices", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/payment-choices/`);
  return response.data;
});

export const fetchPaymentChoice = createAsyncThunk("paymentChoices/paymentChoice", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/payment-choices/${id}`);
  return response.data;
});



export const createPaymentChoice = createAsyncThunk("paymentChoices/createPaymentChoice", async (body, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.post(`${config.API_ENDPOINT}/payment-choices`, body, configs);
  dispatch(fetchPaymentChoice())
  return response.data;
});

export const removePaymentChoice = createAsyncThunk("paymentChoices/deletepPaymentChoice", async (id, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.delete(`${config.API_ENDPOINT}/payment-choices/${id}`, configs);
  dispatch(fetchPaymentChoices())
  return response.data;
});


export const editPaymentChoice = createAsyncThunk("paymentChoices/editPaymentChoice", async (args, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const { id, ...body } = args
  const response = await axios.patch(`${config.API_ENDPOINT}/payment-choices/${id}`, body, configs);
  return response.data;
});



export const paymentChoiceSlice = createSlice({
  name: "paymentChoice",
  initialState: {
    paymentChoice: null,
    paymentChoices: {
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
    builder.addCase(fetchPaymentChoices.fulfilled, (state, action) => {
      state.paymentChoices.items = action.payload;
    });
    builder.addCase(fetchPaymentChoice.fulfilled, (state, action) => {
      state.paymentChoice = action.payload;
    });
  },
});
export default paymentChoiceSlice.reducer;
