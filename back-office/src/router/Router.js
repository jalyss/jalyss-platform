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
import Branch from "../apps/Branch";
import Employee from "../domains/employees/Employee";
import EmployeeList from "../domains/employees/views/EmployeeList";
import CreateEmployee from "../domains/employees/views/CreateEmployee";
import EditEmployee from "../domains/employees/views/EditEmployee";
import Article from "../domains/articles/Article";
import ArticleList from "../domains/articles/views/ArticleList";
import CreateArticle from "../domains/articles/views/CreateArticle";
import ArticleByBranchList from "../domains/articles/views/ArticleByBranchList";
import Dashboard from "../domains/dashboard/Dashboard";
// import Charts from "../domains/charts/Charts";
import Command from "../domains/commands/Command";
import CommandList from "../domains/commands/views/CommandList";
import CreateCommand from "../domains/commands/views/CreateCommand";
import EditCommand from "../domains/commands/views/EditCommand";

import ChartTabs from "../domains/charts/ChartTabs";
import CreateWorkSpace from "../domains/service/CreateWorkSpace";

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
          <Route
            path="/"
            element={auth.meAdmin.isAdmin ? <Main /> : <Branch />}
          >
            <Route path="dashboard" element={<Dashboard />} />
              <Route path="space" element={<CreateWorkSpace />} />
            <Route path="users" element={<User />}>
              <Route index element={<UserList />} />
              <Route path="create" element={<CreateUser />} />
              <Route path="edit/:userId" element={<EditUser />} />
            </Route>
            <Route path="employee" element={<Employee />}>
              <Route index element={<EmployeeList />} />
              <Route path="create" element={<CreateEmployee />} />
              <Route path="edit/:employeeId" element={<EditEmployee />} />
            </Route>

            <Route path="articles" element={<Article />}>
              <Route index element={<ArticleList />} />
              <Route
                path="articles-by-branch"
                element={<ArticleByBranchList />}
              />
              <Route path="create" element={<CreateArticle />} />
            </Route>

            {/* <Route path="charts" element={<Charts />} /> */}

            <Route path="commands" element={<Command />}>
              <Route index element={<CommandList />} />
              <Route path="create" element={<CreateCommand />} />
              <Route path="edit/:commandId" element={<EditCommand />} />
            </Route>
            <Route path="charts" element={<ChartTabs />} />
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
