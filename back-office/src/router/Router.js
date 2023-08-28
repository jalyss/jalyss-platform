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
import EditArticle from "../domains/articles/views/EditArticle";
import DetailAritcle from "../domains/articles/views/DetailArticle";
import ArticleByBranchList from "../domains/articles/views/ArticleByBranchList";
import Dashboard from "../domains/dashboard/Dashboard";
// import Charts from "../domains/charts/Charts";
import ChartTabs from "../domains/charts/ChartTabs";
import Command from "../domains/commands/Command";
import CommandList from "../domains/commands/views/CommandList";
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
import ChatEdit from "../domains/chat/view/ChatEdit";
import ChatCreation from "../domains/chat/view/ChatCreation";

import Branches from "../domains/branche/branch";
import BrancheList from "../domains/branche/view/branchesList";
import BrancheDetails from "../domains/branche/view/branchesDails";
import BrancheTransiction from "../domains/branche/view/branchTransiction";
import TransictionList from "../domains/branche/view/transictionList";
import TransictionDetails from "../domains/branche/view/transitionsDetails";

import Courses from "../domains/training/views/courses/Courses";
import Tarifs from "../domains/training/views/features/Features";
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
import Types from "../domains/training/views/sessions/Types";

import Newsession from "../domains/training/views/sessions/Newsession";
import Addnewcours from "../domains/training/views/courses/Addnewcours";
// import Types from "../domains/type/Types";
import TypesList from "../domains/type/views/TypesList";
import EditType from "../domains/type/views/EditType";
import DetailType from "../domains/type/views/DetailType";
import CreateType from "../domains/type/views/CreateType";

import CreateWorkSpace from "../domains/service/views/CreateWorkSpace";
import AddNewCours from "../domains/training/views/courses/Addnewcours";
import CreateCommand from "../domains/commands/views/CreateCommand";

import Features from "../domains/training/views/features/Features";

import SessionDetail from "../domains/training/views/sessions/SessionDetail";
import CommandDetail from "../domains/commands/views/CommandDetail";
import Requests from "../domains/training/views/requests/Requests";
import DetailRequest from "../domains/training/views/requests/DetailRequest";
import Gains from "../domains/training/views/gain/Gains";
import Prerequires from "../domains/training/views/prerequire/Prerequires";
import SessionType from "../domains/training/views/sessionType/SessionType";
import ChatBox from "../pages/ChatBox";
import Conversation from "../components/chatComponents/Conversation";
import Subscriber from "../domains/training/views/sessions/Subscriber";
import Role from "../domains/roles/Role";
import RolesList from "../domains/roles/view/RolesList";
import EditRole from "../domains/roles/view/EditRole";
import DetailRole from "../domains/roles/view/DetailRole";
import CreateRole from "../domains/roles/view/CreateRole";
import  Clientlist from "../../src/domains/Client/views/Clientlist"
import Client from "../domains/Client/Client";
import Addclient from "../domains/Client/views/Addclient";
import Profileclient from "../domains/Client/views/Profileclient";


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
              <Route path="service/:serviceId" element={<OneService />}>
                <Route index element={<ServiceDetails />} />
                <Route path="create-workspace" element={<CreateWorkSpace />} />
                <Route path="create-Tarif" element={<CreateTarif />} />
                <Route
                  path="tarif-details/:tarifId"
                  element={<TarifDetails />}
                />
                <Route
                  path="space-details/:spaceId"
                  element={<SpaceDetails />}
                />
                <Route path="edit-space/:spaceId" element={<EditWorkSpace />} />
                <Route path="edit-tarif/:tarifId" element={<EditTarif />} />
              </Route>
            </Route>

            <Route path="profile" element={<Profile />} /> 
            <Route path="chat-box" element={<ChatBox />}>
            <Route path="user/:userId" element={<Conversation />} />
            <Route path="group/:groupId" element={<Conversation />} />
            </Route>
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

            <Route path="client" element={<Client/>}>
              <Route index element={<Clientlist/>}/>
              <Route path="addclient" element={<Addclient/>}/>
             <Route path="profilclient/:id" element={<Profileclient/>}/>
              </Route>

            <Route path="blogs" element={<Blogs />}>
              <Route index element={<BlogsList />} />
              <Route path="detail/:blogId" element={<DetailBlog />} />
            </Route>

            <Route path="provider" element={<Providers />}>
              <Route index element={<ProvidersList />} />
              <Route path="editProvider/:providerId" element={<EditProvider />} />
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
              <Route path="edit/:id" element={<ChatEdit />} />
              <Route path="create" element={<ChatCreation />} />
            </Route>

            <Route path="author" element={<Author />}>
              <Route index element={<AuthorList />} />
              <Route path="edit/:authorId" element={<EditAuthor />} />
              <Route path="detail/:authorId" element={<DetailAuthor />} />
              <Route path="create" element={<CreateAuthor />} />
            </Route>

            <Route path="type" element={<Types />}>
              <Route index element={<TypesList />} />
              <Route path="edit/:typeId" element={<EditType />} />
              <Route path="detail/:typeId" element={<DetailType />} />
              <Route path="create" element={<CreateType />} />
            </Route> 
             <Route path="Branche" element={<Branches />}>
              <Route index element={<BrancheList />} />
              <Route path="transiction/detail/:typeId" element={<BrancheDetails />} />
              <Route path="transiction" element={<BrancheList />} />
              <Route path="transactions" element={<TransictionList />} />
              <Route path="transactions/sent" element={<BrancheTransiction />} />
              <Route path="transactions/transictionDetails/:id" element={<TransictionDetails />} />
  
            </Route>

            <Route path="role" element={<Role />}>
              <Route index element={<RolesList />} />
              <Route path="edit/:roleId" element={<EditRole />} />
              <Route path="detail/:roleId" element={<DetailRole />} />
              <Route path="create" element={<CreateRole />} />
            </Route>

            <Route path="articles" element={<Article />}>
              <Route index element={<ArticleList />} />
              <Route
                path="articles-by-branch"
                element={<ArticleByBranchList />}
              />
              <Route path="create" element={<CreateArticle />} />
              <Route path="editArticle/:articleId" element={<EditArticle />} />
              <Route path="detail/:articleId" element={<DetailAritcle />} />

            </Route>

            <Route path="training" element={<Training />}>
              <Route index element={<Sessions />} />
              <Route
                path="detail-training/:sessionsId"
                element={<SessionDetail />}
              >


              </Route>
            


              <Route path="subscriber/:id" element={<Subscriber />} />
              <Route path="newsession" element={<Newsession />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:lectureId" element={<Coursdetail />} />
              <Route
                path="/training/courses/AddNewCours"
                element={<AddNewCours />}
              />
              <Route path="coachs" element={<Coachs />} />
              <Route path="coachs/:id" element={<CoachDetails />}></Route>{" "}
              <Route path="features" element={<Features />} />
              <Route path="requests" element={<Requests />} />
              <Route path="requests/:id" element={<DetailRequest />} />
              <Route path="gains" element={<Gains />} />
              <Route path="prerequires" element={<Prerequires />} />
              <Route path="types" element={<SessionType />} />
            </Route>

            {/* <Route path="charts" element={<Charts />} /> */}

            <Route path="commands" element={<Command />}>
              <Route index element={<CommandList />} />
              <Route path="create" element={<CreateCommand />} />
              <Route path="detail/:commandId" element={<CommandDetail />} />
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
