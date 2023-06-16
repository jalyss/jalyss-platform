import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchtarif= createAsyncThunk("tarif/tarifs",async ()=>{
    const response =await axios.get(`${config.API_ENDPOINT}/tarifs`)
  
    return response.data;

})



export const tarifSlice = createSlice({
    name: "tarifs",
    initialState: {
        tarif: null,
        tarifs: {
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
      builder.addCase(fetchtarif.fulfilled, (state, action) => {
        state.tarifs.items = action.payload;
      });
     
    },
  });
  export default tarifSlice.reducer;