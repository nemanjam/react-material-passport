import axios from "axios";
import Cookies from 'js-cookie';

import { SET_ERROR, SET_USER } from "./types";


// Login - get user token
export const logInUser = () => async (dispatch, getState) => {
 
  try {
    const cookieJwt = Cookies.get('x-auth-cookie');
    // console.log('cookie: ', cookieJwt);

    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': cookieJwt
    };
    // fetch user to validate cookie token
    const response = await axios.get('/api/user', { headers });
    // console.log('user: ', response.data.user);
    localStorage.setItem('token', cookieJwt);
    
    dispatch({
      type: SET_USER,
      payload: response.data.user
    });

  } catch(err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data
    });
  }
}


// Log user out
export const logOutUser = () => async dispatch => {
	try {
		await axios.get('/api/logout');
    localStorage.removeItem('token');
    deleteAllCookies();
    
		dispatch({
			type: SET_USER,
			payload: false,
		});
	} catch(err) {
		dispatch({
			type: SET_ERROR,
			payload:  err.response.data
		});
	}
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}