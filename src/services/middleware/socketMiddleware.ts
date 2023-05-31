import type { Middleware, MiddlewareAPI } from 'redux';

import type {
    TApplicationActions,
    TWSStoreActions,
    AppDispatch,
    RootState,
} from '../../utils/types';
import { getCookie } from '../../utils/set-cookie';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            // if (type === wsInit && getCookie('token')) {
            socket = new WebSocket(`${wsUrl}?token=${getCookie('token')}`);
            // }
            if (socket) {
                socket.onopen = event => {
                    // dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    // dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    //  const parsedData: IMessageResponse = JSON.parse(data);
                    // const { success, ...restParsedData } = parsedData;

                    //  dispatch({ type: onMessage, payload: { ...restParsedData } });
                };

                socket.onclose = event => {
                    // dispatch({ type: onClose, payload: event });
                };

                //if (type === wsSendMessage) {
                //   const payload = action.payload;
                // const message = { ...(payload as IMessage), token: getCookie('token') };
                // socket.send(JSON.stringify(message));
                //}
            }

            next(action);
        };
    }) as Middleware;
};