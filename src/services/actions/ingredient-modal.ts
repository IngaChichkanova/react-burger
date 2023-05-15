import { TIngredient } from "../../utils/types";
export const CURRENT_INGREDIENT = 'CURRENT_INGREDIENT';

export const updateCurrentIngredient = (item: TIngredient) => ({
    type: CURRENT_INGREDIENT,
    payload: item,
})