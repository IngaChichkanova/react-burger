import React, { useState, useMemo } from 'react';
import burgerStyles from './burger-constructor.module.css';
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { GET_ORDER_SUCCESS, CURRENT_INGREDIENTS_LIST } from '../../services/actions/ingredients';
import { useDrop } from "react-dnd";
import DraggableItem from './draggable-items';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { currentIngredientsList } = useSelector(state => state.ingredients);

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

    const [{ isHover }, dropTargetBun] = useDrop({
        accept: ["bun", "sauce", "main"],
        drop(item) {
            onDropHandler(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const removeIngredient = (ingredient, key) => {
        dispatch({
            type: CURRENT_INGREDIENTS_LIST, payload: [
                ...[bun],
                ...mainIngredients.filter((item, itemKey) => !(ingredient._id === item._id && itemKey === key))
            ]
        });
    }

    const moveItem = (dragIndex, hoverIndex) => {
        let currentIngredients = mainIngredients;
        let movingItem = currentIngredients[dragIndex];
        currentIngredients.splice(dragIndex, 1);
        currentIngredients.splice(hoverIndex, 0, movingItem);
        dispatch({
            type: CURRENT_INGREDIENTS_LIST, payload: currentIngredients.concat(bun ? [bun] : [])
        });
    }

    const border = isHover ? '1px solid #8585AD' : 'none';

    return (
        <>
            <section className={`${burgerStyles.section} mt-25 mb-5 ml-5 pl-4 pr-4`} style={{border}}
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
                            {mainIngredients.map((ingredient, key) => (
                                <DraggableItem
                                    key={key}
                                    className={`${burgerStyles.sectionIngredient} mt-4`}
                                    item={ingredient}
                                    index={key}
                                    id={ingredient._id}
                                    moveItem={moveItem}
                                >
                                    <>
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            text={ingredient.name}
                                            price={ingredient.price}
                                            thumbnail={ingredient.image_mobile}
                                            handleClose={() => removeIngredient(ingredient, key)}
                                        /></>
                                </DraggableItem>))}
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

                </section >

                <section className={`${burgerStyles.sectionFooter} mt-10`}>
                    <p className={`text text_type_main-large mr-10`}>
                        <span className="mr-2">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button onClick={handleOrder} htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </section>
            </section >

            {openModal && <Modal onClose={handleClose} component={<OrderDetails />} />}
        </>
    );
}

export default BurgerConstructor;



