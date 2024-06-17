import { Dispatch } from "redux";
import request from "../../utils/request";

import { LOGIN_SUBMIT, LOGIN_SUCCESS, LOGIN_ERROR } from "./index";

import { TLogin } from "../../utils/types";

export function login(form: TLogin) {
  const { email, password } = form;
  const data = {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  return function (dispatch: Dispatch) {
    dispatch({
      type: LOGIN_SUBMIT,
    });
    request("auth/login", data)
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
