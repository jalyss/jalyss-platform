import React from "react";
import "./App.css";
import "./utils/i18n";
import Router from "./router/Router";
import { Provider} from 'react-redux'
import { store } from './store/index.js'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
