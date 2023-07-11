import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { meAdmin } from "../store/auth";
import NoPage from "../domains/noPage/NoPage";
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
import ChartTabs from "../domains/charts/ChartTabs";
import Command from "../domains/commands/Command";
import CommandList from "../domains/commands/views/CommandList";
import CreateCommand from "../domains/commands/views/CreateCommand";
import EditCommand from "../domains/commands/views/EditCommand";
//training
import Training from "../domains/training/Training";
import Coursdetail from "../domains/training/views/courses/Coursdetail";
import Checkpoint from "../domains/training/views/assements/Checkpoint";
import Service from "../domains/service/Service";

import Category from "../domains/category/category";
import CategoryList from "../domains/category/view/categoryList";
import CreateCategory from "../domains/category/view/createCategory";
import EditCategory from "../domains/category/view/editCategory";

import PublishingHouse from "../domains/publishingHouse/PublishingHouse";
import PublishHouseList from "../domains/publishingHouse/view/publishHouseList";
import EditPublishHouseList from "../domains/publishingHouse/view/editPublishingHouse";
import DetailPublishHouse from "../domains/publishingHouse/view/detailsPublishingHouse";
import CreatePublishingHouse from "../domains/publishingHouse/view/createPublishingHouse";


import Chat from "../domains/chat/chat";
import ChatList from "../domains/chat/view/ChatList";


import Courses from "../domains/training/views/courses/Courses";
import Tarifs from "../domains/training/views/tarifs/Tarifs";
import Assesment from "../domains/training/views/assements/Assesment";
import Coachs from "../domains/training/views/coachs/Coachs";
import CoachDetails from "../domains/training/views/coachs/CoachDetails";
import Sessions from "../domains/training/views/sessions/Sessions";

import ServiceList from "../domains/service/views/ServiceList";
import OneService from "../domains/service/views/OneService";
import ServiceDetails from "../domains/service/views/ServiceDetails";
import CreateService from "../domains/service/views/CreateService";
import CreateTarif from "../domains/service/views/CreateTarif";
import TarifDetails from "../domains/service/views/TarifDetails";
import SpaceDetails from "../domains/service/views/SpaceDetails";
import EditTarif from "../domains/service/views/EditTarif";
import EditWorkSpace from "../domains/service/views/EditWorkSpace";
import EditService from "../domains/service/views/EditService";
import Blogs from "../domains/blogs/Blogs";
import BlogsList from "../domains/blogs/views/BlogsList";
import DetailBlog from "../domains/blogs/views/DetailBlog";
import Providers from "../domains/provider/Providers";
import ProvidersList from "../domains/provider/view/ProvidersList";
import CreateProvider from "../domains/provider/view/CreateProvider";
import EditProvider from "../domains/provider/view/EditProvider";
import DetailProvider from "../domains/provider/view/DetailProvider";
import Profile from "../pages/Profile";
import Author from "../domains/author/Author";
import AuthorList from "../domains/author/views/AuthorList";
import EditAuthor from "../domains/author/views/EditAuthor";
import DetailAuthor from "../domains/author/views/DetailAuthor";
import CreateAuthor from "../domains/author/views/CreateAuthor";
import CreateWorkSpace from "../domains/service/views/CreateWorkSpace";




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
          <Route path="/" element={<Branch />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="space" element={<Service />}>
            <Route path="edit-service/:serviceId" element={<EditService />} />

              <Route index element={<ServiceList />} />
              <Route path="create-service" element={<CreateService />} />
              <Route path="service/:serviceId" element={<OneService />} >
              <Route index element={<ServiceDetails />} />
              <Route path="create-workspace" element={<CreateWorkSpace />} />
              <Route path="create-Tarif" element={<CreateTarif />} />
              <Route path="tarif-details/:tarifId" element={<TarifDetails />} />
              <Route path="space-details/:spaceId" element={<SpaceDetails />} />
              <Route path="edit-space/:spaceId" element={<EditWorkSpace />} />
              <Route path="edit-tarif/:tarifId" element={<EditTarif />} />
              </Route>


            </Route>
            <Route path="profile" element={<Profile />} />
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

            <Route path="blogs" element={<Blogs />}>
              <Route index element={<BlogsList />} />
              <Route path="detail/:blogId" element={<DetailBlog />} />
            </Route>

            <Route path="provider" element={<Providers />}>
              <Route index element={<ProvidersList />} />
              <Route path="edit/:providerId" element={<EditProvider />} />
              <Route path="detail/:providerId" element={<DetailProvider />} />
              <Route path="create" element={<CreateProvider />} />
            </Route>
            <Route path="category" element={<Category />}>
              <Route index element={<CategoryList />} />
              <Route path="createCategory" element={<CreateCategory />} />
              <Route path="editCategory/:id" element={<EditCategory />} />
            </Route>

            <Route path="publishing-house" element={<PublishingHouse />}>
              <Route index element={<PublishHouseList />} />
              <Route path="edit/:id" element={<EditPublishHouseList />} />
              <Route path="detail/:id" element={<DetailPublishHouse />} />
              <Route path="create" element={<CreatePublishingHouse />} />
            </Route>

            <Route path="Chat" element={<Chat />}>
              <Route index element={<ChatList />} />
            </Route>

            <Route path="author" element={<Author />}>
              <Route index element={<AuthorList />} />
              <Route path="edit/:authorId" element={<EditAuthor />} />
              <Route path="detail/:authorId" element={<DetailAuthor />} />
              <Route path="create" element={<CreateAuthor />} />
            </Route>

            <Route path="articles" element={<Article />}>
              <Route index element={<ArticleList />} />
              <Route
                path="articles-by-branch"
                element={<ArticleByBranchList />}
              />
              <Route path="create" element={<CreateArticle />} />
            </Route>

            <Route path="training" element={<Training />}>
              <Route index element={<Sessions />} />
              <Route path="courses" element={<Courses />}>
                <Route path="coursdetail" element={<Coursdetail />}>
                  <Route path="assesments" element={<Assesment />} />
                </Route>
              </Route>
              <Route path="coachs" element={<Coachs />}>
                <Route path=":coachId" element={<CoachDetails />} />
              </Route>
              <Route path="tarifs" element={<Tarifs />} />
              <Route path="types" element={<NoPage />} />
            </Route>
            {/* <Route path='/coches' element ={<Editcoachs/> }/> */}

            {/* <Route path="charts" element={<Charts />} /> */}

            <Route path="commands" element={<Command />}>
              <Route index element={<CommandList />} />
              <Route path="create" element={<CreateCommand />} />
              <Route path="edit/:commandId" element={<EditCommand />} />
            </Route>
            {/* <Route path="charts" element={<ChartTabs />} /> */}
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
