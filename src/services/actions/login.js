import request from "../../utils/request";

import {
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "./index";

export function login(form) {
  const body = {
    email: form.email,
    password: form.password
  };
  const data = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  return function (dispatch) {
    dispatch({
      type: LOGIN_SUBMIT,
    });
    request('auth/login', data)
      .then((data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          user: data.user,
        });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
        });
        console.log(err);
      });
  };
}
