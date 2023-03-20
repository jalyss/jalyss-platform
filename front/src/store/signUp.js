import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchAuth = createAsyncThunk("auth/auth", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/auth/`);
  return response.data;
  });

export const register= createAsyncThunk("auth/register", async (body,{dispatch}) => {
  const response = await axios.post(`${config.API_ENDPOINT}/auth/register`,body);
 dispatch(fetchAuth(response.data.id)) // for dispath the result on state.auth to see its data in the next page after checkout
  return response.data;
  });

  export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
      auth: null,
      Auth: {
        items: [],
        count: 0,
      },
      error: null,
      deleteError: null,
      saveError: null,
      registerError: null,
    },
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchAuth.fulfilled, (state, action) => {
        state.auth.items = action.payload;
      });
     
    },
  });
  export default AuthSlice.reducer;


  