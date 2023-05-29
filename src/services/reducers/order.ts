import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    WATCH_ORDERS_PUBLIC_OPEN,
    WATCH_ORDERS_PUBLIC_SUCCESS,
    WATCH_ORDERS_PUBLIC_DATA
} from '../constants/order';
import { TOrder, TOrderTrack } from '../../utils/types';
import { TOrderAction } from '../actions/order';

export type TOrderState = {
    order: null | TOrder;
    orderRequest: boolean;
    orderFailed: boolean;
    ordersPublicTrack: Array<TOrderTrack>;
    ordersTrackPublicOpen: boolean;
    ordersTrackPublicSuccess: boolean;
    ordersTrackPublicTotal: number;
    ordersTrackPublicTotalToday: number;
    ordersPrivateTrack: Array<TOrderTrack>;
    ordersTrackPrivateOpen: boolean;
    ordersTrackPrivateSuccess: boolean;
};

const initialState: TOrderState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    ordersTrackPublicOpen: false,
    ordersPublicTrack: [],
    ordersTrackPublicSuccess: false,
    ordersTrackPrivateOpen: false,
    ordersPrivateTrack: [],
    ordersTrackPrivateSuccess: false,
    ordersTrackPublicTotal: 0,
    ordersTrackPublicTotalToday: 0,
};

export const orderReducer = (state = initialState, action: TOrderAction) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                order: action.payload,
                orderRequest: false,
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                order: null,
                orderRequest: false,
            };
        }
        case WATCH_ORDERS_PUBLIC_OPEN: {
            return {
                ...state,
                ordersTrackPublicOpen: action.payload,
            };
        }
        case WATCH_ORDERS_PUBLIC_SUCCESS: {
            return {
                ...state,
                ordersTrackPublicSuccess: action.payload,
            };
        }
        case WATCH_ORDERS_PUBLIC_DATA: {
            return {
                ...state,
                ordersPublicTrack: action.data,
                ordersTrackPublicTotal: action.total,
                ordersTrackPublicTotalToday: action.totalToday,
            };
        }
        default: {
            return state;
        }
    }
};