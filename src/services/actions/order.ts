import { orderRequest } from '../../utils/burger-api';
import { updateCurrentIngredientsList } from './burder-constructor';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CURRENT_ORDER,
} from '../constants/order';
import { TOrder, AppDispatch, AppThunkAction, TOrderTrack } from '../../utils/types';

export interface IOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface IOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload?: TOrder;
}

export interface ICurrentOrderAction {
    readonly type: typeof CURRENT_ORDER;
    readonly payload: null | TOrderTrack;
}

export type TOrderAction =
    | IOrderFailedAction
    | IOrderRequestAction
    | IOrderSuccessAction
    | ICurrentOrderAction
    ;

export const doOrder = async (ingredientsId: Array<string>, dispatch: AppDispatch): Promise<AppThunkAction | boolean | undefined | void> => {
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
}

export const clearOrder = (): IOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
})

export const updateCurrentOrder = (item: null | TOrderTrack): ICurrentOrderAction => ({
    type: CURRENT_ORDER,
    payload: item,
})