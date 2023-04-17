import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    CURRENT_INGREDIENTS_LIST,
    CURRENT_INGREDIENT,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../actions/ingredients';

const initialState = {
    ingredientsList: [],
    ingredientsListRequest: false,
    ingredientsListFailed: false,

    currentIngredientsList: [],

    currentIngredient: {},

    order: {},
    orderRequest: false,
    orderFailed: false
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
        case CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.payload
            };
        }
        case CURRENT_INGREDIENTS_LIST: {
            return {
                ...state,
                currentIngredientsList: action.payload
            }
        }
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
                orderRequest: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                order: {},
                orderRequest: false,
            };
        }
        default: {
            return state;
        }
    }
};