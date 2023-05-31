import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchUsers = createAsyncThunk("users/users", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/users/all`);
  return response.data;
});
export const fetchUser = createAsyncThunk("users/user", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/users/${id}`);
  return response.data;
});

export const createUser = createAsyncThunk("users/createUser", async (body, {dispatch  }) => {
  let token = JSON.parse(localStorage.getItem('token'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.post(`${config.API_ENDPOINT}/users/create`, body, configs);
  dispatch(fetchUsers())
  return response.data;
});
export const removeUser = createAsyncThunk("users/deleteUser", async (id,{dispatch}) => {
  let token = JSON.parse(localStorage.getItem('token'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.delete(`${config.API_ENDPOINT}/users/${id}`,configs);
  dispatch(fetchUsers())
  return response.data;
});

export const editUser = createAsyncThunk("users/editUser", async (args, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('token'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  let id=args.id
  delete args.id
  const response = await axios.patch(`${config.API_ENDPOINT}/users/${id}`, args,configs);
  dispatch(fetchUsers(id))
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


