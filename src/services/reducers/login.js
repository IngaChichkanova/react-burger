import {
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_FAILED,
    RESET_SUCCESS,
    RESET_REQUEST,
    RESET_FAILED,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAILED
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
                resetRequest: true
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
        case REGISTER_SUCCESS: {
            return {
                ...state,
                rgisterRequest: true
            };
        }
        case REGISTER_REQUEST: {
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
        default: {
            return state;
        }
    }
};