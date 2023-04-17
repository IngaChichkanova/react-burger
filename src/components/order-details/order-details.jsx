import React, { useEffect } from 'react';
import orderDetailsStyles from '././order-details.module.css';
import orderChecked from '../../icons/orderChecked.svg';
import { useSelector, useDispatch } from 'react-redux';
import { doOrder } from '../../services/actions/ingredients';
import { GET_ORDER_SUCCESS } from '../../services/actions/ingredients';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { currentIngredientsList, order, orderRequest, orderFailed } = useSelector(state => state.ingredients);

    useEffect(() => {
        dispatch(doOrder(currentIngredientsList.map(item => item._id)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch({ type: GET_ORDER_SUCCESS, payload: {} });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderFailed])

    return (
        <section className={`${orderDetailsStyles.order}  mb-30`}>
            {order.number && !orderRequest && !orderFailed && <>
                <p className={`${orderDetailsStyles.total} text text_type_digits-large`}>{order.number}</p>
                <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
                <p className={`mt-15 mb-15`}>
                    <img src={orderChecked} alt="orderChecked" />
                </p>
                <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
                <p className={`${orderDetailsStyles.info} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
            </>}
        </section>
    );
}

export default OrderDetails;