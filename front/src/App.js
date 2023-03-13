import React from "react";
import "./App.css";
import "./utils/i18n";
import Router from "./router/Router";
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  );
}

export default App;
