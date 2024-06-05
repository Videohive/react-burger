import request from "../../utils/request";

import {
  REGISTER_SUBMIT,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "./index";

export function register(form) {
  const body = {
    email: form.email,
    password: form.password,
    name: form.name
  };
  const data = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body),
  };
  return function (dispatch) {
    dispatch({
      type: REGISTER_SUBMIT,
    });
    request('auth/register', data)
      .then((data) => {
        dispatch({
          type: REGISTER_SUCCESS,
          user: data.user,
        });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_ERROR,
        });
        console.log(err);
      });
  };
}
