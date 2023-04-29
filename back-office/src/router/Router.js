import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { meAdmin } from "../store/auth";
import NoPage from "../domains/noPage/NoPage";
import Main from "../apps/Main";
import AuthAdmin from "../apps/AuthAdmin";
import LoginAdmin from "../pages/LoginAdmin";
import ResetPassword from "../pages/ResetPassword";
import NewPassword from "../pages/NewPassword";
import User from "../domains/users/User";
import CreateUser from "../domains/users/views/CreateUser";
import UserList from "../domains/users/views/UserList";
import EditUser from "../domains/users/views/EditUser";
import Customer from "../domains/customers/Customer";
import CreateCustomer from "../domains/customers/views/CreateCustomer";
import CustomerList from "../domains/customers/views/CustomerList";
import Branch from "../apps/Branch";
import Employee from "../domains/employees/Employee";
import EmployeeList from "../domains/employees/views/EmployeeList";
import CreateEmployee from "../domains/employees/views/CreateEmployee";
import EditEmployee from "../domains/employees/views/EditEmployee";
import Article from "../domains/articles/Article";

function Router() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    let aux = localStorage.getItem("tokenAdmin");
    if (aux) {
      let token = JSON.parse(aux).Authorization;
      dispatch(meAdmin(token));
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {auth.meAdmin ? (
          <Route path="/" element={auth.meAdmin.isAdmin ? <Main /> : <Branch />}>
            <Route path="user" element={<User />}>
              <Route index element={<UserList />} />
              <Route path="create" element={<CreateUser />} />
              <Route path="edit/:userId" element={<EditUser />} />
            </Route>
            <Route path="employee" element={<Employee />}>
              <Route index element={<EmployeeList />} />
              <Route path="create" element={<CreateEmployee />} />
              <Route path="edit/:employeeId" element={< EditEmployee/>} />
            </Route>
            <Route path="customer" element={<Customer />}>
              <Route index element={<CustomerList />} />
              <Route path="create" element={<CreateCustomer />} />
            </Route>
            <Route path="article" element={<Article />}>
              {/* <Route index element={<CustomerList />} />
              <Route path="create" element={<CreateCustomer />} /> */}
            </Route>
          </Route>
        ) : (
          <Route path="/" element={<AuthAdmin />}>
            <Route index element={<LoginAdmin />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="new-password" element={<NewPassword />} />
          </Route>

        )}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
