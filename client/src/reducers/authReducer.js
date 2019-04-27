import { SET_USER } from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload
      };
    default:
      return state;
  }
}
