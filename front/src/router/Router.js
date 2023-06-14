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
import SpaceJalyss from "../pages/SpaceJalyss";
import CoworkingZone from "../pages/CoworkingZone";
import MeetingZone from "../pages/MeetingZone";
import PrivateZone from "../pages/PrivateZone";
import Domiciliation from "../pages/Domiciliation";
import ReserveCoworkin from "../pages/ReserveCoworkin";
import MentorPage from "../pages/MentorPage";
import ReserveMeeting from "../pages/ReserveMeeting";
import MyBlogs from "../components/Profile/MyBlogs"
import Bio from "../components/Profile/bio"
import Edit from "../components/Profile/Edit"
import MyBookmarks from "../components/Profile/MyBookmarks"
import OrderHistory from "../components/Profile/OrderHistory"



import Chat from "../pages/Chat";

import { useSelector } from "react-redux";
import UpdateBlog from "../pages/UpdateBlog";
import SessionDetails from "../pages/SessionDetails";
import DescriptionLecture from "../components/DescriptionLecture";
import LecturesSection from "../components/LecturesSection";
import Coachs from "../components/Coachs";
import WhatYouWillLearn from "../components/WhatYouWillLearn";

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
            <Route path="profile" element={<Profile />} >
            <Route index element={<MyBlogs/>} />
            <Route path="my-bookmarks" element={<MyBookmarks />} />
            <Route path="edit" element={<Edit />} />
            <Route path="bio" element={<Bio />} />
            <Route path="orders-history" element={<OrderHistory />} />

            </Route>

            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="new-password" element={<NewPassword />} />
            <Route path="invoice/:invoiceId" element={<Invoice />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:blogId" element={<BlogsDetail />} />
            <Route path="blogsForm" element={<BlogsForm/>} />
            <Route path="blogs/:blogId" element={<UpdateBlog/>} />
            <Route path="spaceJalyss" element={<SpaceJalyss />} />
            <Route path="CoworkingZone" element={<CoworkingZone />} />
            <Route path="MeetingZone" element={<MeetingZone />} />
            <Route path="PrivateZone" element={<PrivateZone />} />
            <Route path="Domiciliation" element={<Domiciliation />} />
            <Route path="ReserveCoworkin" element={<ReserveCoworkin />} />
            <Route path="mentor" element={<MentorPage />} />
            <Route path="ReserveMeeting" element={<ReserveMeeting />} />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} />
            <Route path="sessions/:sessionId" element={<SessionDetails />}>
              <Route index element={<DescriptionLecture />}/>
              <Route path="sections" element={<LecturesSection />}/>
              <Route path="coatchs" element={<Coachs/>}/>
              <Route path="what-you-will-learn" element={<WhatYouWillLearn />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
