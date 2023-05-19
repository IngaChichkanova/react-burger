import { FC, HTMLAttributes, useState, useMemo } from 'react';
import burgerStyles from './burger-constructor.module.css';
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { clearOrder, doOrder } from '../../services/actions/order';
import { updateCurrentIngredientsList } from '../../services/actions/burder-constructor';
import { useDrop } from "react-dnd";
import DraggableItem from './draggable-items';
import { getCookie } from '../../utils/set-cookie';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient, TCurrentIngredientsRoot } from '../../utils/types';

const BurgerConstructor: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const currentIngredientsList = useSelector((state: { [prop in string]: TCurrentIngredientsRoot }) => state.burgerConstructor.currentIngredientsList);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleOrder = (): void => {
        setOpenModal(true);
        if (getCookie('token') && (localStorage.getItem('refreshToken'))) {
            let orderRequest = [
                ...currentIngredientsList,
                currentIngredientsList.filter((item: TIngredient) => item.type === 'bun')[0]
            ]

            doOrder(orderRequest.map((item: TIngredient) => item._id), dispatch);
        } else {
            navigate('/login');
        }
    }

    const handleClose = (): void => {
        setOpenModal(false);
        dispatch(clearOrder());
    }

    const bun = useMemo(() => currentIngredientsList.filter((item: TIngredient) => item.type === 'bun'), [currentIngredientsList]);
    const mainIngredients = useMemo(() => currentIngredientsList.filter((item: TIngredient) => item.type !== 'bun'), [currentIngredientsList]);

    const totalPrice = useMemo(() => currentIngredientsList.reduce((acc: number, item: TIngredient) => acc + item.price * (item.type === 'bun' ? 2 : 1), 0), [currentIngredientsList]);

    const onDropHandler = (item: TIngredient, uniqueKey: string): void => {
        let itemModificated = { ...item }
        itemModificated.uniqueKey = uniqueKey;
        if (item.type === "bun" && currentIngredientsList.some((item: TIngredient) => item.type === "bun")) {
            dispatch(updateCurrentIngredientsList([
                ...currentIngredientsList.filter((item: TIngredient) => item.type !== "bun"),
                itemModificated
            ]));
        } else {
            dispatch(updateCurrentIngredientsList([
                ...currentIngredientsList,
                itemModificated
            ]));
        }
    };

    const [{ isHover }, dropTargetBun] = useDrop({
        accept: ["bun", "sauce", "main"],
        drop(item: TIngredient) {
            onDropHandler(item, uuidv4());
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const removeIngredient = (ingredient: TIngredient): void => {
        dispatch(updateCurrentIngredientsList(currentIngredientsList.filter((item: TIngredient) => ingredient.uniqueKey !== item.uniqueKey)));
    }

    const moveItem = (draggedId: string, hoveredId: string) => {
        const draggedItemKey = currentIngredientsList.indexOf(currentIngredientsList.filter((el: TIngredient) => el.uniqueKey === draggedId)[0]);
        const draggedItem = currentIngredientsList.filter((el: TIngredient) => el.uniqueKey === draggedId)[0];
        const hoveredItemKey = currentIngredientsList.indexOf(currentIngredientsList.filter((el: TIngredient) => el.uniqueKey === hoveredId)[0]);

        let currentIngredients = [...currentIngredientsList];

        currentIngredients.splice(draggedItemKey, 1);
        currentIngredients.splice(hoveredItemKey, 0, draggedItem);

        dispatch(updateCurrentIngredientsList(currentIngredients));
    }

    const border = isHover ? '1px solid #8585AD' : 'none';

    return (
        <>
            <section className={`${burgerStyles.section} mt-25 mb-5 ml-5 pl-4 pr-4`} style={{ border }}
                ref={dropTargetBun}
            >
                <section className={`${burgerStyles.sectionIngredients} `}>



                    {bun.length > 0 ? bun.map((ingredient: TIngredient) => (<section key={ingredient.uniqueKey} className={`${burgerStyles.sectionIngredient} mb-4 mr-4`}>
                        <ConstructorElement
                            type="top"
                            isLocked
                            text={`${ingredient.name} (верх)`}
                            price={ingredient.price}
                            thumbnail={ingredient.image_mobile}
                        />
                    </section>)) :
                        <section className={`${burgerStyles.sectionIngredient} mb-4 mr-4`}>
                            <ConstructorElement
                                type="top"
                                isLocked
                                extraClass={burgerStyles.empty}
                                text={''}
                                thumbnail={''}
                                price={0}

                            />
                        </section>
                    }


                    {mainIngredients.length > 0 ?
                        <section className={`${burgerStyles.scroll} custom-scroll`}>
                            {mainIngredients.map((ingredient: TIngredient) => (
                                <DraggableItem
                                    key={ingredient.uniqueKey}
                                    className={`${burgerStyles.sectionIngredient} mt-4`}
                                    currentItem={ingredient}
                                    moveItem={moveItem}
                                >
                                    <>
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            text={ingredient.name}
                                            price={ingredient.price}
                                            thumbnail={ingredient.image_mobile}
                                            handleClose={() => {
                                                removeIngredient(ingredient)
                                            }}
                                        /></>
                                </DraggableItem>))}
                        </section>
                        :
                        <section className={`${burgerStyles.sectionIngredient} mb-4 mr-4`}>
                            <ConstructorElement
                                isLocked
                                extraClass={burgerStyles.empty}
                                text={''}
                                thumbnail={''}
                                price={0}
                            />
                        </section>
                    }


                    {bun.length > 0 ? bun.map((ingredient: TIngredient) => (<section key={ingredient.uniqueKey} className={`${burgerStyles.sectionIngredient} mt-4 mr-4`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked
                            text={`${ingredient.name} (низ)`}
                            price={ingredient.price}
                            thumbnail={ingredient.image_mobile}
                        />
                    </section>)) :
                        <section className={`${burgerStyles.sectionIngredient} mt-4 mr-4`}>
                            <ConstructorElement
                                type="bottom"
                                isLocked
                                extraClass={burgerStyles.empty}
                                text={''}
                                thumbnail={''}
                                price={0}
                            />
                        </section>
                    }

                </section >

                <section className={`${burgerStyles.sectionFooter} mt-10`}>
                    <p className={`text text_type_main-large mr-10`}>
                        <span className="mr-2">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button disabled={!(currentIngredientsList.length > 0 && currentIngredientsList.filter((item: TIngredient) => item.type === 'bun').length > 0)} onClick={handleOrder} htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </section>
            </section >

            {openModal && <Modal onClose={handleClose}>
                <OrderDetails />
            </Modal>}
        </>
    );
}

export default BurgerConstructor;



