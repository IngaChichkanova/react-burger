import React, { FC, HTMLAttributes } from 'react';
import feedStyles from './feed.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

const Feed: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const location = useLocation();

    return (

        <section className={`mr-15`}>
            <section className={`mt-10 mb-6`}>
                {useMatch('/feed') && <h1 className="text text_type_main-large ">Лента заказов</h1>}
            </section>

            <section className={`${feedStyles.scroll} custom-scroll`}>
                <section className={`${feedStyles.feed} pt-6 pb-6 pl-6 pr-6 mb-2`}>
                    <Link
                        className={`${feedStyles.link}`}
                        to={`${'1111111'}`}
                        state={{ backgroundLocation: location }}
                    >
                        <div>
                            <div className={`${feedStyles.info} text text_type_digits-default`}>{'NUMBER'}</div>
                            <div className={`${feedStyles.time} text text_type_main-default text_color_inactive`}><FormattedDate date={new Date('2022-10-10T17:33:32.877Z')} /></div>
                        </div>

                        <div className={`${feedStyles.feedTitle} text text_type_main-medium mt-6 mb-6`}>{'TITLE'}</div>

                        <div className={`${feedStyles.feedInner}`}>
                            <div className={`${feedStyles.inner}`}>
                                <div className={`${feedStyles.pic}`}></div>
                            </div>
                            <div className={`${feedStyles.price} text text_type_main-default ml-6`}>
                                <div className={`${feedStyles.time} text text_type_main-medium ml-2`}>{'100'}</div>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </Link>
                </section>
            </section>

        </section>
    );
};

export default Feed;