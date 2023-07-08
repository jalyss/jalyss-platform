import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const createRequest = createAsyncThunk(
    "requests/request",
    async (body) => {
      const token = JSON.parse(localStorage.getItem("token")).Authorization;
  
      const configs = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
  
      const response = await axios.post(
        `${config.API_ENDPOINT}/SessionRequest`,
        body,
        configs
      );
      console.log("reqstore",response.data);

      return response.data;
    }
  );

export const requestSlice = createSlice({
  name: "request",
  initialState: {
    request: null,
    requests: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createUserError: null,
  },
  reducers: {},
 
  
});
export default requestSlice.reducer;
