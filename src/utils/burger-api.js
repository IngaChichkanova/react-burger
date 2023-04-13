import { NORMA_API } from './constants';

const checkReponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));



export function doOrder(ingredientsId) {
    return fetch(`${NORMA_API}/orders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: `{"ingredients": ${JSON.stringify(ingredientsId)}}`
    })
        .then(response => checkReponse(response));
};