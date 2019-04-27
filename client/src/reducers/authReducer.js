import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        user: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;   
  }
}
