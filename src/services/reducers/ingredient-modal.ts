import {
    CURRENT_INGREDIENT,
} from '../actions/ingredient-modal';
import { TActionIngredientModal } from '../../utils/types';

const initialState = {
    currentIngredient: null,
};

export const ingredientModalReducer = (state = initialState, action: TActionIngredientModal) => {
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