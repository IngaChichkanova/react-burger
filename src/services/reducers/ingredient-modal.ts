import {
    CURRENT_INGREDIENT,
} from '../constants/ingredient-modal';
import { TIngredient } from '../../utils/types';
import { TIngredientModalAction } from '../actions/ingredient-modal';

export type TIngedientModalState = {
    currentIngredient: null | TIngredient;
};

const initialState: TIngedientModalState = {
    currentIngredient: null,
};

export const ingredientModalReducer = (state = initialState, action: TIngredientModalAction) => {
    switch (action.type) {
        case CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.payload
            };
        }
        default: {
            return state;
        }
    }
};