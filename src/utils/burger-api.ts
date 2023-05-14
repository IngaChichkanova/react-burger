
import { NORMA_API } from './constants';
import { getCookie, setCookie, deleteCookie } from './set-cookie';

const checkResponse = (res: any) => res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));

export const request = (endpoint: string, options: any) => {
    return fetch(`${NORMA_API}/${endpoint}`, options).then(checkResponse)
};

const updateRefreshToken = async (endpoint: string, options: any) => {
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

export const checkAuthFetch = async (endpoint: string, options: any) => await request(endpoint, options)
    .then((response) => {
        return response
    })
    .catch(e => {
        if (e.message === "jwt expired") {
            return updateRefreshToken(endpoint, options)
        } else {
            return { success: false }
        }
    })

export const registerRequest = (email: string, password: string, name: string) => request('auth/register', {
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

export const loginRequest = (email: string, password:string) => request('auth/login', {
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

export const forgotPasswordRequest = (email:string) => request('password-reset', {
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

export const resetPasswordRequest = (email:string, token:string) => request('password-reset', {
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

export const editUserRequest = (email:string, password:string, name:string) => checkAuthFetch('auth/user', {
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

export const orderRequest = (ingredientsId: any) => checkAuthFetch('orders', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('token')
    },
    body: `{"ingredients": ${JSON.stringify(ingredientsId)}}`
})