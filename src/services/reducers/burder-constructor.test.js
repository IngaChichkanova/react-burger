import { CURRENT_INGREDIENTS_LIST } from '../constants/burder-constructor';
import { burgerConstructorReducer } from './burder-constructor';

describe('burgerConstructor reducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual({
      currentIngredientsList: []
    })
  })

  it('should handle CURRENT_INGREDIENTS_LIST', () => {
    const payloadData = [{
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
    }];

    expect(
      burgerConstructorReducer(undefined, {
        type: CURRENT_INGREDIENTS_LIST,
        payload: payloadData
      })
    ).toEqual({
      currentIngredientsList: payloadData
    })
  })
})