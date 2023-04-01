import React from 'react';
import orderDetailsStyles from '././order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = () => {

    return (
        <section className={`${orderDetailsStyles.order}  mb-30`}>
            <p className={`${orderDetailsStyles.total} text text_type_digits-large`}>0534536</p>
            <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
            <p className={`mt-8 mb-8`}><CheckMarkIcon type="primary" /></p>
            <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
            <p className={`${orderDetailsStyles.info} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
        </section>
    );
}

export default OrderDetails;