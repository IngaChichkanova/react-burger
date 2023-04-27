import { request } from './index';
import { getCookie } from '../../utils/set-cookie';

export const SET_USER = 'SET_USER';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const forgotPasswordRequest = (email) => request('password-reset', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: `${JSON.stringify(
        {
            "email": email,
        }
    )}`
});

export const resetPasswordRequest = (email, token) => request('password-reset', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: `${JSON.stringify(
        {
            "email": email,
            "token": token
        }
    )}`
})

export function editUser(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        request('auth/user', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer ' + getCookie('token')
            },
            body: `${JSON.stringify(
                {
                    "name": name,
                    "email": email,
                    "password": password,
                }
            )}`
        })
            .then(response => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: response.user
                });
            })
            .catch((e) => {
                dispatch({
                    type: GET_USER_FAILED
                });
            });
    };
}

export const registerRequest = (email, password, name) => request('auth/register', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: `${JSON.stringify(
        {
            "email": email,
            "password": password,
            "name": name
        }
    )}`
});

export const loginRequest = (email, password) => request('auth/login', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: `${JSON.stringify(
        {
            "email": email,
            "password": password
        }
    )}`
});

export const logoutRequest = () => request('auth/logout', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: `${JSON.stringify(
        {
            "token": localStorage.getItem("refreshToken"),
        }
    )}`
});

export const userRequest = (accessToken) => request('auth/user', {
    method: "GET",
    headers: {
        Authorization: 'Bearer ' + accessToken
    }
});

export const updateRefreshRequest = () => request('auth/token', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: `${JSON.stringify(
        {
            "token": localStorage.getItem("refreshToken"),
        }
    )}`
});

