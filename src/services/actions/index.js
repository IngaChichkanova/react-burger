
import { NORMA_API } from '../../utils/constants';
import { deleteCookie, setCookie } from '../../utils/set-cookie';

const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const request = (endpoint, options) => fetch(`${NORMA_API}/${endpoint}`, options).then(checkResponse);

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
            return updateRefreshToken(endpoint, options)
        } else {
            return { success: false }
        }
    })