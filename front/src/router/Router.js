import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "../apps/Admin";
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
import Loginadmin from "../pages/loginadmin";
import Createuser from "../pages/createuser";
import { useSelector } from "react-redux";

function Router() {
  const auth = useSelector((state) => state.auth);
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
          </Route>
          {auth.meAdmin ? (
            <Route path="admin" element={<Admin />}>
              <Route path="create-user" element={<Createuser />} />
            </Route>
          ) : (
            <Route path="admin" element={<Loginadmin />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
