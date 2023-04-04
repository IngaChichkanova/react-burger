import { NORMA_API } from './constants';

const checkReponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export function getIngedients() {
    return fetch(`${NORMA_API}/ingredients`)
        .then(response => checkReponse(response));
};