import { AppThunk } from '../types';
import request from "../../utils/request";

import {
  RESET_PASSWORD_SUBMIT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from "./index";

import { TResetPassword } from "../../utils/types";

export interface IResetPasswordAction {
  readonly type: typeof RESET_PASSWORD_SUBMIT,
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS,
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_ERROR,
}

export type TResetPasswordActions =
  | IResetPasswordAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction;

export const resetPasswordAction = (): IResetPasswordAction => ({
  type: RESET_PASSWORD_SUBMIT,
});

export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_ERROR,
});

export const resetPassword = (form: TResetPassword): AppThunk => {
  const { token, password } = form;
  const data = {
    method: "POST",
    body: JSON.stringify({ token, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return function (dispatch) {
    dispatch(resetPasswordAction());
    request("password-reset/reset", data)
      .then((data) => {
        dispatch(resetPasswordSuccessAction());
      })
      .catch((err) => {
        dispatch(resetPasswordFailedAction());
        console.log(err);
      });
  };
}
