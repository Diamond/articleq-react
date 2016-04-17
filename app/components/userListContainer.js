import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsers, redirectToRoot } from "../actions/index";

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
  userList(users) {
    if (users.length === 0) {
      return <li>No users yet!</li>;
    } else {
      return users.map((user) => <li key={user.username}>{user.username} ({user.email})</li>);
    }
  }
  render() {
    return (
      <div>
        <h2>User List</h2>
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
  return bindActionCreators({ fetchUsers, redirectToRoot }, dispatch);
}
const UserListContainer = connect(mapUserStateToProps, mapUserDispatchToProps)(UserList);

export default UserListContainer;
