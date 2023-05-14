import {
    CURRENT_INGREDIENT,
} from '../actions/ingredient-modal';

const initialState = {
    currentIngredient: null,
};

export const ingredientModalReducer = (state = initialState, action: any) => {
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