import { AppThunk } from "../types";
import request from "../../utils/request";

import {
  FORGOT_PASSWORD_SUBMIT,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from "./index";

import { TForgotPassword } from "../../utils/types";

export interface IForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD_SUBMIT;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export type TForgotPasswordActions =
  | IForgotPasswordAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction

export const forgotPasswordAction = (): IForgotPasswordAction => ({
  type: FORGOT_PASSWORD_SUBMIT,
});

export const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_ERROR,
});

export const forgotPassword = (form:  TForgotPassword): AppThunk => {
  const { email } = form;
  const data = {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  };
  return function (dispatch) {
    dispatch(forgotPasswordAction());
    request("password-reset", data)
      .then(() => {
        dispatch(forgotPasswordSuccessAction());
      })
      .catch((err) => {
        dispatch(forgotPasswordFailedAction());
        console.log(err);
      });
  };
}
