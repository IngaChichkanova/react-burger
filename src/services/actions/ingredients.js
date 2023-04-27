import { request } from './index';
import { getCookie } from '../../utils/set-cookie';
import { updateRefreshRequest } from '../actions/login';

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const CURRENT_INGREDIENT = 'CURRENT_INGREDIENT';
export const CURRENT_INGREDIENTS_LIST = 'CURRENT_INGREDIENTS_LIST';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';


export function getIngedients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        request('ingredients', {})
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
        if (ingredientsId.length === 0) {
            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: {}
            });
            return
        } else {
            dispatch({
                type: GET_ORDER_REQUEST
            });

            request('orders', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: 'Bearer ' + getCookie('token')
                },
                body: `{"ingredients": ${JSON.stringify(ingredientsId)}}`
            })
                .then(response => {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        payload: response.order
                    });
                    dispatch(updateCurrentIngredientsList([]));
                })
                .catch((e) => {
                    // if (e.message === "jwt expired") {
                    if (e.message === "jwt malformed") {
                        dispatch(updateRefreshRequest());
                    }
                    dispatch({
                        type: GET_ORDER_FAILED
                    });
                });
        }
    };
}

export const updateCurrentIngredientsList = (items) => ({
    type: CURRENT_INGREDIENTS_LIST,
    payload: items,
})

export const updateCurrentIngredient = (item) => ({
    type: CURRENT_INGREDIENT,
    payload: item,
})