import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from '../constants/ingredients';
import { TIngredient } from '../../utils/types';
import { TIngredientsAction } from '../actions/ingredients';

export type TIngredientsState = {
    ingredientsList: ReadonlyArray<TIngredient>;
    ingredientsListRequest: boolean;
    ingredientsListFailed: boolean;
};

const initialState: TIngredientsState = {
    ingredientsList: [],
    ingredientsListRequest: false,
    ingredientsListFailed: false,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsAction) => {
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