import {
    SET_USER,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from '../actions/user';

const initialState = {
    user: {},
    getUserRequest: false,
    getUserSuccess: false,
    getUserFailed: false,
};

export const loginReducer = (state = initialState, action :any) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserFailed: false,
                user: action.payload,
                getUserSuccess: true,
                getUserRequest: false
            };
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserFailed: true,
                getUserSuccess: false,
                getUserRequest: false
            };
        }
        default: {
            return state;
        }
    }
};