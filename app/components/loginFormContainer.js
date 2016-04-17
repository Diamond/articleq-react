import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { tryLogin, logOut } from "../actions/index";

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }
  conditionalLoginForm(token) {
    if (token) {
      return (
        <div>
          <h2>Logged In</h2>
          <button onClick={() => this.props.logOut()}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Login</h2>
          <br/>
          <input type="text" ref="identifier" placeholder="Username"/>
          <input type="password" ref="password" placeholder="Password"/>
          <button onClick={() => this.props.tryLogin(this.refs.identifier.value, this.refs.password.value)}>Login</button>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.conditionalLoginForm(this.props.token)}
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ tryLogin, logOut}, dispatch);
};
const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginFormContainer;
