import {
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_FAILED,
    RESET_SUCCESS,
    RESET_REQUEST,
    RESET_FAILED,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAILED,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILED,
    UPDATE_REFRESH_REQUEST,
    UPDATE_REFRESH_SUCCESS,
    UPDATE_REFRESH_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from '../actions/login';

const initialState = {
    passwordResetRequest: false,
    passwordResetSuccess: false,
    passwordResetFailed: false,
    resetRequest: false,
    resetSuccess: false,
    resetFailed: false,
    rgisterRequest: false,
    rgisterSuccess: false,
    rgisterFailed: false,
    signInRequest: false,
    signInSuccess: false,
    signInFailed: false,
    user: {},
    updateRefreshTokenRequest: false,
    updateRefreshTokenSuccess: false,
    updateRefreshTokenFailed: false,
    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,
    getUserRequest: false,
    getUserSuccess: false,
    getUserFailed: false,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case PASSWORD_RESET_REQUEST: {
            return {
                ...state,
                passwordResetRequest: true
            };
        }
        case PASSWORD_RESET_SUCCESS: {
            return {
                ...state,
                passwordResetFailed: false,
                passwordResetSuccess: action.payload,
                passwordResetRequest: false
            };
        }
        case PASSWORD_RESET_FAILED: {
            return {
                ...state,
                passwordResetFailed: true,
                passwordResetSuccess: false,
                passwordResetRequest: false
            };
        }
        case RESET_REQUEST: {
            return {
                ...state,
                resetRequest: true,
            };
        }
        case RESET_SUCCESS: {
            return {
                ...state,
                resetFailed: false,
                resetSuccess: action.payload,
                resetRequest: false
            };
        }
        case RESET_FAILED: {
            return {
                ...state,
                resetFailed: true,
                resetSuccess: false,
                resetRequest: false
            };
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                rgisterRequest: true,
                rgisterFailed: false
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                rgisterFailed: false,
                rgisterSuccess: action.payload,
                rgisterRequest: false
            };
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                rgisterFailed: true,
                rgisterSuccess: false,
                rgisterRequest: false
            };
        }
        case SIGN_IN_REQUEST: {
            return {
                ...state,
                signInRequest: true,
                signInFailed: false,
            };
        }
        case SIGN_IN_SUCCESS: {
            return {
                ...state,
                signInFailed: false,
                user: action.payload,
                signInSuccess: true,
                signInRequest: false
            };
        }
        case SIGN_IN_FAILED: {
            return {
                ...state,
                signInFailed: true,
                signInSuccess: false,
                signInRequest: false
            };
        }
        case UPDATE_REFRESH_REQUEST: {
            return {
                ...state,
                updateRefreshTokenRequest: true
            };
        }
        case UPDATE_REFRESH_SUCCESS: {
            return {
                ...state,
                updateRefreshTokenFailed: false,
                updateRefreshTokenSuccess: true,
                updateRefreshTokenRequest: false
            };
        }
        case UPDATE_REFRESH_FAILED: {
            return {
                ...state,
                updateRefreshTokenFailed: true,
                updateRefreshTokenSuccess: false,
                updateRefreshTokenRequest: false
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutFailed: false,
                logoutSuccess: true,
                logoutRequest: false,
                user: {}
            };
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutFailed: true,
                logoutSuccess: false,
                logoutRequest: false
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