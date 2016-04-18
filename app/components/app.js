import React, { Component } from "react";
import LoginLinkContainer from "./loginLinkContainer";
import { Link } from "react-router";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to React!</h1>
        <div>
          <LoginLinkContainer />
          &nbsp;
          <Link to="/users" activeClassName="active">Users</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
};
