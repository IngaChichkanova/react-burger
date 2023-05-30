import { orderRequest } from '../../utils/burger-api';
import { updateCurrentIngredientsList } from './burder-constructor';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    WATCH_ORDERS_PUBLIC_OPEN,
    WATCH_ORDERS_PUBLIC_SUCCESS,
    WATCH_ORDERS_PUBLIC_DATA,
    CURRENT_ORDER,
    WATCH_ORDERS_PRIVATE_OPEN,
    WATCH_ORDERS_PRIVATE_SUCCESS,
    WATCH_ORDERS_PRIVATE_DATA
} from '../constants/order';
import { TOrder, AppDispatch, AppThunkAction, TOrderTrack } from '../../utils/types';
import { NORMA_API_WS } from '../../utils/constants';
import { getCookie } from '../../utils/set-cookie';

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

export interface IWatchOrdersOpenPrivateAction {
    readonly type: typeof WATCH_ORDERS_PRIVATE_OPEN;
    readonly payload?: boolean;
}

export interface IWatchOrdersSuccessPrivateAction {
    readonly type: typeof WATCH_ORDERS_PRIVATE_SUCCESS;
    readonly payload?: boolean;
}

export interface IWatchOrdersDataPrivateAction {
    readonly type: typeof WATCH_ORDERS_PRIVATE_DATA;
    readonly data: ReadonlyArray<TOrderTrack>;
    readonly total: number;
    readonly totalToday: number;
}

export interface ICurrentOrderAction {
    readonly type: typeof CURRENT_ORDER;
    readonly payload: null | TOrderTrack;
}

export type TOrderAction =
    | IOrderFailedAction
    | IOrderRequestAction
    | IOrderSuccessAction
    | IWatchOrdersOpenAction
    | IWatchOrdersSuccessAction
    | IWatchOrdersDataAction
    | ICurrentOrderAction
    | IWatchOrdersOpenPrivateAction
    | IWatchOrdersSuccessPrivateAction
    | IWatchOrdersDataPrivateAction
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
        const ws = new WebSocket(`${NORMA_API_WS}/orders/all`);

        ws.onopen = () => {
            dispatch({ type: WATCH_ORDERS_PUBLIC_OPEN, payload: true });
        };

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

        ws.onerror = () => {
            dispatch({ type: WATCH_ORDERS_PUBLIC_SUCCESS, payload: false });
            dispatch({ type: WATCH_ORDERS_PUBLIC_OPEN, payload: false });
        };

        ws.onclose = () => {
            dispatch({ type: WATCH_ORDERS_PUBLIC_OPEN, payload: false });
        };
    }
}

export function watchOrdersPrivateTrack(): AppThunkAction {
    return function (dispatch: AppDispatch) {
        const ws = new WebSocket(`${NORMA_API_WS}/orders?token=${getCookie('token')}`);

        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDdjZGJjNDVjNmYyMDAxYmU2ZDhhZiIsImlhdCI6MTY4NTQ1NDU4MSwiZXhwIjoxNjg1NDU1NzgxfQ.qzkPw0KItuzRzuWkRj9PDL8n2uiIqPYrO3kVAf8-z4c

        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDdjZGJjNDVjNmYyMDAxYmU2ZDhhZiIsImlhdCI6MTY4NTM0NzEzOCwiZXhwIjoxNjg1MzQ4MzM4fQ.o9FctDEI7k5BG2ogtt8vSylahgJ4RG5-OOYwHV0xqDk

        ws.onopen = () => {
            dispatch({ type: WATCH_ORDERS_PRIVATE_OPEN, payload: true });
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log('THIS WS')
            console.log('private', JSON.parse(event.data), `${NORMA_API_WS}/orders?token=${getCookie('token')}`)
            if (event.data) {
                let parsedData = JSON.parse(event.data);

                if (parsedData.success) {
                    dispatch({
                        type: WATCH_ORDERS_PRIVATE_DATA,
                        data: parsedData.orders,
                        total: parsedData.total,
                        totalToday: parsedData.totalToday
                    });
                }
                
               

                dispatch({ type: WATCH_ORDERS_PRIVATE_SUCCESS, payload: parsedData.success });
            }
        }

        ws.onerror = () => {
            dispatch({ type: WATCH_ORDERS_PRIVATE_SUCCESS, payload: false });
            dispatch({ type: WATCH_ORDERS_PRIVATE_OPEN, payload: false });
        };

        ws.onclose = () => {
            dispatch({ type: WATCH_ORDERS_PRIVATE_OPEN, payload: false });
        };
    }
}

export const updateCurrentOrder = (item: null | TOrderTrack): ICurrentOrderAction => ({
    type: CURRENT_ORDER,
    payload: item,
})