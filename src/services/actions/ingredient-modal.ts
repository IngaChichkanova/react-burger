import { TIngredient } from "../../utils/types";
import { CURRENT_INGREDIENT } from '../constants/ingredient-modal';

export interface IIngredientModalItemAction {
    readonly type: typeof CURRENT_INGREDIENT;
    readonly payload: null | TIngredient;
}

export type TIngredientModalAction =
    | IIngredientModalItemAction
    ;

export const updateCurrentIngredient = (item: null | TIngredient): IIngredientModalItemAction => ({
    type: CURRENT_INGREDIENT,
    payload: item,
})