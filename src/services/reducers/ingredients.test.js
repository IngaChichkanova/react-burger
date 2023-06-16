import * as types from '../constants/ingredients';
import { ingredientsReducer } from './ingredients';

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(
            {
                ingredientsList: [],
                ingredientsListRequest: false,
                ingredientsListFailed: false,
            }
        )
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer(undefined, {
                type: types.GET_INGREDIENTS_REQUEST,
                payload: true
            })
        ).toEqual({
            ingredientsList: [],
            ingredientsListRequest: true,
            ingredientsListFailed: false,
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
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
            ingredientsReducer(undefined, {
                type: types.GET_INGREDIENTS_SUCCESS,
                payload: payloadData
            })
        ).toEqual({
            ingredientsList: payloadData,
            ingredientsListRequest: false,
            ingredientsListFailed: false,
        })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            ingredientsReducer(undefined, {
                type: types.GET_INGREDIENTS_FAILED
            })
        ).toEqual({
            ingredientsListFailed: true,
            ingredientsList: [],
            ingredientsListRequest: false
        })
    })

})