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
import { TWSState } from '../services/reducers/ws';
import { wsStart, wsClose } from '../services/actions/ws';
import { TUserState } from '../services/reducers/user';

export const FeedInfoPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const currentOrder = useSelector((state: { [prop in string]: TOrderState }) => state.order.currentOrder);
    const ingredientsListRequest = useSelector((state: { [prop in string]: TIngredientsState }) => state.ingredients.ingredientsListRequest);
    const ingredientsList = useSelector((state: { [prop in string]: TIngredientsState }) => state.ingredients.ingredientsList);
    const orders = useSelector((state: { [prop in string]: TWSState }) => state.track.orders);
    const user = useSelector((state: { [prop in string]: TUserState }) => state.user.user);

    useEffect((): ReturnType<React.EffectCallback> => {
        if (!location.state) {
            dispatch(getIngedients());
        } else {
            getCurrent();
        }

        return (): any => {
            dispatch(updateCurrentOrder(null));
            dispatch(wsClose());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect((): ReturnType<React.EffectCallback> => {
        if (currentOrder === null)
            getCurrent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders])



    useEffect(() => {
        if (!location.state && !ingredientsListRequest && ingredientsList.length > 0) {
            if (location.pathname.match(/\/profile/) && user) {
                dispatch(wsStart(true));
            } else {
                dispatch(wsStart(false));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, ingredientsListRequest, ingredientsList])

    useEffect(() => {
        if (!location.state && orders.length > 0) {
            getCurrent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders])

    const getCurrent = (): void => {
        let currentId = location.pathname.match(/\/profile/) ? location.pathname.split('/profile/orders/')[1] : location.pathname.split('/feed/')[1];
        let current = orders.filter((item: TOrderTrack) => item._id === currentId);
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
