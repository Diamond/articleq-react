import { APP_START, LOG_OUT, FETCH_TOKEN } from "../actions/index";

const loginReducer = (state=null, action) => {
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

export default loginReducer;
