import { orderRequest } from '../../utils/burger-api';
import { updateCurrentIngredientsList } from './burder-constructor';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const doOrder = async (ingredientsId: any, dispatch: Function) => {
    dispatch({
        type: GET_ORDER_REQUEST
    });
    return await orderRequest(ingredientsId)
        .then(response => {
            if (response.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: response.order
                });
                dispatch(updateCurrentIngredientsList([]));
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                });
            }
        })
        .catch(() => {
            dispatch({
                type: GET_ORDER_FAILED
            });
        });
};

export const clearOrder = () => ({
    type: GET_ORDER_SUCCESS,
})