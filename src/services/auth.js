import { useState } from 'react';
import {
    registerRequest,
    loginRequest,
    logoutRequest,
    forgotPasswordRequest,
    resetPasswordRequest,
    SET_USER,
} from './actions/login';
import { setCookie, deleteCookie, getCookie } from '../utils/set-cookie';
import { useDispatch } from 'react-redux';
import { checkAuthFetch } from './actions/index';

export function useAuth() {
    const dispatch = useDispatch();
    const [registerStart, setRegisterStart] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [registerErrorText, setRegisterErrorText] = useState("");
    const [forgotPasswordStart, setForgotPasswordStart] = useState(false);
    const [forgotPasswordError, setForgotPasswordError] = useState(false);
    const [resetPasswordStart, setResetPasswordStart] = useState(false);
    const [resetPasswordError, setResetPasswordError] = useState(false);
    const [loginStart, setLoginStart] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginErrorText, setLoginErrorText] = useState("");
    const [logoutStart, setLogoutStart] = useState(false);
    const [logoutError, setLogoutError] = useState(false);
    const [getUserStart, setGetUserStart] = useState(false);
    const [getUserError, setGetUserError] = useState(false);

    const register = async (email, password, name) => {
        setRegisterStart(true);
        setRegisterError(false);
        setRegisterErrorText("");
        return await registerRequest(email, password, name)
            .then(response => {
                let accessToken;
                accessToken = response.accessToken.split('Bearer ')[1];
                if (accessToken) {
                    setCookie('token', accessToken);
                }

                localStorage.setItem("refreshToken", response.refreshToken);

                if (response.success) {
                    dispatch({ type: SET_USER, payload: response.user })
                }

                setRegisterStart(false);
                setRegisterError(!response.success);
                return response.success
            })
            .catch((e) => {
                setRegisterStart(false);
                setRegisterErrorText(`: ${e.message}`);
                setRegisterError(true);
                return false
            });
    }

    const signIn = async (email, password) => {
        setLoginStart(true);
        setLoginError(false);
        setLoginErrorText("");
        return await loginRequest(email, password).then(response => {
            let accessToken;
            accessToken = response.accessToken.split('Bearer ')[1];
            if (accessToken) {
                setCookie('token',
                    accessToken
                );
            }

            localStorage.setItem("refreshToken", response.refreshToken);

            if (response.success) {
                dispatch({ type: SET_USER, payload: response.user })
            }

            setLoginStart(false);
            setLoginError(!response.success);

            return response.success
        })
            .catch((e) => {
                setLoginStart(false);
                setLoginErrorText(`: ${e.message}`);
                setLoginError(true);
                return false
            });
    };

    const signOut = async () => {
        setLogoutStart(true);
        setLogoutError(false);
        if (localStorage.getItem("refreshToken")) {
            return await logoutRequest().then(response => {
                deleteCookie('token');
                localStorage.removeItem("refreshToken");

                if (response.success) {
                    dispatch({ type: SET_USER, payload: {} })
                }

                setLogoutStart(false);
                setLogoutError(!response.success);

                return response.success
            })
                .catch(() => {
                    setLogoutStart(false);
                    setLogoutError(true);
                    return false;
                });
        } else {
            setLogoutStart(false);
            setLogoutError(true);
            return false;
        }
    };

    const forgotPassword = async (email) => {
        setForgotPasswordStart(true);
        setForgotPasswordError(false);
        return await forgotPasswordRequest(email)
            .then(response => {
                setForgotPasswordStart(false);
                setForgotPasswordError(!response.success);
                return response.success
            })
            .catch(() => {
                setForgotPasswordStart(false);
                setForgotPasswordError(true);
                return false
            });
    }

    const resetPassword = async (password, token) => {
        setResetPasswordStart(true);
        setResetPasswordError(false);
        return await resetPasswordRequest(password, token)
            .then(response => {
                setResetPasswordStart(false);
                setResetPasswordError(!response.success);
                return response.success
            })
            .catch(() => {
                setResetPasswordStart(false);
                setResetPasswordError(true);
                return false
            });
    }



    const getUser = async () => {
        setGetUserError(false);
        setGetUserStart(true);

        return await checkAuthFetch('auth/user', {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + getCookie('token')
            }
        })
            .then(response => {
                if (response.success) {
                    dispatch({ type: SET_USER, payload: response.user })
                }

                setGetUserError(!response.success);
                setGetUserStart(false);
            })
    };

    return {
        register,
        signIn,
        signOut,
        getUser,
        forgotPassword,
        resetPassword,
        forgotPasswordStart,
        forgotPasswordError,
        resetPasswordStart,
        resetPasswordError,
        registerStart,
        registerError,
        registerErrorText,
        loginStart,
        loginError,
        loginErrorText,
        logoutStart,
        logoutError,
        getUserStart,
        getUserError,
    };
}