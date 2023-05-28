import React, { FC, HTMLAttributes } from 'react';
import feedInfoStyles from './feed-info.module.css';
import { useState } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

export const FeedInfoPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const [color, setColor] = useState<string>('done');

    return (
        <main className={`${feedInfoStyles.main}`}>
            <div className={`${feedInfoStyles.header} text text_type_digits-default mb-10`}>
                434324234
            </div>

            <div className={`${feedInfoStyles.text} text text_type_main-medium mb-3`}>
                TITLE
            </div>

            <div className={`${feedInfoStyles.state} ${feedInfoStyles[color]} text text_type_main-default mb-15`}>
                state
            </div>

            <div className={`${feedInfoStyles.text} text text_type_main-medium mb-6`}>
                Состав:
            </div>

            <div className={`${feedInfoStyles.inner} mb-10`}>
                <div className={`${feedInfoStyles.ingredient}`}>
                    <div className={`${feedInfoStyles.icon}`}></div>
                    <div className={`${feedInfoStyles.title}`}>title</div>
                    <div className={`${feedInfoStyles.price}`}>
                        <div className={`${feedInfoStyles.ingredient}`}>111</div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>

            <div className={`${feedInfoStyles.footer} text text_type_digits-default mb-10`}>
                <div className={`${feedInfoStyles.time} text text_type_main-default text_color_inactive`}><FormattedDate date={new Date('2022-10-10T17:33:32.877Z')} />
                </div>
                <div className={`${feedInfoStyles.price}`}>
                    <div className={`${feedInfoStyles.ingredient}`}>1111</div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </main>
    );
};
