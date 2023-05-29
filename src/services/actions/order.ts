import { orderRequest } from '../../utils/burger-api';
import { updateCurrentIngredientsList } from './burder-constructor';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    WATCH_ORDERS_PUBLIC_OPEN,
    WATCH_ORDERS_PUBLIC_SUCCESS,
    WATCH_ORDERS_PUBLIC_DATA
} from '../constants/order';
import { TOrder, AppDispatch, AppThunkAction, TOrderTrack } from '../../utils/types';
import { NORMA_API_WS } from '../../utils/constants';

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

export interface IWatchOrdersOpenAction {
    readonly type: typeof WATCH_ORDERS_PUBLIC_OPEN;
    readonly payload?: boolean;
}

export interface IWatchOrdersSuccessAction {
    readonly type: typeof WATCH_ORDERS_PUBLIC_SUCCESS;
    readonly payload?: boolean;
}

export interface IWatchOrdersDataAction {
    readonly type: typeof WATCH_ORDERS_PUBLIC_DATA;
    readonly data: ReadonlyArray<TOrderTrack>;
    readonly total: number;
    readonly totalToday: number;
}

export type TOrderAction =
    | IOrderFailedAction
    | IOrderRequestAction
    | IOrderSuccessAction
    | IWatchOrdersOpenAction
    | IWatchOrdersSuccessAction
    | IWatchOrdersDataAction
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

export function watchOrdersPublicTrack(): AppThunkAction {
    return function (dispatch: AppDispatch) {
        dispatch({ type: WATCH_ORDERS_PUBLIC_OPEN, payload: true });
        const ws = new WebSocket(`${NORMA_API_WS}/orders/all`);

        ws.onmessage = (event: MessageEvent) => {
            console.log(JSON.parse(event.data))
            if (event.data) {
                let parsedData = JSON.parse(event.data);
            
                if (parsedData.success) {
                    dispatch({
                        type: WATCH_ORDERS_PUBLIC_DATA,
                        data: parsedData.orders,
                        total: parsedData.total,
                        totalToday: parsedData.totalToday
                    });
                }

                dispatch({ type: WATCH_ORDERS_PUBLIC_SUCCESS, payload: parsedData.success });
            }
        }
    }
}