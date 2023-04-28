
import { NORMA_API } from './constants';
import { getCookie, setCookie, deleteCookie } from './set-cookie';

const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const request = (endpoint, options) => {
    console.log(endpoint, options)
    return fetch(`${NORMA_API}/${endpoint}`, options).then(checkResponse)
};

const updateRefreshToken = async (endpoint, options) => {
    if (localStorage.getItem("refreshToken")) {
        deleteCookie('token');
        return await request('auth/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: `${JSON.stringify(
                {
                    "token": localStorage.getItem("refreshToken"),
                }
            )}`
        }).then(response => {
            let accessToken;
            accessToken = response.accessToken.split('Bearer ')[1];
            if (accessToken) {
                setCookie('token', accessToken);
            }

            localStorage.setItem("refreshToken", response.refreshToken);

            options.headers.Authorization = `Bearer ${accessToken}`;

            return request(endpoint, options).then(user => user)
        })
            .catch(() => {
                return { success: false };
            });
    } else {
        return { success: false };
    }
};

export const checkAuthFetch = async (endpoint, options) => await request(endpoint, options)
    .then((response) => {
        return response
    })
    .catch(e => {
        if (e.message === "jwt expired") {
            console.log(endpoint, options)
            return updateRefreshToken(endpoint, options)
        } else {
            return { success: false }
        }
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

export const getUserRequest = () => checkAuthFetch('auth/user', {
    method: "GET",
    headers: {
        Authorization: 'Bearer ' + getCookie('token')
    }
})

export const editUserRequest = (email, password, name) => checkAuthFetch('auth/user', {
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

export const getIngedientsRequest = () => request('ingredients', {})

export const orderRequest = (ingredientsId) => checkAuthFetch('orders', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('token')
    },
    body: `{"ingredients": ${JSON.stringify(ingredientsId)}}`
})