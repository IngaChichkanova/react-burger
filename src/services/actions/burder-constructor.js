export const CURRENT_INGREDIENTS_LIST = 'CURRENT_INGREDIENTS_LIST';

export const updateCurrentIngredientsList = (items) => ({
    type: CURRENT_INGREDIENTS_LIST,
    payload: items,
})