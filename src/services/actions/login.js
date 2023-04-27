import { request } from './index';
import { getCookie, setCookie } from '../../utils/set-cookie';

export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_FAILED = 'RESET_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const UPDATE_REFRESH_REQUEST = 'UPDATE_REFRESH_REQUEST';
export const UPDATE_REFRESH_SUCCESS = 'UPDATE_REFRESH_SUCCESS';
export const UPDATE_REFRESH_FAILED = 'UPDATE_REFRESH_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export function passwordReset(email) {
    return function (dispatch) {
        dispatch({
            type: PASSWORD_RESET_REQUEST
        });

        let formData = new FormData();
        formData.append('email', email);

        request('password-reset', {
            method: "POST",
            body: formData
        })
            .then(response => {
                dispatch({
                    type: PASSWORD_RESET_SUCCESS,
                    payload: response.success
                });
            })
            .catch((e) => {
                dispatch({
                    type: PASSWORD_RESET_FAILED
                });
            });
    };
}

export function reset(password, token) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_SUCCESS
        });

        let formData = new FormData();
        formData.append('password', password);
        formData.append('token', token);

        request('password-reset/reset', {
            method: "POST",
            body: formData
        })
            .then(response => {
                dispatch({
                    type: RESET_SUCCESS,
                    payload: response.success
                });
            })
            .catch((e) => {
                dispatch({
                    type: RESET_FAILED
                });
            });
    };
}

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

/*export const updateRefreshRequest = () => 
     request('auth/token', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: `${JSON.stringify(
        {
            "token": localStorage.getItem("refreshToken"),
        }
    )}`
});*/

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

export const userRequest = () => request('auth/user', {
    method: "GET",
    headers: {
        Authorization: 'Bearer ' + getCookie('token')
    }
});


export function updateRefreshRequest() {
    return function (dispatch) {
        dispatch({
            type: UPDATE_REFRESH_REQUEST
        });

        request('auth/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: `${JSON.stringify(
                {
                    "token": localStorage.getItem("refreshToken"),
                }
            )}`
        })
            .then(response => {
                let accessToken;
                accessToken = response.accessToken.split('Bearer ')[1];
                if (accessToken) {
                    setCookie('token', accessToken);
                }

                localStorage.setItem("refreshToken", response.refreshToken);

                if (response.success) {
                    dispatch({
                        type: UPDATE_REFRESH_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: UPDATE_REFRESH_FAILED
                    });
                }
            })
            .catch((e) => {
                dispatch({
                    type: UPDATE_REFRESH_FAILED
                });
            });
    };
}

