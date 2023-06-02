import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
} from "../constants/ws";
import { TWSActions } from "../actions/ws";
import { TOrderTrack } from "../../utils/types";

export type TWSState = {
    wsConnected: boolean;
    isPrivate: boolean;
    error?: Event;
    orders:    Array<TOrderTrack>;
    total: number;
    totalToday: number;
}

const initialState: TWSState = {
    wsConnected: false,
    isPrivate: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                isPrivate: action.payload,
            };

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                orders: action.orders,
                total: action.total,
                totalToday: action.totalToday,
            };

        default:
            return state;
    }
};