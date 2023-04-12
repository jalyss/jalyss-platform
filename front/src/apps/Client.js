import React, { useContext, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import { useTranslation } from "react-i18next";
import Navbar from "../layouts/Navbar";
import { CartProvider } from "react-use-cart";
import { me } from "../store/auth";
import { useDispatch } from "react-redux";
import { RtlContext } from "../App";


function Client() {
  const isRtl = useContext(RtlContext);
  const dispatch = useDispatch()

  useEffect(() => {
    let aux = localStorage.getItem('token')
    if (aux) {
      let token = JSON.parse(aux).Authorization
      dispatch(me(token))
    }
  }, [])

  return (
    <div className={`${isRtl}`}>
      <CartProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </CartProvider>
    </div>
  );
}

export default Client;
