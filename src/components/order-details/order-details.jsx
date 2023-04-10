import React, { useContext } from 'react';
import orderDetailsStyles from '././order-details.module.css';
import orderChecked from '../../icons/orderChecked.svg';
import { OrderDetailsContext } from '../../services/burgerConstructorContext.js';
import PropTypes from 'prop-types';

const OrderDetails = () => {
    const { orderNumber } = useContext(OrderDetailsContext);

    return (
        <section className={`${orderDetailsStyles.order}  mb-30`}>
            <p className={`${orderDetailsStyles.total} text text_type_digits-large`}>{orderNumber}</p>
            <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
            <p className={`mt-15 mb-15`}>
                <img src={orderChecked} alt="orderChecked" />
            </p>
            <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
            <p className={`${orderDetailsStyles.info} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
        </section>
    );
}

export default OrderDetails;

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
};