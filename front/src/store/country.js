import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchCountries = createAsyncThunk("countries/countries", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/countries/`);
  return response.data;
});

export const fetchCountry = createAsyncThunk("countries/country", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/countries/${id}`);
  return response.data;
});

export const countrySlice = createSlice({
  name: "country",
  initialState: {
    country: null,
    countries: {
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
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries.items = action.payload;
    });
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.country = action.payload;
    });
  },
});
export default countrySlice.reducer;
