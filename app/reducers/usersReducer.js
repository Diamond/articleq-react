import { FETCH_USERS, DELETE_USER, ADD_USER, EDIT_USER, SAVE_USER } from "../actions/index";

const usersReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_USERS:
      const fetchedUsers = action.payload.data.data.map((user) => {
        return {
          id: user.id,
          email: user.attributes.email,
          username: user.attributes.username
        };
      });
      return fetchedUsers;
    case DELETE_USER:
      const filteredUsers = state.filter((user) => {
        return user.id != action.payload.user_id;
      });
      return filteredUsers;
  }
  return state;
};

export default usersReducer;
