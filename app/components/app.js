import React, { Component } from "react";
import LoginLinkContainer from "./loginLinkContainer";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to React!</h1>
        <div>
          <LoginLinkContainer />
          &nbsp;
          <a href="/users">Users</a>
        </div>
        {this.props.children}
      </div>
    );
  }
};
