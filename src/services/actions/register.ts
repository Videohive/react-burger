import { Dispatch } from "redux";
import request from "../../utils/request";

import { REGISTER_SUBMIT, REGISTER_SUCCESS, REGISTER_ERROR } from "./index";

import { TRegister } from "../../utils/types";

export function register(form: TRegister) {
  const { email, password, name } = form;

  const data = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email, password, name }),
  };
  return function (dispatch: Dispatch) {
    dispatch({
      type: REGISTER_SUBMIT,
    });
    request("auth/register", data)
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
