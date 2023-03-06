import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import { useTranslation } from "react-i18next";
import Header from "../layouts/Header";
import { CartProvider } from "react-use-cart";

function Client() {
  const { i18n } = useTranslation();

  const isRtl = useMemo(
    () => i18n?.languages[0] === "ar" && "rtl",
    [i18n?.languages]
  );
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
