import React, { useEffect } from 'react';
import orderDetailsStyles from '././order-details.module.css';
import orderChecked from '../../icons/orderChecked.svg';
import { useSelector, useDispatch } from 'react-redux';
import { doOrder } from '../../services/actions/ingredients';
import { useAuth } from '../../services/auth';
import { Navigate } from 'react-router-dom';

const OrderDetails = () => {
    let { getUser } = useAuth();
    const dispatch = useDispatch();
    const { getUserSuccess , getUserRequest} = useSelector(state => state.login);
    const { currentIngredientsList, order, orderRequest, orderFailed } = useSelector(state => state.ingredients);

    useEffect(() => {
        checkUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkUser = async () => {
        await getUser();

    };

    useEffect(() => {
        if(getUserSuccess){
         dispatch(doOrder(currentIngredientsList.map(item => item._id)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUserSuccess])

    return (
        (!getUserRequest && !getUserSuccess) ? <Navigate to="/login" replace /> :
        <div className={`${orderDetailsStyles.order} mt-30  mb-30`}>
            {!orderRequest && !orderFailed && <>
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