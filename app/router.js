import App from "./components/app";
import LoginFormContainer from "./components/loginFormContainer";
import UserListContainer from "./components/userListContainer";
import React from "react";
import { Router, Route } from "react-router";

const AppRouter = (props) => (
  <Router history={props.history}>
    <Route path="/" component={App}>
      <Route path="login" component={LoginFormContainer} />
      <Route path="users" component={UserListContainer} />
    </Route>
  </Router>
);

export default AppRouter;
