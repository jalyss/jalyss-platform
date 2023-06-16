import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchsessions = createAsyncThunk("session/sessions",async ()=>{
    const response =await axios.get(`${config.API_ENDPOINT}/session`)
    console.log('sessions store ',response.data)
    return response.data;

})



export const sessionSlice = createSlice({
    name: "sessions",
    initialState: {
        session: null,
        sessions: {
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
      builder.addCase(fetchsessions.fulfilled, (state, action) => {
        state.sessions.items = action.payload;
      });
     
    },
  });
  export default sessionSlice.reducer;