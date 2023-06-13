import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchEmployees = createAsyncThunk("employees/employees", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/employees/all`);
  return response.data;
});

export const fetchEmployee = createAsyncThunk("employees/employee", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/employees/one/${id}`);
  return response.data;
});

export const createEmployee = createAsyncThunk("employees/createEmployee", async (body, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.post(`${config.API_ENDPOINT}/employees/create`, body, configs);
  dispatch(fetchEmployees())
  return response.data;
});

export const removeEmployee = createAsyncThunk("employees/deleteEmployee", async (id, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  const response = await axios.delete(`${config.API_ENDPOINT}/employees/${id}`, configs);
  dispatch(fetchEmployees())
  return response.data;
});
export const editEmployee = createAsyncThunk("employees/editEmployee", async (args, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokenAdmin'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token.Authorization
    }
  }
  let id=args.id
  delete args.id
 
  const response = await axios.patch(`${config.API_ENDPOINT}/employees/${id}`, args,configs);
  dispatch(fetchEmployee(id))
  return response.data;
});

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: null,
    employees: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createEmployeeError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employees.items = action.payload;
    });
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.employee = action.payload;
    });
  },
});
export default employeeSlice.reducer;


