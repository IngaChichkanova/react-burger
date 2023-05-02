export const CURRENT_INGREDIENT = 'CURRENT_INGREDIENT';

export const updateCurrentIngredient = (item) => ({
    type: CURRENT_INGREDIENT,
    payload: item,
})