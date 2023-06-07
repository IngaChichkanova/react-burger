import { TIngredient } from "../../utils/types";
import { CURRENT_INGREDIENTS_LIST } from '../constants/burder-constructor';

export interface ICurrentIngredientsAction {
    readonly type: typeof CURRENT_INGREDIENTS_LIST;
    readonly payload: ReadonlyArray<TIngredient>;
  }
  
  export type TBurgerConstructorActions =
    | ICurrentIngredientsAction
    ;

export const updateCurrentIngredientsList = (items: Array<TIngredient>): ICurrentIngredientsAction => ({
    type: CURRENT_INGREDIENTS_LIST,
    payload: items,
});