import { TOrderTrack } from "../../utils/types";
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    PRIVATE
} from "../constants/ws";

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
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

export interface IPrivateAction {
    readonly type: typeof PRIVATE;
    readonly payload: boolean; 
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
    | IPrivateAction
    ;

export const wsStart = (): IWSConnectionStart => ({
    type: WS_CONNECTION_START
})

export const wsClose = (): IWSConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED
})

export const setPrivite = (isPrivate: boolean): IPrivateAction => ({
    type: PRIVATE,
    payload: isPrivate
})
