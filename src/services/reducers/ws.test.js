import * as types from '../constants/ws';
import { wsReducer } from './ws';

describe('ws reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(
            {
                wsConnected: false,
                isPrivate: false,
                orders: [],
                ordersUser: [],
                total: 0,
                totalToday: 0,
                error: undefined
            }
        )
    })

    it('should handle PRIVATE', () => {
        expect(
            wsReducer(undefined, {
                type: types.PRIVATE,
                payload: true
            })
        ).toEqual({
            wsConnected: false,
            isPrivate: true,
            orders: [],
            ordersUser: [],
            total: 0,
            totalToday: 0,
            error: undefined
        })
    })

    it('should handle WS_CONNECTION_START', () => {
        expect(
            wsReducer(undefined, {
                type: types.WS_CONNECTION_START,
                payload: true
            })
        ).toEqual({
            wsConnected: false,
            isPrivate: false,
            orders: [],
            ordersUser: [],
            total: 0,
            totalToday: 0,
            error: undefined
        })
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer(undefined, {
                type: types.WS_CONNECTION_SUCCESS,
            })
        ).toEqual({
            isPrivate: false,
            orders: [],
            ordersUser: [],
            total: 0,
            totalToday: 0,
            error: undefined,
            wsConnected: true
        })
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer(undefined, {
                type: types.WS_CONNECTION_ERROR,
                payload: true
            })
        ).toEqual({
            wsConnected: false,
            isPrivate: false,
            orders: [],
            ordersUser: [],
            total: 0,
            totalToday: 0,
            error: true
        })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer(undefined, {
                type: types.WS_CONNECTION_CLOSED,
            })
        ).toEqual({
            wsConnected: false,
            isPrivate: false,
            orders: [],
            ordersUser: [],
            total: 0,
            totalToday: 0,
            error: undefined
        })
    })

    it('should handle WS_GET_MESSAGE', () => {
        const payloadData = {
            orders: [{
                ingredients: ['string'],
                _id: 'string',
                name: 'string',
                status: 'string',
                number: 1,
                createdAt: 'string',
                updatedAt: 'string',
            }],
            ordersUser: [{
                ingredients: ['string'],
                _id: 'string',
                name: 'string',
                status: 'string',
                number: 1,
                createdAt: 'string',
                updatedAt: 'string',
            }],
            total: 'number',
            totalToday: 'number'
        }

        expect(
            wsReducer(undefined, {
                type: types.WS_GET_MESSAGE,
                orders: payloadData.orders,
                ordersUser: payloadData.ordersUser,
                total: payloadData.total,
                totalToday: payloadData.totalToday,
            })
        ).toEqual({
            wsConnected: false,
            isPrivate: false,
            error: undefined,
            orders: payloadData.orders,
            ordersUser: payloadData.ordersUser,
            total: payloadData.total,
            totalToday: payloadData.totalToday,
        })
    })

})