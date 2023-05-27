import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../constants/order';
import { TOrder } from '../../utils/types';
import { TOrderAction } from '../actions/order';

export type TOrderState = {
    order: null | TOrder;
    orderRequest: boolean;
    orderFailed: boolean;
};

const initialState: TOrderState = {
    order: null,
    orderRequest: false,
    orderFailed: false
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
        default: {
            return state;
        }
    }
};