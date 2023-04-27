import { useEffect } from 'react';
import orderDetailsStyles from '././order-details.module.css';
import orderChecked from '../../icons/orderChecked.svg';
import { useSelector, useDispatch } from 'react-redux';
import { doOrder } from '../../services/actions/ingredients';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/set-cookie';

const OrderDetails = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { currentIngredientsList, order, orderRequest, orderFailed } = useSelector(state => state.ingredients);

    useEffect(() => {
        if (getCookie('token') && (localStorage.getItem('refreshToken'))) {
            doOrder(currentIngredientsList.map(item => item._id), dispatch);
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
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