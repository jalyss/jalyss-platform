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

export const createEmployee= createAsyncThunk("employees/createEmployee", async (body,{dispatch}) => {
  const response = await axios.post(`${config.API_ENDPOINT}/employees/create`,body);
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


  