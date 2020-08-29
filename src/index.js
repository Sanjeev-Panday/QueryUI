import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "../src/app/components/App";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { initialState } from "./redux/intialState";
import "react-toastify/dist/ReactToastify.css";
const store = configureStore(initialState);
render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("root")
);
