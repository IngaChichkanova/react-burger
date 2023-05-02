import {
    CURRENT_INGREDIENTS_LIST,
} from '../actions//burder-constructor';

const initialState = {
    currentIngredientsList: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_INGREDIENTS_LIST: {
             return {
                ...state,
                currentIngredientsList: action.payload
            }
        }
        default: {
            return state;
        }
    }
};