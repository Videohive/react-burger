import { AppThunk } from "../types";
import request from "../../utils/request";

import {
  EDIT_PROFILE_SUBMIT,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from ".";

import { TProfile, TUserData } from "../../utils/types";

export interface IEditProfileAction {
  readonly type: typeof EDIT_PROFILE_SUBMIT;
}

export interface IEditProfileSuccessAction {
  readonly type: typeof EDIT_PROFILE_SUCCESS;
  readonly user: TUserData;
}

export interface IEditProfileFailedAction {
  readonly type: typeof EDIT_PROFILE_ERROR;
  readonly message: string;
}

export interface IGetUserAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUserData;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_ERROR;
  readonly message: string;
}

export interface IRefreshTokenAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_ERROR;
}

export interface ILogoutAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_ERROR;
}

export type TProfileActions =
  | IEditProfileAction
  | IEditProfileSuccessAction
  | IEditProfileFailedAction
  | IGetUserAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IRefreshTokenAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction
  | ILogoutAction
  | ILogoutSuccessAction
  | ILogoutFailedAction;

export const getUserAction = (): IGetUserAction => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccessAction = (
  user: TUserData
): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  user,
});

export const getUserFailedAction = (message: string): IGetUserFailedAction => ({
  type: GET_USER_ERROR,
  message,
});

export const editProfileAction = (): IEditProfileAction => ({
  type: EDIT_PROFILE_SUBMIT,
});

export const editProfileSuccessAction = (
  user: TUserData
): IEditProfileSuccessAction => ({
  type: EDIT_PROFILE_SUCCESS,
  user,
});

export const editProfileFailedAction = (
  message: string
): IEditProfileFailedAction => ({
  type: EDIT_PROFILE_ERROR,
  message,
});

export const refreshTokenAction = (): IRefreshTokenAction => ({
  type: REFRESH_TOKEN_REQUEST,
});

export const refreshTokenSuccessAction = (): IRefreshTokenSuccessAction => ({
  type: REFRESH_TOKEN_SUCCESS,
});

export const refreshTokenFailedAction = (): IRefreshTokenFailedAction => ({
  type: REFRESH_TOKEN_ERROR,
});

export const logoutAction = (): ILogoutAction => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_ERROR,
})

export const getUser = (): AppThunk =>  {
  const data = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") as string,
    },
  };
  return function (dispatch) {
    dispatch(getUserAction());
    request("auth/user", data)
      .then((data) => {
        dispatch(getUserSuccessAction(data.user));
      })
      .catch((err) => {
        if (err.message === "invalid token") {
          dispatch(refreshToken());
        } else {
          dispatch(getUserFailedAction(err.message));
          console.log(err);
        }
      });
  };
}

export const editProfile = (form: TProfile): AppThunk => {
  const body = {
    email: form.email,
    password: form.password,
    name: form.name,
  };
  const data = {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=utf-8",
      Authorization: localStorage.getItem("accessToken") as string,
    },
  };
  return function (dispatch) {
    dispatch(editProfileAction());
    request("auth/user", data)
      .then((data) => {
        dispatch(editProfileSuccessAction(data.user));
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(refreshToken());
        } else {
          dispatch(editProfileFailedAction(err.message));
        }
      });
  };
}

export const refreshToken = (): AppThunk =>  {
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  return function (dispatch) {
    dispatch(refreshTokenAction());
    request("auth/token", data)
      .then((data) => {
        dispatch(refreshTokenSuccessAction());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch((err) => {
        console.error("Failed to refresh token:", err);
        dispatch(refreshTokenFailedAction());
        console.log(err);
      });
  };
}

export const logout = (): AppThunk => {
    const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  return async function (dispatch) {
    dispatch(logoutAction());
    await request("auth/logout", data)
      .then(() => {
        dispatch(logoutSuccessAction())
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .catch((err) => {
        dispatch(logoutFailedAction())
        console.log(err);
      });
  };
}
