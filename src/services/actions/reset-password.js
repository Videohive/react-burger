import request from "../../utils/request";

import {
  RESET_PASSWORD_SUBMIT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from "./index";

export function resetPassword(form) {
  const body = {
    token: form.token,
    password: form.password
  };
  const data = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_SUBMIT,
    });
    request('password-reset/reset', data)
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
