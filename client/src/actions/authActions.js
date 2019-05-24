import axios from "axios";
import Cookies from "js-cookie";

import {
  SET_ERROR,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER_WITH_EMAIL,
  LOGIN_USER_WITH_EMAIL
} from "./types";

export const registerUserWithEmail = (formData, cb, cbErr) => async (
  dispatch,
  getState
) => {
  try {
    const response = await axios.post("/auth/register", formData);

    dispatch({
      type: REGISTER_USER_WITH_EMAIL
    });
    cb();
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data
    });
    cbErr();
  }
};

export const loginUserWithEmail = (formData, cb, cbErr) => async (
  dispatch,
  getState
) => {
  try {
    const response = await axios.post("/auth/login", formData);
    dispatch({
      type: LOGIN_USER_WITH_EMAIL
    });
    cb();
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data
    });
    cbErr();
  }
};

// Login - get user token
export const logInUser = () => async (dispatch, getState) => {
  try {
    // register
    const cookieJwt = Cookies.get("x-auth-cookie");
    if (cookieJwt) {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": cookieJwt
      };

      const response = await axios.get("/api/user", { headers });
      localStorage.setItem("token", cookieJwt);
      Cookies.remove("x-auth-cookie"); //delete just that cookie

      dispatch({
        type: LOGIN_USER,
        payload: response.data.user
      });
      return;
    }
    // logged in
    const token = localStorage.getItem("token");
    if (token) {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": token
      };

      const response = await axios.get("/api/user", { headers });
      dispatch({
        type: LOGIN_USER,
        payload: response.data.user
      });
      return;
    }
  } catch (err) {
    localStorage.removeItem("token");
    Cookies.remove("x-auth-cookie");
    dispatch({
      type: SET_ERROR,
      payload: err.response.data
    });
  }
};

// Log user out
export const logOutUser = cb => async dispatch => {
  try {
    localStorage.removeItem("token");
    deleteAllCookies();
    await axios.get("/auth/logout");

    dispatch({
      type: LOGOUT_USER,
      payload: false
    });
    cb();
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data
    });
    cb();
  }
};

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
