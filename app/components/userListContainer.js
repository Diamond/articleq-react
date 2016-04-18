import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsers, redirectToRoot, deleteUser } from "../actions/index";
import { Link } from "react-router";

class UserList extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (this.props.token) {
      this.props.fetchUsers(this.props.token);
    } else {
      this.props.redirectToRoot();
    }
  }
  userItem(user) {
    return (
      <li key={user.username}>
        {user.username} ({user.email})
        &nbsp;
        <Link to={`/users/${user.id}/edit`}>Edit</Link>
        &nbsp;
        <a href="#" onClick={(event) => { event.preventDefault(); this.props.deleteUser(user, this.props.token); }}>Delete</a>
      </li>
    );
  }
  userList(users) {
    if (users.length === 0) {
      return (
        <li>No users yet!</li>
      );
    } else {
      return users.map((user) => this.userItem(user));
    }
  }
  render() {
    return (
      <div>
        <h2>User List</h2>
        <div>
          <Link to="/users/new">Add User</Link>
        </div>
        <ul>
          {this.userList(this.props.users)}
        </ul>
      </div>
    );
  };
};
const mapUserStateToProps = (state) => {
  return {
    token: state.token,
    users: state.users
  };
};
const mapUserDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUsers, redirectToRoot, deleteUser }, dispatch);
}
const UserListContainer = connect(mapUserStateToProps, mapUserDispatchToProps)(UserList);

export default UserListContainer;
