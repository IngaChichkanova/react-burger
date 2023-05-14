export const CURRENT_INGREDIENT = 'CURRENT_INGREDIENT';

export const updateCurrentIngredient = (item: any) => ({
    type: CURRENT_INGREDIENT,
    payload: item,
})