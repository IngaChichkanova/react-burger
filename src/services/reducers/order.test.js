import * as types from '../constants/order';
import { orderReducer } from './order';

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(
            {
                order: null,
                orderRequest: false,
                orderFailed: false,
                currentOrder: null,
            }
        )
    })

    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            orderReducer(undefined, {
                type: types.GET_ORDER_REQUEST,
                payload: true
            })
        ).toEqual({
            order: null,
            orderRequest: true,
            orderFailed: false,
            currentOrder: null,
        })
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        const payloadData = [{
            createdAt: 'string',
            ingredients: [{
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
            }],
            name: 'string',
            number: 1,
            owner: {
                createdAt: 'string',
                email: 'string',
                name: 'string',
                updatedAt: 'string',
            },
            price: 1,
            status: 'string',
            updatedAt: 'string',
            _id: 'string'
        }];

        expect(
            orderReducer(undefined, {
                type: types.GET_ORDER_SUCCESS,
                payload: payloadData
            })
        ).toEqual({
            order: payloadData,
            orderRequest: false,
            orderFailed: false,
            currentOrder: null,
        })
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(
            orderReducer(undefined, {
                type: types.GET_ORDER_FAILED,
            })
        ).toEqual({
            order: null,
            orderRequest: false,
            orderFailed: true,
            currentOrder: null,
        })
    })

    it('should handle CURRENT_ORDER', () => {
        const payloadData = {
            ingredients: ['string'],
            _id: 'string',
            name: 'string',
            status: 'string',
            number: 1,
            createdAt: 'string',
            updatedAt: 'string',
        }
        expect(
            orderReducer(undefined, {
                type: types.CURRENT_ORDER,
                payload: payloadData
            })
        ).toEqual({
            order: null,
            orderRequest: false,
            orderFailed: false,
            currentOrder: payloadData,
        })
    })

})