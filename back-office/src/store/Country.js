import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchCountries = createAsyncThunk("countries/countries", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/countries`);
  return response.data;
});

export const findAllCitites = createAsyncThunk("cities/cities", async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/cities`);
    return response.data;
  });
  export const findAllBranches = createAsyncThunk("branches/branches", async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/branches/all`);
    return response.data;
  });

export const commandSlice = createSlice({
  name: "country",
  initialState: {
    country: null,
    countries: {
      items: [],
      count: 0,
    },
    cities: {
        items: [],
        count: 0,
      },
      branches: {
        items: [],
        count: 0,
      },
    commandLines: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createCommandError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries.items = action.payload;
    });
    builder.addCase(findAllCitites.fulfilled, (state, action) => {
        state.cities.items = action.payload;
      });
      builder.addCase(findAllBranches.fulfilled, (state, action) => {
        state.branches.items = action.payload;
      });
  }
});
export default commandSlice.reducer;
