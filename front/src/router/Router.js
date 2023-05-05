import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Client from "../apps/Client";
import Articles from "../pages/Articles";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NoPage from "../pages/NoPage";
import OneArticle from "../pages/OneArticle";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import Invoice from "../pages/Invoice";
import ResetPassword from "../pages/ResetPassword";
import NewPassword from "../pages/NewPassword";
import TrainingPage from "../pages/TrainingPage";
import Blogs from "../pages/Blogs";
import BlogsDetail from "../pages/BlogsDetail";
import BlogsForm from "../pages/BlogsForm";


import Chatroom from "../pages/Chatroom";

import { useSelector } from "react-redux";

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
            <Route path="profile" element={<Profile />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="new-password" element={<NewPassword />} />
            <Route path="invoice/:invoiceId" element={<Invoice />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/chat" element={<Chatroom/>}/>
            <Route path="training" element={<TrainingPage />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:blogId" element={<BlogsDetail />} />
            <Route path="blogsForm" element={<BlogsForm/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
