import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchsessionstypes = createAsyncThunk("type/types",async ()=>{
    const response =await axios.get(`${config.API_ENDPOINT}/sessionType`)
  
    return response.data;

})



export const typeSlice = createSlice({
    name: "sessiontype",
    initialState: {
        type: null,
        types: {
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
      builder.addCase(fetchsessionstypes.fulfilled, (state, action) => {
        state.types.items = action.payload;
      });
     
    },
  });
  export default typeSlice.reducer;