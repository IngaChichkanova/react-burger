import { setCookie, deleteCookie } from '../../utils/set-cookie';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILED,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILED,
    SET_USER,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from '../constants/user';

import { registerRequest, loginRequest, logoutRequest, forgotPasswordRequest, resetPasswordRequest, getUserRequestAction, editUserRequest } from '../../utils/burger-api';

import { TUser, AppDispatch, AppThunkAction } from '../../utils/types';

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly payload?: boolean;
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
    readonly payload?: string;
}

export interface ISignInRequestAction {
    readonly type: typeof SIGN_IN_REQUEST;
}

export interface ISignInSuccessAction {
    readonly type: typeof SIGN_IN_SUCCESS;
    readonly payload?: boolean;
}

export interface ISignInFailedAction {
    readonly type: typeof SIGN_IN_FAILED;
    readonly payload?: string;
}

export interface ISignOutRequestAction {
    readonly type: typeof SIGN_OUT_REQUEST;
}

export interface ISignOutSuccessAction {
    readonly type: typeof SIGN_OUT_SUCCESS;
    readonly payload?: boolean;
}

export interface ISignOutFailedAction {
    readonly type: typeof SIGN_OUT_FAILED;
}

export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
    readonly payload?: boolean;
}

export interface IResetPasswordAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly payload?: boolean;
}

export interface IForgotPasswordAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IUserdRequestAction {
    readonly type: typeof USER_REQUEST;
}

export interface IUserSuccessAction {
    readonly type: typeof USER_SUCCESS;
    readonly payload?: boolean;
}

export interface IUserFailedAction {
    readonly type: typeof USER_FAILED;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly payload?: null | TUser;
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface ISetUserAction {
    readonly type: typeof SET_USER;
    readonly payload: null | TUser;
}

export type TUserAction =
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | ISetUserAction
    | ISignInRequestAction
    | ISignInSuccessAction
    | ISignInFailedAction
    | ISignOutRequestAction
    | ISignOutSuccessAction
    | ISignOutFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordAction
    | IResetPasswordAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IUserdRequestAction
    | IUserSuccessAction
    | IUserFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    ;

export const register = async (email: string, password: string, name: string, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined> => {
    dispatch({ type: REGISTER_REQUEST });
    return await registerRequest(email, password, name)
        .then(response => {
            let accessToken;
            accessToken = response.accessToken ? response.accessToken.split('Bearer ')[1] : undefined;
            if (accessToken) {
                setCookie('token', accessToken);
            }

            if (response.refreshToken) {
                localStorage.setItem("refreshToken", response.refreshToken);
            }

            if (response.success) {
                if (response.user) {
                    dispatch({ type: SET_USER, payload: response.user });
                }
            }

            dispatch({ type: REGISTER_SUCCESS, payload: response.success });


            return response.success
        })
        .catch((e) => {
            dispatch({ type: REGISTER_FAILED, payload: `: ${e.message}` });
            return false
        });
}

export const signIn = async (email: string, password: string, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined> => {
    dispatch({ type: SIGN_IN_REQUEST });
    return await loginRequest(email, password).then(response => {
        let accessToken;
        accessToken = response.accessToken ? response.accessToken.split('Bearer ')[1] : undefined;
        if (accessToken) {
            setCookie('token',
                accessToken
            );
        }

        if (response.refreshToken) {
            localStorage.setItem("refreshToken", response.refreshToken);
        }

        if (response.success) {
            if (response.user) {
                dispatch({ type: SET_USER, payload: response.user });
            }
        }

        dispatch({ type: SIGN_IN_SUCCESS, payload: response.success });

        return response.success
    })
        .catch((e) => {
            dispatch({ type: SIGN_IN_FAILED, payload: `: ${e.message}` });
            return false
        });
};

export const signOut = async (dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined> => {
    dispatch({ type: SIGN_OUT_REQUEST });
    if (localStorage.getItem("refreshToken")) {
        return await logoutRequest().then(response => {
            deleteCookie('token');
            localStorage.removeItem("refreshToken");

            if (response.success) {
                dispatch({ type: SET_USER, payload: null })
            }

            dispatch({ type: SIGN_OUT_SUCCESS, payload: response.success });

            return response.success
        })
            .catch(() => {
                dispatch({ type: SIGN_OUT_FAILED });
                return false;
            });
    } else {
        dispatch({ type: SIGN_OUT_FAILED });
        return false;
    }
};

export const forgotPassword = async (email: string, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined> => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    return await forgotPasswordRequest(email)
        .then(response => {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS });
            return response.success
        })
        .catch(() => {
            dispatch({ type: FORGOT_PASSWORD_FAILED });
            return false
        });
}

export const resetPassword = async (password: string, token: string, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined> => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    return await resetPasswordRequest(password, token)
        .then(response => {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
            return response.success
        })
        .catch(() => {
            dispatch({ type: RESET_PASSWORD_FAILED });
            return false
        });
}

export const getUser = async (dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined | void> => {
    dispatch({ type: USER_REQUEST });

    return await getUserRequestAction()
        .then(response => {
            if (response.success) {
                if (response.user) {
                    dispatch({ type: SET_USER, payload: response.user });
                }
            }
            dispatch({ type: USER_SUCCESS, payload: response.success });
            return response.success;
        })
        .catch(() => {
            dispatch({ type: USER_FAILED });
            return false
        });
};

export const editUser = async (email: string, password: string, name: string, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined | void> => {
    dispatch({
        type: GET_USER_REQUEST
    });
    return await editUserRequest(email, password, name)
        .then(response => {
            if (response.success) {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: response.user
                });
            } else {
                dispatch({
                    type: GET_USER_FAILED
                });
            }

        })
        .catch(() => {
            dispatch({
                type: GET_USER_FAILED
            });
        });
};

