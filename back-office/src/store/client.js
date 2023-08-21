import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchUsers = createAsyncThunk("clent/clients", async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/users/all`);
    return response.data;
  });


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
        state.users.items = action.payload;
      });
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
    },
  });
  export default userSlice.reducer;

  