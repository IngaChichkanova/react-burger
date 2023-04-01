import React from 'react';
import { ingredientListPropTypes } from '../../utils/prop-types';
import burgerStyles from './burger-constructor.module.css';
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ ingredientList }) => {

    return (
        <section className={`${burgerStyles.section} mt-25 mb-5 ml-5 pl-4 pr-4`}>
            <section className={`${burgerStyles.sectionIngredients} `}>
                {ingredientList.filter(element => element._id === "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mb-4 mr-4`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${ingredient.name} (верх)`}
                        price={ingredient.price}
                        thumbnail={ingredient.image_mobile}
                    />
                </section>))}
                <section className={`${burgerStyles.scroll} custom-scroll`}>
                    {ingredientList.filter(element => element._id !== "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mt-4`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image_mobile}
                        />
                    </section>))}
                </section>
                {ingredientList.filter(element => element._id === "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mt-4 mr-4`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${ingredient.name} (низ)`}
                        price={ingredient.price}
                        thumbnail={ingredient.image_mobile}
                    />
                </section>))}
            </section>

            <section className={`${burgerStyles.sectionFooter} mt-10`}>
                <p className={`text text_type_main-large mr-10`}>
                    <span className="mr-2">610</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
}

export default BurgerConstructor;

ingredientListPropTypes(BurgerConstructor);

