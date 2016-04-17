import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { bindActionCreators, createStore, combineReducers, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import axios from "axios";
import { Router, Route, browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from "react-router-redux";

// BASE AXIOS CONFIGURATION

const axiosConfig = (token) => {
  const headers = { "Accept": "application/json", "Content-Type": "application/json"}
  if (token) {
    return { "headers": Object.assign({}, headers, { "Authorization": token })};
  } else {
    return { "headers": headers };
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
      return jwt;
    case FETCH_TOKEN:
      const token = action.payload.data.token;
      localStorage.setItem('jwt', token);
      return token;
    case LOG_OUT:
      localStorage.removeItem('jwt');
      return null;
  }
  return state;
};

const usersReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_USERS:
      const users = action.payload.data.data.map((user) => {
        return {
          id: user.id,
          email: user.attributes.email,
          username: user.attributes.username
        };
      });
      return users;
  }
  return state;
};

let createMiddlewareStore = applyMiddleware(ReduxPromise)(createStore);
const newRouterMiddleware = routerMiddleware(browserHistory);
const store = createMiddlewareStore(
  combineReducers({
    token: logInReducer,
    users: usersReducer,
    routing: routerReducer
  }),
  applyMiddleware(newRouterMiddleware)
);


const history = syncHistoryWithStore(browserHistory, store);

// ACTION CREATORS
const tryLogin = (identifier, password) => {
  const request = axios
    .post("http://localhost:4000/api/login", { username: identifier, password }, axiosConfig());
  return { type: FETCH_TOKEN, payload: request };
};

const logOut = () => {
  return { type: LOG_OUT };
};

const fetchUsers = (token) => {
  const request = axios
    .get("http://localhost:4000/api/users", axiosConfig(token));
  return { type: FETCH_USERS, payload: request };
};

const redirectToRoot = () => {
  return push("/");
}

// COMPONENTS

class App extends Component {
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

// INITIAL STATE

store.dispatch({ type: APP_START });

// APP

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="login" component={LoginFormContainer} />
        <Route path="users" component={UserListContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app")
);
