import { NORMA_API } from '../../utils/constants';

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const CURRENT_INGREDIENT = 'CURRENT_INGREDIENT';

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