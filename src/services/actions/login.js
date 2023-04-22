import { request } from './index';

export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_FAILED = 'RESET_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILED = 'REGISTER_FAILED';

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

export function register(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: RESET_REQUEST
        });

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);

        request('auth/register', {
            method: "POST",
            body: formData
        })
            .then(response => {
                console.log(response)
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: response.success
                });
            })
            .catch((e) => {
                dispatch({
                    type: REGISTER_FAILED
                });
            });
    };
}