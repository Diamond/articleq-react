import { FETCH_USERS } from "../actions/index";

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

export default usersReducer;
