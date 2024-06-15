import { Dispatch } from "redux";
import request from "../../utils/request";

import {
  FORGOT_PASSWORD_SUBMIT,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from "./index";

import { TForgotPassword } from "../../utils/types";

export function forgotPassword(form: TForgotPassword) {
  const { email } = form;
  const data = {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  };
  return function (dispatch: Dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_SUBMIT,
    });
    request("password-reset", data)
      .then(() => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_ERROR,
        });
        console.log(err);
      });
  };
}
