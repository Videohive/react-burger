import { authReducer, InitialState } from "./auth";
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
    REFRESH_TOKEN_SUCCESS,
} from "../actions";


describe("authReducer", () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(
            InitialState
        )
    })

    it('should handle REGISTER_SUBMIT', () => {
        const action = {
            type: REGISTER_SUBMIT,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            registerRequest: true,
            registerError: false,
        });
    });

    it('should handle REGISTER_SUCCESS', () => {
        const action = {
            type: REGISTER_SUCCESS,
            user: {
                name: 'name',
                email: '',
            }
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            registerRequest: false,
            user: {
                ...InitialState.user,
                name: action.user.name,
                email: action.user.email,
            },
            isAuthenticated: true,
        });
    });

    it('should handle REGISTER_ERROR', () => {
        const action = {
            type: REGISTER_ERROR,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            registerRequest: false,
            registerError: true,
        });
    });

    it('should handle LOGIN_SUBMIT', () => {
        const action = {
            type: LOGIN_SUBMIT,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            loginRequest: true,
            loginError: false,
        })
    });

    it('should handle LOGIN_SUCCESS', () => {
        const action = {
            type: LOGIN_SUCCESS,
            user: {
                name: '',
                email: '',
            }
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            loginRequest: false,
            user: {
                ...InitialState.user,
                name: action.user.name,
                email: action.user.email,
            },
            isAuthenticated: true,
        });
    });

    it('should handle LOGIN_ERROR', () => {
        const action = {
            type: LOGIN_ERROR,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            loginRequest: false,
            loginError: true,
        })
    });

    it('should handle FORGOT_PASSWORD_SUBMIT', () => {
        const action = {
            type: FORGOT_PASSWORD_SUBMIT,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            forgotPasswordRequest: true,
            forgotPasswordError: false,
            forgotPasswordSuccess: false,
        })
    });

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        const action = {
            type: FORGOT_PASSWORD_SUCCESS,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            forgotPasswordRequest: false,
            forgotPasswordSuccess: true,
        })
    });

    it('should handle FORGOT_PASSWORD_ERROR', () => {
        const action = {
            type: FORGOT_PASSWORD_ERROR,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            forgotPasswordRequest: false,
            forgotPasswordError: true,
        })
    });

    it('should handle RESET_PASSWORD_SUBMIT', () => {
        const action = {
            type: RESET_PASSWORD_SUBMIT,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            resetPasswordRequest: true,
            resetPasswordError: false,
            resetPasswordSuccess: false,
        })
    });

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        const action = {
            type: RESET_PASSWORD_SUCCESS,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            resetPasswordRequest: false,
            resetPasswordSuccess: true,
        })
    });

    it('should handle RESET_PASSWORD_ERROR', () => {
        const action = {
            type: RESET_PASSWORD_ERROR,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            resetPasswordRequest: false,
            resetPasswordError: true,
        })
    });

    it('should handle EDIT_PROFILE_SUBMIT', () => {
        const action = {
            type: EDIT_PROFILE_SUBMIT,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            editProfileRequest: true,
            editProfileError: false,
        })
    });

    it('should handle EDIT_PROFILE_SUCCESS', () => {
        const action = {
            type: EDIT_PROFILE_SUCCESS,
            user: {
                name: '',
                email: '',
            }
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            editProfileRequest: false,
            user: {
                ...InitialState.user,
                name: action.user.name,
                email: action.user.email,
            }
        });
    });

    it('should handle EDIT_PROFILE_ERROR', () => {
        const action = {
            type: EDIT_PROFILE_ERROR,
            message: '',
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            editProfileRequest: false,
            editProfileError: true,
        })
    });

    it('should handle GET_USER_REQUEST', () => {
        const action = {
            type: GET_USER_REQUEST,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            getUserRequest: true,
            getUserError: false,
        })
    });

    it('should handle GET_USER_SUCCESS', () => {
        const action = {
            type: GET_USER_SUCCESS,
            user: {
                name: '',
                email: '',
            }
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            getUserRequest: false,
            isAuthenticated: true,
            user: {
                ...InitialState.user,
                name: action.user.name,
                email: action.user.email,
            }
        });
    });

    it('should handle GET_USER_ERROR', () => {
        const action = {
            type: GET_USER_ERROR,
            message: ''
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            getUserRequest: false,
            getUserError: true,
            isAuthenticated: false,
        })
    });

    it('should handle REFRESH_TOKEN_REQUEST', () => {
        const action = {
            type: REFRESH_TOKEN_REQUEST,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            refreshTokenRequest: true,
            refreshTokenError: false,
            getUserError: false,
            editProfileError: false,
            })
        });

    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        const action = {
            type: REFRESH_TOKEN_SUCCESS,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            refreshTokenRequest: false,
            isAuthenticated: true
        });
    });

    it('should handle REFRESH_TOKEN_ERROR', () => {
        const action = {
            type: REFRESH_TOKEN_ERROR,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            refreshTokenRequest: false,
            refreshTokenError: true,
            isAuthenticated: false,
        })
    });

    it('should handle LOGOUT_REQUEST', () => {
        const action = {
            type: LOGOUT_REQUEST,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            isAuthenticated: false,
            logoutRequest: true,
            logoutError: false,
        })
    });

    it('should handle LOGOUT_SUCCESS', () => {
        const action = {
            type: LOGOUT_SUCCESS,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            logoutRequest: false,
        });
    });

    it('should handle LOGOUT_ERROR', () => {
        const action = {
            type: LOGOUT_ERROR,
        };
        expect(authReducer(InitialState, action)).toEqual({
            ...InitialState,
            logoutRequest: false,
            logoutError: true,
        })
    });
})
