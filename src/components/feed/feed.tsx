import React, { FC, HTMLAttributes, useEffect } from 'react';
import feedStyles from './feed.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { watchOrdersPublicTrack } from '../../services/actions/order';
import { useDispatch, useSelector } from 'react-redux';
import { TOrderState } from '../../services/reducers/order';
import { getIngedients } from '../../services/actions/ingredients';
import { AppDispatch, TIngredient } from '../../utils/types';
import { TIngredientsState } from '../../services/reducers/ingredients';

const Feed: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const ordersTrackPublicOpen = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPublicOpen);
    const ordersTrackPublicSuccess = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPublicSuccess);
    const ordersPublicTrack = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersPublicTrack);
    const ingredientsListRequest = useSelector((state: { [prop in string]: TIngredientsState }) => state.ingredients.ingredientsListRequest);
    const ingredientsList = useSelector((state: { [prop in string]: TIngredientsState }) => state.ingredients.ingredientsList);

    useEffect(() => {
        dispatch(getIngedients());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!ingredientsListRequest && ingredientsList.length > 0) {
            //(useMatch('/feed')
            dispatch(watchOrdersPublicTrack());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredientsListRequest, ingredientsList])

    const ingredientsInfo = (ids: Array<string>): Array<TIngredient> => {
        let ingredients: Array<TIngredient> = [];
        ingredientsList.forEach(item => {
            if (ids.some(el => el === item._id)) {
                ingredients.push(item);
            }
        })
        return ingredients
    }

    return (

        <section className={`mr-15`}>
            <section className={`mt-10 mb-6`}>
                {useMatch('/feed') && <h1 className="text text_type_main-large ">Лента заказов</h1>}
            </section>

            {ordersTrackPublicOpen && ordersTrackPublicSuccess &&
                <section className={`${feedStyles.scroll} custom-scroll`}>
                    {ordersPublicTrack.map(item => (
                        <section key={item._id} className={`${feedStyles.feed} pt-6 pb-6 pl-6 pr-6 mb-6`}>
                            <Link
                                className={`${feedStyles.link}`}
                                to={`${item._id}`}
                                state={{ backgroundLocation: location }}
                            >
                                <div>
                                    <div className={`${feedStyles.info} text text_type_digits-default`}>{`#${item.number}`}</div>
                                    <div className={`${feedStyles.time} text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(item.createdAt)} /></div>
                                </div>

                                <div className={`${feedStyles.feedTitle} text text_type_main-medium mt-6 mb-6`}>{item.name}</div>

                                <div className={`${feedStyles.feedInner}`}>
                                    <div className={`${feedStyles.inner}`}>
                                        <>
                                            {ingredientsInfo(item.ingredients).slice(0, ingredientsInfo(item.ingredients).length >= 6 ? 6 : ingredientsInfo(item.ingredients).length).map((ingredient, key) => (<div key={key} className={`${feedStyles.pic} ${ingredientsInfo(item.ingredients).length >= 6 && ((key + 1) === (ingredientsInfo(item.ingredients).slice(0, ingredientsInfo(item.ingredients).length >= 6 ? 6 : ingredientsInfo(item.ingredients).length).length)) ? feedStyles.picLess : ''}`} style={{ zIndex: ingredientsInfo(item.ingredients).length - key }}>
                                                <img alt={ingredient.name} src={ingredient.image_mobile} />
                                            </div>))}
                                            {ingredientsInfo(item.ingredients).length >= 6 && <div className={`${feedStyles.picMore} text text_type_main-default`} style={{ zIndex: ingredientsInfo(item.ingredients).length }}>{`+${ingredientsInfo(item.ingredients).slice(-(ingredientsInfo(item.ingredients).length - 6)).length}`}</div>}
                                        </>
                                    </div>
                                    <div className={`${feedStyles.price} text text_type_main-default ml-6`}>
                                        <div className={`${feedStyles.time} text text_type_main-medium ml-2 mr-2`}>{ingredientsInfo(item.ingredients).reduce((acc: number, item: TIngredient) => acc + item.price * (item.type === 'bun' ? 2 : 1), 0)}</div>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            </Link>
                        </section>
                    ))}
                </section>
            }
        </section>
    );
};

export default Feed;