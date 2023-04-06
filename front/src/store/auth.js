import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

//////////admin

export const meAdmin = createAsyncThunk("auth/meAdmin", async (token) => {
  let configs = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  console.log(config);
  const response = await axios.get(`${config.API_ENDPOINT}/auth/meAdmin`, {
    ...configs,
  });

  return response.data;
});

export const loginAdmin = createAsyncThunk(
  "auth/login-admin",
  async (body, { dispatch }) => {
    const response = await axios.post(
      `${config.API_ENDPOINT}/auth/login-admin`,
      body
    );
    let aux = JSON.stringify(response.data);
    localStorage.setItem("token", aux);
    dispatch(me(response.data.Authorization));
    return response.data;
  }
);

//////////////
export const me = createAsyncThunk("auth/me", async (token) => {
  let configs = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  console.log(config);
  const response = await axios.get(`${config.API_ENDPOINT}/auth/me`, {
    ...configs,
  });

  return response.data;
});
export const meAdmin = createAsyncThunk("auth/meAdmin", async (token) => {
  let configs = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  console.log(config);
  const response = await axios.get(`${config.API_ENDPOINT}/auth/meAdmin`, {
    ...configs,
  });

  return response.data;
});

export const login = createAsyncThunk(
  "auth/login",
  async (body, { dispatch }) => {
    const response = await axios.post(
      `${config.API_ENDPOINT}/auth/login`,
      body
    );
    let aux = JSON.stringify(response.data);
    localStorage.setItem("token", aux);
    dispatch(me(response.data.Authorization));
    return response.data;
  }
);
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (body, { dispatch }) => {
    const response = await axios.post(
      `${config.API_ENDPOINT}/auth/loginAdmin`,
      body
    );
    let aux = JSON.stringify(response.data);
    localStorage.setItem("tokenAdmin", aux);
    dispatch(meAdmin(response.data.Authorization));
    return response.data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/auth/register`,body);
    dispatch(login({ email: body.email, password: body.password }));
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "auth/forgot-password",
  async (body, { dispatch }) => {
    const response = await axios.post(
      `${config.API_ENDPOINT}/auth/forgot-password`,
      body
    );
    console.log(body);
    return response.data;
  }
);

export const verificationCode = createAsyncThunk(
  "auth/verification-code",
  async (body, { dispatch }) => {
    const response = await axios.post(
      `${config.API_ENDPOINT}/auth/verification-code`,
      body
    );
    let aux = JSON.stringify(response.data);
    localStorage.setItem("tokenCode", aux);
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (body, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokenCode")).Authorization;
    console.log(token);
    let configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.post(
      `${config.API_ENDPOINT}/auth/change-password`,
      body,
      configs
    );
    console.log(response);
    return response.data;
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    me: null,
    meAdmin:null,
    error: null,
    deleteError: null,
    saveError: null,
    registerError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(meAdmin.fulfilled, (state, action) => {
      state.meAdmin = action.payload;
    });
  },
});
export default AuthSlice.reducer;
