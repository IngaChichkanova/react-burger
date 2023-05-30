import React, { FC, HTMLAttributes } from 'react';
import feedInfoStyles from './feed-info.module.css';
import { useEffect } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppDispatch, TOrderTrack, TIngredient } from '../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { TOrderState } from '../services/reducers/order';
import { TIngredientsState } from '../services/reducers/ingredients';
import { useLocation } from 'react-router';
import { getIngedients } from '../services/actions/ingredients';
import { updateCurrentOrder } from '../services/actions/order';
import { watchOrdersPublicTrack, watchOrdersPrivateTrack } from '../services/actions/order';

export const FeedInfoPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const ordersTrackPublicOpen = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPublicOpen);
    const ordersTrackPublicSuccess = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPublicSuccess);
    const currentOrder = useSelector((state: { [prop in string]: TOrderState }) => state.order.currentOrder);
    const ordersPublicTrack = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersPublicTrack);
    const ingredientsListRequest = useSelector((state: { [prop in string]: TIngredientsState }) => state.ingredients.ingredientsListRequest);
    const ingredientsList = useSelector((state: { [prop in string]: TIngredientsState }) => state.ingredients.ingredientsList);
    const ordersTrackPrivateOpen = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPrivateOpen);
    const ordersTrackPrivateSuccess = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPrivateSuccess);
    const ordersPrivateTrack = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersPrivateTrack);

    useEffect((): ReturnType<React.EffectCallback> => {
        if (!location.state) {
            dispatch(getIngedients());
        } else {
            getCurrent();
        }

        return (): any => dispatch(updateCurrentOrder(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect((): ReturnType<React.EffectCallback> => {
        if (currentOrder === null)
            getCurrent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordersPublicTrack])

    useEffect(() => {
        if (!location.state && !ingredientsListRequest && ingredientsList.length > 0) {
            if (location.pathname.match(/\/profile/)) {
                dispatch(watchOrdersPrivateTrack());
            } else {
                dispatch(watchOrdersPublicTrack());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredientsListRequest, ingredientsList])

    useEffect(() => {
        if (!location.state && ordersTrackPublicOpen && ordersTrackPublicSuccess && ordersPublicTrack.length > 0) {
            getCurrent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordersTrackPublicOpen, ordersTrackPublicSuccess, ordersPublicTrack])

    const getCurrent = (): void => {
        let currentId = location.pathname.match(/\/profile/) ? location.pathname.split('/profile/orders/')[1] : location.pathname.split('/feed/')[1];
        let current = location.pathname.match(/\/profile/) ? ordersPrivateTrack.filter((item: TOrderTrack) => item._id === currentId) : ordersPublicTrack.filter((item: TOrderTrack) => item._id === currentId);
        if (current.length > 0) {
            dispatch(updateCurrentOrder(current[0]))
        }
    }

    const getStatus = (): string => {
        switch (currentOrder?.status) {
            case 'done':
            default:
                return 'Выполнен';
            case 'pending':
                return 'В работе';
            case 'created':
                return 'Создан'
        }
    }

    const ingredientsInfo = (): Array<TIngredient> => {
        let ingredients: Array<TIngredient> = [];
        let ids: Array<string> = currentOrder ? currentOrder.ingredients : [];
        ingredientsList.forEach(item => {
            if (ids.some(el => el === item._id)) {
                ingredients.push(item);
            }
        })

        return ingredients
    }

    const getQuantity = (item: TIngredient): number | undefined => {
        if (currentOrder)
            return currentOrder?.ingredients.filter(el => el === item._id).length
    };

    return (
        <main className={`${feedInfoStyles.main} mt-10 ml-10 mr-10 mb-10`} style={{ margin: !location.state ? 'auto' : '' }}>
            {currentOrder && <>
                <div className={`${feedInfoStyles.header} text text_type_digits-default mb-10`}>
                    {`#${currentOrder.number}`}
                </div>

                <div className={`${feedInfoStyles.text} text text_type_main-medium mb-3`}>
                    {currentOrder.name}
                </div>

                <div className={`${feedInfoStyles.state} ${feedInfoStyles[currentOrder.status]} text text_type_main-default mb-15`}>
                    {getStatus()}
                </div>

                <div className={`${feedInfoStyles.text} text text_type_main-medium mb-6`}>
                    Состав:
                </div>

                <div className={`${feedInfoStyles.inner} mb-10 pr-6 custom-scroll`}>
                    {ingredientsInfo().map((item, key) => (<div key={key} className={`${feedInfoStyles.ingredient} mb-4`}>
                        <div className={`${feedInfoStyles.ingredientFirstBlock}`}>
                            <div className={`${feedInfoStyles.icon}`}>
                                <img alt={item.name} src={item.image_mobile} />
                            </div>
                            <div className={`${feedInfoStyles.title} test text_type_main-default mr-4 ml-4`}>{item.name}</div>
                        </div>
                        <div className={`${feedInfoStyles.price}`}>
                            <div className={` text text_type_digits-default mr-1`}>{`${getQuantity(item)} x ${item.price}`}</div>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>))}
                </div>

                <div className={`${feedInfoStyles.footer} text text_type_digits-default`}>
                    <div className={`${feedInfoStyles.time} text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(currentOrder.createdAt)} />
                    </div>
                    <div className={`${feedInfoStyles.price}`}>
                        <div className={`${feedInfoStyles.ingredient} mr-1`}>{ingredientsInfo().reduce((acc: number, item: TIngredient) => acc + item.price, 0)}</div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </>}
        </main>
    );
};
