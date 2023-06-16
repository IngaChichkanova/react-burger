import { CURRENT_INGREDIENT } from '../constants/ingredient-modal';
import { ingredientModalReducer } from './ingredient-modal';

describe('ingredientModal reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientModalReducer(undefined, {})).toEqual(
            {
                currentIngredient: null
            }
        )
    })

    it('should handle CURRENT_INGREDIENT', () => {
        const payloadData = {
          _id: 'string',
          name: 'string',
          type: 'string',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: 'string',
          image_mobile: 'string',
          image_large: 'string',
          __v: 1
        };
    
        expect(
            ingredientModalReducer(undefined, {
            type: CURRENT_INGREDIENT,
            payload: payloadData
          })
        ).toEqual({
            currentIngredient: payloadData
        })
      })

      it('should work with null value', () => {    
        expect(
            ingredientModalReducer(undefined, {
            type: CURRENT_INGREDIENT,
            payload: null
          })
        ).toEqual({
            currentIngredient: null
        })
      })

})