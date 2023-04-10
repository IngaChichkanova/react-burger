import React, { useState, useMemo, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ingredientListPropTypes } from '../../utils/prop-types';
import burgerStyles from './burger-constructor.module.css';
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { OrderDetailsContext } from '../../services/burgerConstructorContext.js';
import { doOrder } from '../../utils/burger-api';

const initialState = { totalPrice: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "price":
            return { totalPrice: action.payload };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

const BurgerConstructor = ({ ingredientList }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [openModal, setOpenModal] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const [hasError, setHasError] = useState(false);

    const handleOrder = () => {
        doOrder(ingredientList.map(item => item._id))
            .then(response => {
                setHasError(false);
                setOrderNumber(response.order.number);
                handleClose(!openModal);
            })
            .catch((e) => {
                console.error(e);
                setHasError(true);
            });
    }

    const handleClose = () => {
        setOpenModal(!openModal);
    }

    const bun = useMemo(() => ingredientList.find((item) => item.type === 'bun'), [ingredientList]);
    const mainIngredients = useMemo(() => ingredientList.filter((item) => item.type !== 'bun'), [ingredientList]);

    useEffect(() => {
        dispatch({ type: "price", payload: ingredientList.reduce((acc, item) => acc + item.price * (bun && bun._id === item._id ? 2 : 1), 0) });
    }, [ingredientList, bun]);

    useEffect(() => {
        if (!openModal) setOrderNumber(null);
    }, [openModal]);

    return (
        <>
            <OrderDetailsContext.Provider value={{ orderNumber, setOrderNumber }}>
                <section className={`${burgerStyles.section} mt-25 mb-5 ml-5 pl-4 pr-4`}>
                    <section className={`${burgerStyles.sectionIngredients} `}>
                        {bun && <section className={`${burgerStyles.sectionIngredient} mb-4 mr-4`}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            />
                        </section>}

                        <section className={`${burgerStyles.scroll} custom-scroll`}>
                            {mainIngredients.map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mt-4`}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image_mobile}
                                />
                            </section>))}
                        </section>

                        {bun && <section className={`${burgerStyles.sectionIngredient} mt-4 mr-4`}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            />
                        </section>}
                    </section>

                    <section className={`${burgerStyles.sectionFooter} mt-10`}>
                        <p className={`text text_type_main-large mr-10`}>
                            <span className="mr-2">{state.totalPrice}</span>
                            <CurrencyIcon type="primary" />
                        </p>
                        <Button onClick={handleOrder} htmlType="button" type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </section>
                </section>

                {!hasError && openModal && orderNumber && <Modal onClose={handleClose} component={<OrderDetails />} />}
            </OrderDetailsContext.Provider>
        </>
    );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientListPropTypes).isRequired
};



