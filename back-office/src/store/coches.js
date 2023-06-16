import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchcoaches = createAsyncThunk("coache/coaches",async ()=>{
    const response =await axios.get(`${config.API_ENDPOINT}/coaching`)
     console.log('store',response.data)         
     return response.data;

})

export const coachesSlice = createSlice({
    name: "coaches",
    initialState: {
        coache: null,
        coaches: {
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
      builder.addCase(fetchcoaches.fulfilled, (state, action) => {
        state.coaches.items = action.payload;
      });
     
    },
  });
  export default coachesSlice.reducer;