import { INGREDIENTS_LIST } from './constants';

export const checkReponse = response => {
    return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
}

export function getIngedients() {
    return fetch(INGREDIENTS_LIST)
        .then(response => checkReponse(response))
        .catch(e => {
            return { errors: e }
        });
}