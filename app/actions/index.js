import axios from "axios";
import { axiosConfig } from "../config";
import { push } from "react-router-redux";

export const APP_START   = "APP_START";
export const LOG_IN      = "LOG_IN";
export const LOG_OUT     = "LOG_OUT";
export const FETCH_TOKEN = "FETCH_TOKEN";

// USER ACTIONS
export const FETCH_USERS = "FETCH_USERS";
export const EDIT_USER   = "EDIT_USER";
export const SAVE_USER   = "SAVE_USER";
export const DELETE_USER = "DELETE_USER";

export const tryLogin = (identifier, password) => {
  const request = axios
    .post("http://localhost:4000/api/login", { username: identifier, password }, axiosConfig());
  return { type: FETCH_TOKEN, payload: request };
};

export const logOut = () => {
  return { type: LOG_OUT };
};

export const fetchUsers = (token) => {
  const request = axios
    .get("http://localhost:4000/api/users", axiosConfig(token));
  return { type: FETCH_USERS, payload: request };
};

export const redirectToRoot = () => {
  return push("/");
};

export const redirectToUsersList = () => {
  return push("/users");
};

export const deleteUser = (user, token) => {
  const request = axios
    .delete(`http://localhost:4000/api/users/${user.id}`, axiosConfig(token));
  return { type: DELETE_USER, payload: { request, user_id: user.id } };
};

const formatUserForJsonApi = (user) => {
  return {
    data: {
      id: user.id,
      type: "user",
      attributes: {
        username: user.username,
        password: user.password,
        email: user.email
      }
    }
  };
};

export const saveUser = (user, token) => {
  let request = null;
  if (user.id) {
    request = axios
      .put(`http://localhost:4000/api/users/${user.id}`, formatUserForJsonApi(user), axiosConfig(token));
  } else {
    request = axios
      .post("http://localhost:4000/api/users", formatUserForJsonApi(user), axiosConfig(token));
  }
  return { type: SAVE_USER, payload: request };
};
