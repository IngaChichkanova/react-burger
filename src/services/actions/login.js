import { request, checkAuthFetch } from './index';
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

export const editUser = async (email, password, name, dispatch) => {
    dispatch({
        type: GET_USER_REQUEST
    });
    return await checkAuthFetch('auth/user', {
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
};

