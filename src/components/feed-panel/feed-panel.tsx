import React, { FC, HTMLAttributes } from 'react';
import feedPanelStyles from './feed-panel.module.css';

const FeedPanel: FC<HTMLAttributes<HTMLHtmlElement>> = () => {

    return (

        <section className={`${feedPanelStyles.panel} mt-25`}>
            <div className={`${feedPanelStyles.info} mb-15`}>
                <div className={`${feedPanelStyles.ready} mr-9`}>
                    <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
                    <div>
                        <div className={`${feedPanelStyles.number} mb-2 text text_type_digits-default`}>{'00000'}</div>
                    </div>
                </div>
                <div className={`${feedPanelStyles.progress}`}>
                    <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
                    <div className={` mb-2 text text_type_digits-default`}>{'00000'}</div>
                </div>
            </div>

            <div className={`${feedPanelStyles.infoDone} mb-15`}>
                <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
                <div className={`${feedPanelStyles.numberDone} text text_type_digits-large`}>{'00000'}</div>
            </div>

            <div className={`${feedPanelStyles.infoDone}`}>
                <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
                <div className={`${feedPanelStyles.numberDone} text text_type_digits-large`}>{'00000'}</div>
            </div>
        </section>
    );
};

export default FeedPanel;