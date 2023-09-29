import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

// export const fetchMedias = createAsyncThunk("medias/medias", async (id) => {
//   const response = await axios.get(`${config.API_ENDPOINT}/medias`);
//   return response.data;
// });

// export const fetchMedia = createAsyncThunk("medias/media", async (id) => {
//   const response = await axios.get(`${config.API_ENDPOINT}/medias/${id}`);
//   return response.data;

// });

export const form_handle = createSlice({
  nameAr: "media",
  initialState: {
    nameAr: {
      value: "",
      required: true,
    },
    nameEn: {
      value: "",
      required: true,
    },
    number: {
      value: "",
      required: false,
    },
    email: {
      value: "",
      required: true,
      requiredMessage: "Email address is required!",
      email: true,
      emailMessage: "Email address is not valid!",
    },
    password: {
      value: "",
      required: true,
      minLength: 6,
      minLengthMessage: "Password must be at least 6 characters long!",
      maxLength: 16,
      maxLengthMessage: "Too many characters!",
    },
    confirmPassword: {
      value: "",
      required: true,
      matchWith: "password",
      matchWithMessage: "Passwords must be equal!",
    },
    jobEn: {
      value: "",
      required: false,
    },
    jobAr: {
      value: "",
      required: false,
    },

    country: {
      value: "",
      required: true,
    },
    cities: {
      value: "",
      required: true,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMedias.fulfilled, (state, action) => {
      state.medias.items = action.payload;
    });
    builder.addCase(fetchMedia.fulfilled, (state, action) => {
      state.media = action.payload;
    });
  },
});
export default mediaSlice.reducer;
