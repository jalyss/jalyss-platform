import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchCities = createAsyncThunk("cities/cities", async (countryId) => {
  const response = await axios.get(`${config.API_ENDPOINT}/cities/${countryId}`);
  return response.data;
});

export const fetchCity = createAsyncThunk("cities/city", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/cities/${id}`);
  return response.data;
});

export const citySlice = createSlice({
  name: "city",
  initialState: {
    city: null,
    cities: {
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
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities.items = action.payload;
    });
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.city = action.payload;
    });
  },
});
export default citySlice.reducer;
