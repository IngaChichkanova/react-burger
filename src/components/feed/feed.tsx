import React, { FC, HTMLAttributes, useEffect } from 'react';
import feedStyles from './feed.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { getIngedients } from '../../services/actions/ingredients';
import { useDispatch, TIngredient, useSelector, RootState } from '../../utils/types';
import { wsStart, wsClose, setPrivite } from '../../services/actions/ws';

const Feed: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.track.orders);
    const ordersUser = useSelector((state: RootState) => state.track.ordersUser);;
    const ingredientsList = useSelector((state: RootState) => state.ingredients.ingredientsList);
    const user = useSelector((state: RootState) => state.user.user);

    useEffect((): ReturnType<React.EffectCallback> => {
        setPriviteAsync();
        dispatch(getIngedients());
        return (): any => dispatch(wsClose())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setPriviteAsync = async () => {
        await dispatch(setPrivite(location.pathname.match(/\/profile/) ? true : false));
    }

    useEffect(() => {
        if (location.pathname.match(/\/profile/)) {
            if (user) {
                dispatch(wsStart());
            }
        } else {
            dispatch(wsStart());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const ingredientsInfo = (ids: Array<string>): Array<TIngredient> => {
        let ingredients: Array<TIngredient> = [];
        ingredientsList.forEach(item => {
            if (ids.some(el => el === item._id)) {
                ingredients.push(item);
            }
        })
        return ingredients
    }

    const isPrivate: boolean = (location.pathname.match(/\/profile/)) ? true : false;

    const getStatus = (current: string): string => {
        switch (current) {
            case 'done':
            default:
                return 'Выполнен';
            case 'pending':
                return 'В работе';
            case 'created':
                return 'Создан'
        }
    }

    return (

        <section className={`mr-15 ${isPrivate ? 'mb-10' : ''}`}>
            <section className={`mt-10 mb-6`}>
                {useMatch('/feed') && <h1 className="text text_type_main-large ">Лента заказов</h1>}
            </section>

            <section className={`${feedStyles.scroll} custom-scroll`} style={{ height: isPrivate ? 'calc(100% - 194px)' : 'calc(100% - 130px)' }}>
                {(isPrivate ? ordersUser : orders).map(item => (
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

                            <div className={`${feedStyles.feedTitle} text text_type_main-medium ${isPrivate ? 'mb-2' : 'mb-6'} mt-6 `}>{item.name}</div>

                            {isPrivate && <div className={`${feedStyles.time} text text_type_main-default ${feedStyles[item.status]} mb-6`}>{getStatus(item.status)}</div>}

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

        </section>
    );
};

export default Feed;