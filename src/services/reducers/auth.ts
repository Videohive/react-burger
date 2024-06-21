import {
  REGISTER_SUBMIT,
  REGISTER_SUCCESS,
  REGISTER_ERROR,

  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

  FORGOT_PASSWORD_SUBMIT,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,

  RESET_PASSWORD_SUBMIT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,

  EDIT_PROFILE_SUBMIT,
  EDIT_PROFILE_ERROR,
  EDIT_PROFILE_SUCCESS,
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS
} from "../actions";

import { TProfile } from "../../utils/types";
import { TRegisterActions } from '../actions/register';
import { TForgotPasswordActions } from '../actions/forgot-password';
import { TResetPasswordActions } from '../actions/reset-password';
import { TLoginActions } from '../actions/login';
import { TProfileActions } from '../actions/profile';

type TAuthState  = {
  isAuthenticated: boolean;

  user: TProfile;

  registerRequest: boolean;
  registerError: boolean;

  loginRequest: boolean;
  loginError: boolean;

  forgotPasswordRequest: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordError: boolean;

  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordError: boolean;

  editProfileRequest: boolean;
  editProfileError: boolean;

  getUserRequest: boolean;
  getUserError: boolean;

  refreshTokenRequest: boolean;
  refreshTokenError: boolean;

  logoutRequest: boolean;
  logoutError: boolean;
};

const InitialState : TAuthState = {
  isAuthenticated: false,

  user: {
    name: "",
    email: "",
    password: "",
  },

  registerRequest: false,
  registerError: false,

  loginRequest: false,
  loginError: false,

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordError: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordError: false,

  editProfileRequest: false,
  editProfileError: false,

  getUserRequest: false,
  getUserError: false,

  refreshTokenRequest: false,
  refreshTokenError: false,

  logoutRequest: false,
  logoutError: false
};

type TAuthActions =
  | TRegisterActions
  | TForgotPasswordActions
  | TResetPasswordActions
  | TLoginActions
  | TProfileActions

export const authReducer = (state = InitialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case REGISTER_SUBMIT: {
      return {
        ...state,
        registerRequest: true,
        registerError: false,
      };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
        },
        isAuthenticated: true,
      };
    }

    case REGISTER_ERROR: {
      return {
        ...state,
        registerRequest: false,
        registerError: true,
      };
    }

    case LOGIN_SUBMIT: {
      return {
        ...state,
        loginRequest: true,
        loginError: false,
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
        },
        isAuthenticated: true,
      }
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        loginRequest: false,
        loginError: true,
      }
    }

    case FORGOT_PASSWORD_SUBMIT: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordError: false,
        forgotPasswordSuccess: false,
      }
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
      }
    }

    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordError: true,
      }
    }

    case RESET_PASSWORD_SUBMIT: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordError: false,
        resetPasswordSuccess: false,
      }
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true,
      }
    }

    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: true,
      }
    }

    case EDIT_PROFILE_SUBMIT: {
      return {
        ...state,
        editProfileRequest: true,
        editProfileError: false,
      }
    }

    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        editProfileRequest: false,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
        }
      }
    }

    case EDIT_PROFILE_ERROR: {
      return {
        ...state,
        editProfileRequest: false,
        editProfileError: true,
      }
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserError: false,
      }
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
        }
      }
    }

    case GET_USER_ERROR: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: true,
        isAuthenticated: false,
      }
    }

    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenError: false,
        getUserError: false,
        editProfileError: false,
      }
    }

    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        isAuthenticated: true
      }
    }

    case REFRESH_TOKEN_ERROR: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenError: true,
        isAuthenticated: false,
      }
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        isAuthenticated: false,
        logoutRequest: true,
        logoutError: false,
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        logoutRequest: false,
      }
    }

    case LOGOUT_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        logoutRequest: false,
        logoutError: true,
      }
    }

    default: {
      return state;
    }
  }
};
