import React from 'react';
import PropTypes, { number, string } from 'prop-types';
import burgerStyles from './burger-constructor.module.css';
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { ingredientList } = this.props;

        return (
            <section className={`${burgerStyles.section} mt-25 mb-5 ml-5 pl-4 pr-4`}>
                <section className={`${burgerStyles.sectionIngredients} `}>
                    {ingredientList.filter(element => element._id === "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mb-4 mr-4`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={ingredient.name}
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
                            text={ingredient.name}
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
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    ingredientList: PropTypes.shape({
        _id: string,
        name: string.isRequired,
        type: string.isRequired,
        proteins: number,
        fat: number,
        carbohydrates: number,
        calories: number,
        price: number.isRequired,
        image: string,
        image_mobile: string.isRequired,
        image_large: string,
        __v: number
    })
};