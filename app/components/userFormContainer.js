import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveUser, redirectToUsersList } from "../actions/index";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
  }
  componentWillMount() {
    if (this.props.params.userId) {
      const users = this.props.users.filter((searchUser) => {
        return searchUser.id == this.props.params.userId;
      });
      const user = users[0];
      this.setState({
        user: {
          id: user.id,
          username: user.username,
          password: '',
          email: user.email
        }
      });
    } else {
      this.setState({
        user: {
          id: null,
          username: '',
          password: '',
          email: ''
        }
      });
    }
  }
  saveUser() {
    const user = {
      id: this.state.user.id,
      username: this.refs.username.value,
      password: this.refs.password.value,
      email: this.refs.email.value
    };
    this.props.saveUser(user, this.props.token)
      .then(() => {
        this.props.redirectToUsersList();
      });
  }
  render() {
    return (
      <div>
        <h3>User Form</h3>
        <br />
        <input type="text" placeholder="Username" defaultValue={this.state.user.username} ref="username" />
        <br />
        <input type="password" placeholder="Password" defaultValue={this.state.user.password} ref="password"/>
        <br />
        <input type="email" placeholder="Email" defaultValue={this.state.user.email} ref="email"/>
        <br />
        <button onClick={() => { this.saveUser()}}>Save</button>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    users: state.users,
    token: state.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ saveUser, redirectToUsersList }, dispatch);
};
const UserFormContainer = connect(mapStateToProps, mapDispatchToProps)(UserForm);

export default UserFormContainer;
