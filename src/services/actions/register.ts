import { AppThunk } from '../types';
import request from "../../utils/request";

import { REGISTER_SUBMIT, REGISTER_SUCCESS, REGISTER_ERROR } from ".";

import {TRegister, TUserData } from "../../utils/types";

export interface IRegisterAction {
  readonly type: typeof REGISTER_SUBMIT;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: TUserData;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_ERROR;
}

export type TRegisterActions =
  | IRegisterAction
  | IRegisterSuccessAction
  | IRegisterFailedAction;

export const registerAction = (): IRegisterAction => ({
  type: REGISTER_SUBMIT,
});

export const registerSuccessAction = (user: TUserData): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  user,
});

export const registerFailedAction = (): IRegisterFailedAction => ({
  type: REGISTER_ERROR,
});

export const register = (form: TRegister): AppThunk => {
  const { email, password, name } = form;

  const data = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email, password, name }),
  };
  return function (dispatch) {
    dispatch(registerAction());
    request("auth/register", data)
      .then((data) => {
        dispatch(registerSuccessAction(data.user));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch((err) => {
        dispatch(registerFailedAction());
        console.log(err);
      });
  };
}
