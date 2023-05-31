import React, { FC, HTMLAttributes } from 'react';
import feedPanelStyles from './feed-panel.module.css';
import { useSelector } from 'react-redux';
import { TWSState } from '../../services/reducers/ws';

const FeedPanel: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const orders = useSelector((state: { [prop in string]: TWSState }) => state.track.orders);
    const total = useSelector((state: { [prop in string]: TWSState }) => state.track.total);
    const totalToday = useSelector((state: { [prop in string]: TWSState }) => state.track.totalToday);

    return (

        <section className={`${feedPanelStyles.panel} mt-25 custom-scroll`}>

            <div className={`${feedPanelStyles.info} mb-15`}>
                <div className={`${feedPanelStyles.ready} mr-9`}>
                    <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
                    <div className={`${feedPanelStyles.wrapper}`}>
                        {orders.filter(item => item.status === 'done').map(item => (
                            <div key={item._id} className={`${feedPanelStyles.number} mb-2 text text_type_digits-default mr-2`}>{item.number}</div>
                        ))}
                    </div>
                </div>
                <div className={`${feedPanelStyles.progress}`}>
                    <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
                    <div className={`${feedPanelStyles.wrapper}`}>
                        {orders.filter(item => item.status === 'done').map(item => (
                            <div key={item._id} className={` mb-2 text text_type_digits-default mr-2`}>{item.number}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`${feedPanelStyles.infoDone} mb-15`}>
                <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
                <div className={`${feedPanelStyles.numberDone} text text_type_digits-large`}>{total}</div>
            </div>

            <div className={`${feedPanelStyles.infoDone}`}>
                <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
                <div className={`${feedPanelStyles.numberDone} text text_type_digits-large`}>{totalToday}</div>
            </div>

        </section>
    );
};

export default FeedPanel;