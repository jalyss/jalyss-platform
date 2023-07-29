import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchTrainingBookings = createAsyncThunk("training/bookingss", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/trainingBooking`);
  return response.data;
});



export const createTrainingBooking = createAsyncThunk(
    "trainingBookings/create",
    async (sessionTarifId,{dispatch}) => {
      const token = JSON.parse(localStorage.getItem("token")).Authorization;
  
      const configs = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
  
      const response = await axios.post(
        `${config.API_ENDPOINT}/trainingBooking`,
        sessionTarifId,
        configs
      );
     
      return response.data;
    }
  );

export const trainingBookingSlice = createSlice({
  name: "trainingBooking",
  initialState: {
    trainingBooking: null,
    trainingBookings: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createCategoryError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createTrainingBooking.fulfilled, (state, action) => {
      state.trainingBookings.items = action.payload;
    });
    builder.addCase(fetchTrainingBookings.fulfilled, (state, action) => {
      state.trainingBookings.items = action.payload;
    });
   
  },
});
export default trainingBookingSlice.reducer;
