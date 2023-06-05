import { TOrderTrack } from "../../utils/types";
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
} from "../constants/ws";

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: boolean;
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    orders: Array<TOrderTrack>;
    ordersUser: Array<TOrderTrack>;
    total: number;
    totalToday: number;
}

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    ;

export const wsStart = (isPrivate: boolean): IWSConnectionStart => ({
    type: WS_CONNECTION_START,
    payload: isPrivate
})

export const wsClose = (): IWSConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED
})
