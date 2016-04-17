import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logOut } from "../actions/index";

class LoginLink extends Component {
  constructor(props) {
    super(props);
  }
  loginLink() {
    if (!this.props.token) {
      return <a href="/login">Login</a>;
    } else {
      return <a href="#" onClick={(event) => { event.preventDefault(); this.props.logOut(); }}>Logout</a>;
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
  return bindActionCreators({ logOut }, dispatch);
}
const LoginLinkContainer = connect(mapLoginStateToProps, mapLoginDispatchToProps)(LoginLink);

export default LoginLinkContainer;
