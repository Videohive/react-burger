import request from "../../utils/request";

import {
  FORGOT_PASSWORD_SUBMIT,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from "./index";

export function forgotPassword(form) {
  const body = {email: form.email};
  const data = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=utf-8"
    }
  };
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_SUBMIT,
    });
    request('password-reset', data)
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
