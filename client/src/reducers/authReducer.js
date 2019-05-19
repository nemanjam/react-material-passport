import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER_WITH_EMAIL,
  LOGIN_USER_WITH_EMAIL
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case REGISTER_USER_WITH_EMAIL:
    case LOGIN_USER_WITH_EMAIL:
      return state;
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
