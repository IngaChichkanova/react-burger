import { TIngredient } from "../../utils/types";
export const CURRENT_INGREDIENTS_LIST = 'CURRENT_INGREDIENTS_LIST';

export const updateCurrentIngredientsList = (items: Array<TIngredient>) => ({
    type: CURRENT_INGREDIENTS_LIST,
    payload: items,
})