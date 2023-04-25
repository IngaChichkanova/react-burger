import {
    registerRequest,
    loginRequest,
    updateRefreshRequest,
    logoutRequest,
    userRequest,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILED,
    UPDATE_REFRESH_REQUEST,
    UPDATE_REFRESH_SUCCESS,
    UPDATE_REFRESH_FAILED,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    RESET_REQUEST,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from './actions/login';
import { setCookie, deleteCookie } from '../utils/set-cookie';
import { useDispatch } from 'react-redux';

export function useAuth() {
    const dispatch = useDispatch();

    const register = async (email, password, name) => {
        dispatch({
            type: RESET_REQUEST
        });
        return await registerRequest(email, password, name).then(response => {
            let accessToken;
            accessToken = response.accessToken.split('Bearer ')[1];
            if (accessToken) {
                setCookie('token', accessToken);
            }

            localStorage.setItem("refreshToken", response.refreshToken);
            dispatch({
                type: REGISTER_SUCCESS
            });
        })
            .catch((e) => {
                dispatch({
                    type: REGISTER_FAILED
                });
            });
    };

    const signIn = async (email, password) => {
        dispatch({
            type: SIGN_IN_REQUEST
        });
        return await loginRequest(email, password).then(response => {
            let accessToken;
            accessToken = response.accessToken.split('Bearer ')[1];
            if (accessToken) {
                setCookie('token', accessToken);
            }

            localStorage.setItem("refreshToken", response.refreshToken);

            dispatch({
                type: SIGN_IN_SUCCESS,
                payload: response.user
            });

            return response.success
        })
            .catch((e) => {
                dispatch({
                    type: SIGN_IN_FAILED
                });
            });
    };

    const updateRefreshToken = async () => {
        dispatch({
            type: UPDATE_REFRESH_REQUEST
        });
        if (localStorage.getItem("refreshToken")) {
            return await updateRefreshRequest().then(response => {
                let accessToken;
                accessToken = response.accessToken.split('Bearer ')[1];
                if (accessToken) {
                    setCookie('token', accessToken);
                }

                localStorage.setItem("refreshToken", response.refreshToken);

                dispatch({
                    type: UPDATE_REFRESH_SUCCESS,
                });

                return response.success
            })
                .catch((e) => {
                    dispatch({
                        type: UPDATE_REFRESH_FAILED
                    });
                });
        } else {
            dispatch({
                type: UPDATE_REFRESH_FAILED
            });
            return false;
        }
    };

    const signOut = async () => {
        dispatch({
            type: LOGOUT_REQUEST
        });
        if (localStorage.getItem("refreshToken")) {
            return await logoutRequest().then(response => {
                deleteCookie('token');
                localStorage.removeItem("refreshToken");
                dispatch({
                    type: LOGOUT_SUCCESS,
                });

                return response.success
            })
                .catch((e) => {
                    dispatch({
                        type: LOGOUT_FAILED
                    });
                });
        } else {
            dispatch({
                type: LOGOUT_FAILED
            });
            return false;
        }
    };

    const getUser = async () => {
        dispatch({
            type: GET_USER_REQUEST
        });

        return await userRequest().then(response => {
            dispatch({
                type: GET_USER_SUCCESS,
                payload: response.user
            });

            return response.success
        })
            .catch((e) => {
                dispatch({
                    type: GET_USER_FAILED
                });
            });
    };

    return {
        register,
        signIn,
        signOut,
        updateRefreshToken,
        getUser
    };
}