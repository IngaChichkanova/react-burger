import React, { FC, HTMLAttributes } from 'react';
import feedPanelStyles from './feed-panel.module.css';
import { useSelector } from 'react-redux';
import { TOrderState } from '../../services/reducers/order';

const FeedPanel: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const ordersTrackPublicOpen = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPublicOpen);
    const ordersTrackPublicSuccess = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPublicSuccess);
    const ordersTrackPublicTotal = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPublicTotal);
    const ordersTrackPublicTotalToday = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersTrackPublicTotalToday);
    const ordersPublicTrack = useSelector((state: { [prop in string]: TOrderState }) => state.order.ordersPublicTrack);

    return (

        <section className={`${feedPanelStyles.panel} mt-25 custom-scroll`}>
            {ordersTrackPublicOpen && ordersTrackPublicSuccess && <>
                <div className={`${feedPanelStyles.info} mb-15`}>
                    <div className={`${feedPanelStyles.ready} mr-9`}>
                        <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
                        <div className={`${feedPanelStyles.wrapper}`}>
                            {ordersPublicTrack.filter(item => item.status === 'done').map(item => (
                                <div key={item._id} className={`${feedPanelStyles.number} mb-2 text text_type_digits-default mr-2`}>{item.number}</div>
                            ))}
                        </div>
                    </div>
                    <div className={`${feedPanelStyles.progress}`}>
                        <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
                        <div className={`${feedPanelStyles.wrapper}`}>
                            {ordersPublicTrack.filter(item => item.status === 'done').map(item => (
                                <div key={item._id} className={` mb-2 text text_type_digits-default mr-2`}>{item.number}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`${feedPanelStyles.infoDone} mb-15`}>
                    <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
                    <div className={`${feedPanelStyles.numberDone} text text_type_digits-large`}>{ordersTrackPublicTotal}</div>
                </div>

                <div className={`${feedPanelStyles.infoDone}`}>
                    <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
                    <div className={`${feedPanelStyles.numberDone} text text_type_digits-large`}>{ordersTrackPublicTotalToday}</div>
                </div>
            </>}
        </section>
    );
};

export default FeedPanel;