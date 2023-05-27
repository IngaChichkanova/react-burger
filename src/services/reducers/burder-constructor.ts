import {
    CURRENT_INGREDIENTS_LIST,
} from '../constants/burder-constructor';
import { TIngredient } from '../../utils/types';
import { TBurgerConstructorActions } from '../actions/burder-constructor';

export type TBurgerConstructorState = {
    currentIngredientsList: ReadonlyArray<TIngredient>;
};

const initialState: TBurgerConstructorState = {
    currentIngredientsList: [],
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions) => {
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