import {
    CURRENT_INGREDIENTS_LIST,
} from '../actions/burder-constructor';
import { TActionBurberConstructor } from '../../utils/types';

const initialState = {
    currentIngredientsList: [],
};

export const burgerConstructorReducer = (state = initialState, action: TActionBurberConstructor) => {
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