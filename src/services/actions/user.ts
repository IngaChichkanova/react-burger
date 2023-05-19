import { setCookie, deleteCookie } from '../../utils/set-cookie';

import { registerRequest, loginRequest, logoutRequest, forgotPasswordRequest, resetPasswordRequest, getUserRequest, editUserRequest } from '../../utils/burger-api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_REQUEST';
export const REGISTER_FAILED = 'REGISTER_REQUEST';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILED = 'SIGN_OUT_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';
export const SET_USER = 'SET_USER';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const register = async (email: string, password: string, name: string, dispatch: Function) => {
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
                dispatch({ type: SET_USER, payload: response.user })
            }

            dispatch({ type: REGISTER_SUCCESS, payload: response.success });


            return response.success
        })
        .catch((e) => {
            dispatch({ type: REGISTER_FAILED, payload: `: ${e.message}` });
            return false
        });
}

export const signIn = async (email: string, password: string, dispatch: Function) => {
    dispatch({ type: REGISTER_REQUEST });
    return await loginRequest(email, password).then(response => {
        let accessToken;
        accessToken = response.accessToken ? response.accessToken.split('Bearer ')[1] : undefined;
        if (accessToken) {
            setCookie('token',
                accessToken
            );
        }

        if(response.refreshToken){
            localStorage.setItem("refreshToken", response.refreshToken);
        }

        if (response.success) {
            dispatch({ type: SET_USER, payload: response.user })
        }

        dispatch({ type: SIGN_IN_SUCCESS, payload: response.success });

        return response.success
    })
        .catch((e) => {
            dispatch({ type: SIGN_IN_FAILED, payload: `: ${e.message}` });
            return false
        });
};

export const signOut = async (dispatch: Function) => {
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

export const forgotPassword = async (email: string, dispatch: Function) => {
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

export const resetPassword = async (password: string, token: string, dispatch: Function) => {
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

export const getUser = async (dispatch: Function) => {
    dispatch({ type: USER_REQUEST });

    return await getUserRequest()
        .then(response => {
            if (response.success) {
                dispatch({ type: SET_USER, payload: response.user })
            }

            dispatch({ type: USER_SUCCESS, payload: response.success });
        })
        .catch(() => {
            dispatch({ type: USER_FAILED });
            return false
        });
};

export const editUser = async (email: string, password: string, name: string, dispatch: Function) => {
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

