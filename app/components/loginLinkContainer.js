import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logOut, redirectToRoot } from "../actions/index";

class LoginLink extends Component {
  constructor(props) {
    super(props);
    this.logOut.bind(this);
  }
  logOut() {
    this.props.logOut();
    this.props.redirectToRoot();
  }
  loginLink() {
    if (!this.props.token) {
      return <a href="/login">Login</a>;
    } else {
      return <a href="#" onClick={(event) => { event.preventDefault(); this.logOut(); }}>Logout</a>;
    }
  }
  render() {
    return this.loginLink();
  }
};
const mapLoginStateToProps = (state) => {
  return {
    token: state.token
  };
};
const mapLoginDispatchToProps = (dispatch) => {
  return bindActionCreators({ logOut, redirectToRoot }, dispatch);
}
const LoginLinkContainer = connect(mapLoginStateToProps, mapLoginDispatchToProps)(LoginLink);

export default LoginLinkContainer;
