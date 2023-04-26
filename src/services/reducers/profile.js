import {
    
} from '../actions/profile';

const initialState = {

};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        /*case PASSWORD_RESET_REQUEST: {
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
        }*/
        default: {
            return state;
        }
    }
};