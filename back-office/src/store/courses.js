import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchcours = createAsyncThunk("cours/couses",async ()=>{
    const response =await axios.get(`${config.API_ENDPOINT}/lecture`)
    return response.data;

})



export const coursSlice = createSlice({
    name: "courses",
    initialState: {
        cours: null,
        courses: {
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
      builder.addCase(fetchcours.fulfilled, (state, action) => {
        state.courses.items = action.payload;
      });
     
    },
  });
  export default coursSlice.reducer;