import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchBookings = createAsyncThunk("bookings/bookings", async () => {
  let token = JSON.parse(localStorage.getItem("token")).Authorization;
  let configs = {
    headers: {
      Authorization: "Bearer " + token,
    },
  }
  const response = await axios.get(`${config.API_ENDPOINT}/bookings`,{...configs});
  console.log('respmmmamam',response.data)
  return response.data;


});


export const fetchBooking = createAsyncThunk("bookings/booking", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/bookings/${id}`);
  return response.data;
});

 
export const removeBooking = createAsyncThunk(
  "bookings/removeBooking",
  async (id,{dispatch}) => {
    const response = await axios.delete(`${config.API_ENDPOINT}/bookings/${id}`);
dispatch(fetchBookings())
    return response.data;
  }
);


export const createBooking = createAsyncThunk(
    "bookings/createBooking",
    async (body) => {
      const token = JSON.parse(localStorage.getItem("token")).Authorization;
  
      const configs = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
  
      const response = await axios.post(
        `${config.API_ENDPOINT}/bookings`,
        body,
        configs
      );
    
      return response.data;
    }
  );

export const bookingSlice = createSlice({
  name: "booking",
  initialState:{
    booking: null,
    bookings: {
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
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.bookings.items = action.payload;
    });
    builder.addCase(fetchBooking.fulfilled, (state, action) => {
      state.booking = action.payload;
    });
  },
});
export default bookingSlice.reducer;
