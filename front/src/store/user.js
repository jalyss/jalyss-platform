import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (args) => {

  const response = await axios.get(`${config.API_ENDPOINT}/users/author-list`,{
    params:{
      ...args
    }
  });
   console.log("API Response users:", response.data);
  return response.data;


});

export const fetchUser = createAsyncThunk("users/fetchUser", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/users/one/${id}`);
 
  return response.data;
});

export const updateUser = createAsyncThunk(
  "auth/update",
  async (body, { dispatch }) => {
    
    let token = JSON.parse(localStorage.getItem("token")).Authorization;
    console.log(token);
    let configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.patch(
      `${config.API_ENDPOINT}/users/update`,
     body,
      configs
    );
    // localStorage.setItem("token", JSON.stringify(response.data));
    // dispatch(me());
    console.log("ress",response.data);
    return response.data;
  }
);



export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: {
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
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users.items = action.payload
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export default userSlice.reducer;
