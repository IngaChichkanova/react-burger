import { NORMA_API } from '../../utils/constants';

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const CURRENT_INGREDIENT = 'CURRENT_INGREDIENT';
export const CURRENT_INGREDIENTS_LIST = 'CURRENT_INGREDIENTS_LIST';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const checkReponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export function getIngedients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        fetch(`${NORMA_API}/ingredients`)
            .then(response => checkReponse(response))
            .then(response => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: response.data
                });
            })
            .catch((e) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            });
    };
}

export function doOrder(ingredientsId) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });

        fetch(`${NORMA_API}/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: `{"ingredients": ${JSON.stringify(ingredientsId)}}`
        })
            .then(response => checkReponse(response))
            .then(response => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: response.order
                });
            })
            .catch((e) => {
                dispatch({
                    type: GET_ORDER_FAILED
                });
            });
    };
}