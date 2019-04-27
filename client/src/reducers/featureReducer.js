import { GET_FEATURE } from "../actions/types";

const initialState = {
  message: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEATURE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;   
  }
}
