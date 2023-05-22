import React, { createContext, useMemo } from 'react';
import './App.css';
import "./utils/i18n";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from './router/Router';

export const RtlContext = createContext();

function App() {
  const { i18n } = useTranslation();
  const isRtl = useMemo(
    () => (i18n?.languages[0] === "ar" ? "rtl" : "ltr"),
    [i18n?.languages]
  );

  
  return (
    <RtlContext.Provider value={isRtl}>
        <div style={{ direction: isRtl }}>
          <Router />
          <ToastContainer />
        </div>
      </RtlContext.Provider>
  )
}

export default App;
