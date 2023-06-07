import { FC, HTMLAttributes } from 'react';
import orderDetailsStyles from '././order-details.module.css';
import orderChecked from '../../icons/orderChecked.svg';
import { useSelector, RootState } from '../../utils/types';

const OrderDetails: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const order = useSelector((state: RootState) => state.order.order);
    const orderRequest = useSelector((state: RootState) => state.order.orderRequest);
    const orderFailed = useSelector((state: RootState) => state.order.orderFailed);
   
    return (
        <div className={`${orderDetailsStyles.order} mt-30  mb-30`}>
            {!orderRequest && !orderFailed && order && <>
                <p className={`${orderDetailsStyles.total} text text_type_digits-large`}>{order.number}</p>
                <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
                <p className={`mt-15 mb-15`}>
                    <img src={orderChecked} alt="orderChecked" />
                </p>
                <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
                <p className={`${orderDetailsStyles.info} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
            </>}

            {!orderRequest && orderFailed && <p className={`text text_type_main-medium mt-8`}>Ошибка заказа</p>}
            {orderRequest && <p className={`text text_type_main-medium mt-8`}>Загрузка...</p>}
        </div>
    );
}

export default OrderDetails;