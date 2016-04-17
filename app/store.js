import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer, routerMiddleware } from "react-router-redux";

import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import { APP_START } from "./actions/index";

let createMiddlewareStore = applyMiddleware(ReduxPromise)(createStore);
const newRouterMiddleware = routerMiddleware(browserHistory);
const store = createMiddlewareStore(
  combineReducers({
    token: loginReducer,
    users: usersReducer,
    routing: routerReducer
  }),
  applyMiddleware(newRouterMiddleware)
);
store.dispatch({ type: APP_START });
const history = syncHistoryWithStore(browserHistory, store);

export { store, history };
