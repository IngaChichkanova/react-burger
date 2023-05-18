import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients';

const initialState = {
    ingredientsList: [],
    ingredientsListRequest: false,
    ingredientsListFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsListRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsListFailed: false,
                ingredientsList: action.payload,
                ingredientsListRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsListFailed: true,
                ingredientsList: [],
                ingredientsListRequest: false
            };
        }
        default: {
            return state;
        }
    }
};