import type { Middleware, MiddlewareAPI } from 'redux';

import type {
    TApplicationActions,
    TWSStoreActions,
    AppDispatch,
    RootState,
    TOrderTrack
} from '../../utils/types';
import { getCookie } from '../../utils/set-cookie';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
            const { isPrivate } = getState().track;
            const { user, getUserRequest, getUserSuccess } = getState().user;

            if (type === wsInit) {
                if (isPrivate) {
                    if (getCookie('token')) {
                        socket = new WebSocket(`${wsUrl}?token=${getCookie('token')}`);
                    }
                } else {
                    socket = new WebSocket(`${wsUrl}/all`);
                }
            }


            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData: { orders: Array<TOrderTrack>, total: number, totalToday: number, success: boolean } = JSON.parse(data);

                    if (parsedData.success) {
                        dispatch({ type: onMessage, orders: parsedData.orders, total: parsedData.total, totalToday: parsedData.totalToday, });
                    }else{
                        console.log('111111111', user, getUserRequest, getUserSuccess)
                        dispatch({ type: onError, payload: event });
                    }

                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === onClose) {
                    socket.close()
                }
            }

            next(action);
        };
    }) as Middleware;
};