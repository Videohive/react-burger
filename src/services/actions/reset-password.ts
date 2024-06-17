import { Dispatch } from "redux";
import request from "../../utils/request";

import {
  RESET_PASSWORD_SUBMIT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from "./index";

import { TResetPassword } from "../../utils/types";

export function resetPassword(form: TResetPassword) {
  const { token, password } = form;
  const data = {
    method: "POST",
    body: JSON.stringify({ token, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return function (dispatch: Dispatch) {
    dispatch({
      type: RESET_PASSWORD_SUBMIT,
    });
    request("password-reset/reset", data)
      .then((data) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_ERROR,
        });
        console.log(err);
      });
  };
}
