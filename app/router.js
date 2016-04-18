import App from "./components/app";
import LoginFormContainer from "./components/loginFormContainer";
import UserListContainer from "./components/userListContainer";
import UserFormContainer from "./components/userFormContainer";
import UserShowContainer from "./components/userShowContainer";
import React from "react";
import { Router, Route, IndexRoute } from "react-router";

const AppRouter = (props) => (
  <Router history={props.history}>
    <Route path="/" component={App}>
      <Route path="login" component={LoginFormContainer} />
      <Route path="users">
        <IndexRoute component={UserListContainer} />
        <Route path=":userId/edit" component={UserFormContainer} />
        <Route path="new" component={UserFormContainer} />
      </Route>
    </Route>
  </Router>
);

export default AppRouter;
