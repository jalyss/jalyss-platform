import React, { createContext, useMemo } from "react";
import "./App.css";
import "./utils/i18n";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
export const RtlContext = createContext();
function App() {
  const { i18n } = useTranslation();
  const isRtl = useMemo(
    () => (i18n?.languages[0] === "ar" ? "rtl" : "ltr"),
    [i18n?.languages]
  );
  return (
    <Provider store={store}>
      <RtlContext.Provider value={isRtl}>
        <div style={{ direction: isRtl }}>
          <Router />
          <ToastContainer />
        </div>
      </RtlContext.Provider>
    </Provider>
  );
}

export default App;
