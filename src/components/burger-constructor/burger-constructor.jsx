import React, { useState, useMemo } from 'react';
//import PropTypes from 'prop-types';
//import { ingredientListPropTypes } from '../../utils/prop-types';
import burgerStyles from './burger-constructor.module.css';
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { GET_ORDER_SUCCESS, CURRENT_INGREDIENTS_LIST } from '../../services/actions/ingredients';
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { currentIngredientsList, ingredientsList } = useSelector(state => state.ingredients);

    const [openModal, setOpenModal] = useState(false);

    const handleOrder = () => {
        if (currentIngredientsList.length > 0) {
            setOpenModal(true);
        }
    }

    const handleClose = () => {
        setOpenModal(false);
        dispatch({ type: GET_ORDER_SUCCESS, payload: {} });
    }

    const bun = useMemo(() => currentIngredientsList.find((item) => item.type === 'bun'), [currentIngredientsList]);
    const mainIngredients = useMemo(() => currentIngredientsList.filter((item) => item.type !== 'bun'), [currentIngredientsList]);

    const totalPrice = useMemo(() => currentIngredientsList.reduce((acc, item) => acc + item.price * (bun && bun._id === item._id ? 2 : 1), 0), [currentIngredientsList, bun]);

    const onDropHandler = (item) => {
        if (item.type === "bun" && currentIngredientsList.some(item => item.type === "bun")) {
            dispatch({
                type: CURRENT_INGREDIENTS_LIST, payload: [
                    ...currentIngredientsList.filter(item => item.type !== "bun"),
                    item
                ]
            });
        } else {
            dispatch({
                type: CURRENT_INGREDIENTS_LIST, payload: [
                    ...currentIngredientsList,
                    item
                ]
            });
        }
    };

    const [{ }, dropTargetBun] = useDrop({
        accept: ["bun", "sauce", "main"],
        drop(item) {
            onDropHandler(item);
        },
        collect: monitor => ({

        }),
        hover: (item, monitor) => {
            // works fine and prints the correct data
            // console.log(item);
            //console.log(monitor.canDrop()) // true
        },
    }, [currentIngredientsList]);

    const removeIngredient = (ingredient, key) => {
        dispatch({
            type: CURRENT_INGREDIENTS_LIST, payload: [
                ...[bun],
                ...mainIngredients.filter((item, itemKey) => !(ingredient._id === item._id && itemKey === key))
            ]
        });
    }

    return (
        <>
            <section className={`${burgerStyles.section} mt-25 mb-5 ml-5 pl-4 pr-4`}
                ref={dropTargetBun}
            >


                <section className={`${burgerStyles.sectionIngredients} `}>

                    <section

                        className={`${burgerStyles.sectionIngredient} mb-4 mr-4`}>
                        <ConstructorElement
                            type="top"
                            isLocked
                            extraClass={bun ? '' : burgerStyles.empty}
                            text={bun ? `${bun.name} (верх)` : ''}
                            price={bun ? bun.price : ''}
                            thumbnail={bun ? bun.image_mobile : ''}
                        />
                    </section>

                    {mainIngredients.length > 0 ?
                        <section className={`${burgerStyles.scroll} custom-scroll`}>
                            {mainIngredients.map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mt-4`}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image_mobile}
                                    handleClose={() => removeIngredient(ingredient, key)}
                                />
                            </section>))}
                        </section>
                        :
                        <section className={`${burgerStyles.sectionIngredient} mb-4 mr-4`}>
                            <ConstructorElement
                                isLocked
                                extraClass={burgerStyles.empty}
                            />
                        </section>
                    }

                    <section className={`${burgerStyles.sectionIngredient} mt-4 mr-4`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked
                            extraClass={bun ? '' : burgerStyles.empty}
                            text={bun ? `${bun.name} (низ)` : ''}
                            price={bun ? bun.price : ''}
                            thumbnail={bun ? bun.image_mobile : ''}
                        />
                    </section>

                </section>

                <section className={`${burgerStyles.sectionFooter} mt-10`}>
                    <p className={`text text_type_main-large mr-10`}>
                        <span className="mr-2">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button onClick={handleOrder} htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </section>
            </section>

            {openModal && <Modal onClose={handleClose} component={<OrderDetails />} />}
        </>
    );
}

export default BurgerConstructor;

//BurgerConstructor.propTypes = {
//    currentIngredientsList: PropTypes.arrayOf(ingredientListPropTypes).isRequired
//};



