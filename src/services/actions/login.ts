import { AppThunk } from "../types";
import request from "../../utils/request";

import { LOGIN_SUBMIT, LOGIN_SUCCESS, LOGIN_ERROR } from "./index";

import { TUserData, TLogin } from "../../utils/types";

export interface ILoginAction {
  readonly type: typeof LOGIN_SUBMIT;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUserData;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_ERROR;
}

export type TLoginActions =
  | ILoginAction
  | ILoginSuccessAction
  | ILoginFailedAction;

export const loginAction = (): ILoginAction => ({
  type: LOGIN_SUBMIT,
});

export const loginSuccessAction = (user: TUserData): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_ERROR,
});

export const login = (form: TLogin): AppThunk => {
  const { email, password } = form;
  const data = {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  return function (dispatch) {
    dispatch(loginAction());
    request("auth/login", data)
      .then((data) => {
        dispatch(loginSuccessAction(data.user));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch((err) => {
        dispatch(loginFailedAction())
        console.log(err);
      });
  };
}
