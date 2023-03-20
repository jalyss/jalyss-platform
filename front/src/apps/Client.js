import React, { useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import { useTranslation } from "react-i18next";
import Header from "../layouts/Header";
import { CartProvider } from "react-use-cart";
import { me } from "../store/auth";
import { useDispatch } from "react-redux";


function Client() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch()


  const isRtl = useMemo(
    () => i18n?.languages[0] === "ar" && "rtl",
    [i18n?.languages]
  );
  
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
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </div>
  );
}

export default Client;
