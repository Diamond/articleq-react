import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AppRouter from "./router";
import { store, history } from "./store";

// APP
ReactDOM.render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById("app")
);
