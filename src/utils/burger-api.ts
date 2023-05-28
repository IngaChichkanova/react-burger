
import { NORMA_API } from './constants';
import { getCookie, setCookie, deleteCookie } from './set-cookie';
import { TIngredient, TUser, TOrder } from '../utils/types';

type TParams = {
    headers?: { [prop in string]: string };
    method?: string;
    body?: string
};

type TAuth = {
    email?: string;
    name?: string;
    success?: boolean;
    user?: TUser;
    refreshToken?: string;
    accessToken?: string;
};

const checkResponse = <T>(res: Response): Promise<T> => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const request = (endpoint: string, options: TParams): Promise<{
    success: boolean;
    refreshToken?: string;
    accessToken?: string;
}> => {
    return fetch(`${NORMA_API}/${endpoint}`, options).then(res => checkResponse(res))
};

const updateRefreshToken = async (endpoint: string, options: TParams): Promise<{ success: boolean }> => {
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

            accessToken = response.accessToken ? response.accessToken.split('Bearer ')[1] : undefined;
            if (accessToken) {
                setCookie('token', accessToken);
            }

            if (response.refreshToken) {
                localStorage.setItem("refreshToken", response.refreshToken);
            }

            if (options.headers) {
                options.headers.Authorization = `Bearer ${accessToken}`;
            }

            return request(endpoint, options).then(user => user)
        })
            .catch(() => {
                return { success: false };
            });
    } else {
        return { success: false };
    }
};

export const checkAuthFetch = async (endpoint: string, options: TParams): Promise<{
    success: boolean;
}> => await request(endpoint, options)
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

export const registerRequest = (email: string, password: string, name: string): Promise<TAuth> => request('auth/register', {
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

export const loginRequest = (email: string, password: string): Promise<TAuth> => request('auth/login', {
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


export const logoutRequest = (): Promise<Pick<TAuth, 'success'>> => request('auth/logout', {
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

export const forgotPasswordRequest = (email: string): Promise<Pick<TAuth, 'success'>> => request('password-reset', {
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

export const resetPasswordRequest = (email: string, token: string): Promise<Pick<TAuth, 'success'>> => request('password-reset', {
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

export const getUserRequestAction = (): Promise<Pick<TAuth, 'success' | 'user'>> => checkAuthFetch('auth/user', {
    method: "GET",
    headers: {
        Authorization: 'Bearer ' + getCookie('token')
    }
})

export const editUserRequest = (email: string, password: string, name: string): Promise<Pick<TAuth, 'success' | 'user'>> => checkAuthFetch('auth/user', {
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

export const getIngedientsRequest = (): Promise<{
    success: boolean;
    refreshToken?: string;
    accessToken?: string;
    data?: Array<TIngredient>;
}> => request('ingredients', { method: "GET" })

export const orderRequest = (ingredientsId: Array<string>): Promise<{
    success: boolean;
    refreshToken?: string;
    accessToken?: string;
    order?: TOrder;
}
> => checkAuthFetch('orders', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('token')
    },
    body: `{"ingredients": ${JSON.stringify(ingredientsId)}}`
})