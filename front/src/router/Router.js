import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Client from "../apps/Client";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import ResetPassword from "../pages/ResetPassword";
import NewPassword from "../pages/NewPassword";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import OneArticle from "../pages/OneArticle";
import Checkout from "../pages/Checkout";
import Invoice from "../pages/Invoice";

import NoPage from "../pages/NoPage";

import TrainingPage from "../pages/TrainingPage";
import MentorPage from "../pages/MentorPage";

import Blogs from "../pages/Blogs";
import BlogsDetail from "../pages/BlogsDetail";
import BlogsForm from "../pages/BlogsForm";
import UpdateBlog from "../pages/UpdateBlog";

import SpaceJalyss from "../pages/space/SpaceJalyss";

import RegisterForm from "../pages/space/RegisterForm";
import ServiceSpace from "../pages/space/ServiceSpace";
import SpaceReservation from "../pages/space/SpaceReservation";

import Profile from "../pages/Profile";
import MyBlogs from "../components/Profile/MyBlogs";
import Bio from "../components/Profile/bio";
import Edit from "../components/Profile/Edit";
import MyBookmarks from "../components/Profile/MyBookmarks";
import OrderHistory from "../components/Profile/OrderHistory";

import Chat from "../pages/Chat";
import Conversation from "../components/chatComponents/Conversation";

import SessionDetails from "../pages/SessionDetails";




function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Client />}>
            <Route index element={<Home />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/cat/:categoryId" element={<Articles />} />
            <Route path="one-article/:articleId" element={<OneArticle />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="invoice/:invoiceId" element={<Invoice />} />
            <Route path="profile" element={<Profile />}>
              <Route index element={<MyBlogs />} />
              <Route path="my-bookmarks" element={<MyBookmarks />} />
              <Route path="edit" element={<Edit />} />
              <Route path="bio" element={<Bio />} />
              <Route path="orders-history" element={<OrderHistory />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="new-password" element={<NewPassword />} />
            
            

            <Route path="*" element={<NoPage />} />
            <Route path="/chat" element={<Chat />}>
            <Route path="/chat/:userId" element={<Conversation />} />

            </Route>
            <Route path="training" element={<TrainingPage />} />
            <Route path="mentor" element={<MentorPage />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:blogId" element={<BlogsDetail />} />
            <Route path="blogsForm" element={<BlogsForm />} />
            <Route path="blogs/:blogId" element={<UpdateBlog />} />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} />
            <Route path="spaceJalyss" element={<SpaceJalyss />} />
            <Route
              path="spaceJalyss/:serviceIdentifier"
              element={<ServiceSpace />}
            />
           

            <Route path="ReserveMeeting" element={<ReserveMeeting />} />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} />
            <Route path="sessions/:sessionId" element={<SessionDetails />}/>
    

            <Route path="ReserveMeeting" element={<ReserveMeeting />} />

            <Route path="RegisterForm" element={<RegisterForm />} />
            <Route  path="SpaceReservation" element={ <SpaceReservation/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;

