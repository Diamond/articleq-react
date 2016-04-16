import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { bindActionCreators, createStore, combineReducers, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import axios from "axios";

// BASE AXIOS CONFIGURATION

const axiosConfig = (token) => {
  const base = { "headers": { "Accept": "application/json", "Content-Type": "application/json"} };
  if (token) {
    return Object.assign({}, base, { "Authorization": token });
  } else {
    return base;
  }
};

// ACTION CONSTANTS

// LOGIN ACTIONS
const APP_START   = "APP_START";
const LOG_IN      = "LOG_IN";
const LOG_OUT     = "LOG_OUT";
const FETCH_TOKEN = "FETCH_TOKEN";

// USER ACTIONS
const FETCH_USERS = "FETCH_USERS";
// const EDIT_USER   = "EDIT_USER";
// const SAVE_USER   = "SAVE_USER";
// const DELETE_USER = "DELETE_USER";

// REDUCERS

const logInReducer = (state=null, action) => {
  switch (action.type) {
    case APP_START:
      const jwt = localStorage.getItem('jwt');
      console.log("Received App Start:", jwt);
      return jwt;
    case FETCH_TOKEN:
      const token = action.payload.data.token;
      console.log("Received log in:", token);
      localStorage.setItem('jwt', token);
      return token;
    case LOG_OUT:
      console.log("Received log out");
      localStorage.removeItem('jwt');
      return null;
  }
  return state;
};

const usersReducer = (state=["Brandon"], action) => {
  switch (action.type) {
    case FETCH_USERS:
      console.log("Fetch users received");
      return state;
  }
  return state;
};

const createMiddlewareStore = applyMiddleware(ReduxPromise)(createStore);
const store = createMiddlewareStore(combineReducers({token: logInReducer, users: usersReducer}));

// ACTION CREATORS
const tryLogin = (identifier, password) => {
  const request = axios.post("http://localhost:4000/api/login", { username: identifier, password }, axiosConfig());
  return { type: FETCH_TOKEN, payload: request };
};

const logOut = () => {
  console.log("Dispatch log out");
  return { type: LOG_OUT };
};

// COMPONENTS

class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to React!</h1>
        <div>
          <a href="#">Login</a>
        </div>
        <LoginFormContainer />
        <UserListContainer />
      </div>
    );
  }
};

class Login extends Component {
  render() {
    return (
      <div>
        <a href="#">Login</a>
      </div>
    )
  }
};

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

class UserList extends Component {
  constructor(props) {
    super(props);
  }
  userList(users) {
    if (users.length === 0) {
      return <li>No users yet!</li>;
    } else {
      return users.map((user) => <li key={user}>{user}</li>);
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
    users: state.users
  };
};
const UserListContainer = connect(mapUserStateToProps)(UserList);

// INITIAL STATE

store.dispatch({ type: APP_START });

// APP

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
