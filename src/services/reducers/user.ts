import { TUser } from '../../utils/types';
import { TUserAction } from '../actions/user';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILED,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILED,
    SET_USER,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from '../constants/user';

export type TUserState = {
    registerStart: boolean;
    registerError: boolean;
    loginStart: boolean;
    loginError: boolean;
    logoutStart: boolean;
    logoutError: boolean;
    forgotPasswordStart: boolean;
    forgotPasswordError: boolean;
    resetPasswordStart: boolean;
    resetPasswordError: boolean;
    getUserStart: boolean;
    getUserError: boolean;
    user: null | TUser;
    getUserRequest: boolean;
    registerErrorText?: string;
    loginErrorText?: string;
    getUserSuccess?: boolean;
    getUserFailed?: boolean;
};

const initialState: TUserState = {
    registerStart: false,
    registerError: false,
    registerErrorText: '',
    loginStart: false,
    loginError: false,
    loginErrorText: '',
    logoutStart: false,
    logoutError: false,
    forgotPasswordStart: false,
    forgotPasswordError: false,
    resetPasswordStart: false,
    resetPasswordError: false,
    getUserStart: false,
    getUserError: false,
    user: null,
    getUserRequest: false,
    getUserSuccess: false,
    getUserFailed: false,
};

export const userReducer = (state = initialState, action: TUserAction) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerStart: true,
                registerError: false,
                registerErrorText: ''
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerError: !action.payload,
                registerStart: false
            };
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                registerError: true,
                registerErrorText: action.payload,
                registerStart: false
            };
        }
        case SIGN_IN_REQUEST: {
            return {
                ...state,
                loginStart: true,
                loginError: false,
                loginErrorText: ''
            };
        }
        case SIGN_IN_SUCCESS: {
            return {
                ...state,
                loginError: !action.payload,
                loginStart: false
            };
        }
        case SIGN_IN_FAILED: {
            return {
                ...state,
                loginError: true,
                loginErrorText: action.payload,
                loginStart: false
            };
        }
        case SIGN_OUT_REQUEST: {
            return {
                ...state,
                logoutStart: true,
                logoutError: false,
            };
        }
        case SIGN_OUT_SUCCESS: {
            return {
                ...state,
                logoutError: !action.payload,
                logoutStart: false
            };
        }
        case SIGN_OUT_FAILED: {
            return {
                ...state,
                logoutError: true,
                logoutStart: false
            };
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordStart: true,
                forgotPasswordError: false,
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordError: !action.payload,
                forgotPasswordStart: false
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordError: true,
                forgotPasswordStart: false
            };
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordStart: true,
                resetPasswordError: false,
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordError: !action.payload,
                resetPasswordStart: false
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordError: true,
                resetPasswordStart: false
            };
        }
        case USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserError: false,
            };
        }
        case USER_SUCCESS: {
            return {
                ...state,
                getUserError: !action.payload,
                getUserRequest: false
            };
        }
        case USER_FAILED: {
            return {
                ...state,
                getUserError: true,
                getUserRequest: false
            };
        }
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
                getUserFailed: !action.payload,
                getUserSuccess: action.payload,
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