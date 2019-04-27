import axios from "axios";

import { SET_ERROR, SET_USER } from "./types";


// Login - get user token
export const loginUser = cookieJwt => async dispatch => {
 
  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': cookieJwt
  };
  try {
    const response = await axios.get('/api/user', { headers });
    const { user } = response.data;
    localStorage.setItem('token', cookieJwt);
    
    dispatch({
      type: SET_USER,
      payload: user
    });

  } catch(err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data
    })
  }
}


// Log user out
export const logoutUser = () => dispatch => {

}
