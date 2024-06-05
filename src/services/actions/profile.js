import request from "../../utils/request";

import {
  EDIT_PROFILE_SUBMIT,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERROR,

  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,

  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from "../actions";

export function getUser() {
  const data = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    request('auth/user', data)
      .then((data) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: data.user,
        });
      })
      .catch((err) => {
        if (err.message === "invalid token") {
          dispatch(refreshToken());
        } else {
          dispatch({
            type: GET_USER_ERROR,
            message: err.message,
          });
          console.log(err);
        }
      });
  };
}

export function editProfile(form) {
  const body = {
    email: form.email,
    password: form.password,
    name: form.name
  };
  const data = {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=utf-8",
      Authorization: localStorage.getItem("accessToken"),
    }
  };
  return function (dispatch) {
    dispatch({
      type: EDIT_PROFILE_SUBMIT,
    });
    request('auth/user', data)
      .then((data) => {
        dispatch({
          type: EDIT_PROFILE_SUCCESS,
          user: data.user,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(refreshToken());
        } else {
          dispatch({
            type: EDIT_PROFILE_ERROR,
            message: err.message,
          });
        }
      });
  };
}

export function refreshToken() {
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    request('auth/token', data)
      .then((data) => {
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      })
      .catch((err) => {
        console.error('Failed to refresh token:', err);
        dispatch({
          type: REFRESH_TOKEN_ERROR,
        });
        console.log(err);
      });
  };
}

export function logout() {
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    }),
  };
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    request('auth/logout', data)
      .then(() => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_ERROR,
        });
        console.log(err);
      });
  };
}
