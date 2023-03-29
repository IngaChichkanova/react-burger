import React from 'react';
import burgerStyles from './burger-constructor.module.css';
import { DragIcon, CurrencyIcon, DeleteIcon, LockIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data } = this.props;

        return (
            <section className={`${burgerStyles.section} mt-25 mb-10 ml-5 pl-4 pr-4`}>
                <section className={`${burgerStyles.sectionIngredients} `}>
                    {data.filter(element => element._id === "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mb-4`}>
                        <>

                            <div className={`${burgerStyles.ingredient} ${burgerStyles.ingredientTop} ml-6 pt-4 pb-4 text text_type_main-small`}>
                                <div className={`${burgerStyles.ingredientFirstBlock}`}>
                                    <img className="pl-1 pr-1" src={ingredient.image_mobile} alt={ingredient.name} />
                                    <p className={`ml-5 mr-5`}>{ingredient.name}</p>
                                </div>
                                <div className={`${burgerStyles.ingredientSecondBlock} ml-5 mr-8`}>
                                    <p className={`${burgerStyles.price} mr-5`}>
                                        <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                                    </p>
                                    <LockIcon type="secondary" className="mr-6" />
                                </div>
                            </div>
                        </>
                    </section>))}
                    <section className={`${burgerStyles.scroll} custom-scroll`}>
                        {data.filter(element => element._id !== "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mt-4`}>
                            <>
                                <DragIcon type="primary" />
                                <div className={`${burgerStyles.ingredient} ml-6 pt-4 pb-4 text text_type_main-small`}>
                                    <div className={`${burgerStyles.ingredientFirstBlock}`}>
                                        <img className="pl-1 pr-1" src={ingredient.image_mobile} alt={ingredient.name} />
                                        <p className={`ml-5 mr-5`}>{ingredient.name}</p>
                                    </div>
                                    <div className={`${burgerStyles.ingredientSecondBlock} ml-5 mr-8`}>
                                        <p className={`${burgerStyles.price} mr-5`}>
                                            <span className="mr-1">{ingredient.price}</span>
                                            <CurrencyIcon type="primary" />
                                        </p>
                                        <DeleteIcon type="primary" className="mr-6" />
                                    </div>
                                </div>
                            </>
                        </section>))}
                    </section>
                    {data.filter(element => element._id === "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mt-4`}>
                        <>

                            <div className={`${burgerStyles.ingredient} ${burgerStyles.ingredientBottom} ml-6 pt-4 pb-4 text text_type_main-small`}>
                                <div className={`${burgerStyles.ingredientFirstBlock}`}>
                                    <img className="pl-1 pr-1" src={ingredient.image_mobile} alt={ingredient.name} />
                                    <p className={`ml-5 mr-5`}>{ingredient.name}</p>
                                </div>
                                <div className={`${burgerStyles.ingredientSecondBlock} ml-5 mr-8`}>
                                    <p className={`${burgerStyles.price} mr-5`}>
                                        <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                                    </p>
                                    <LockIcon type="secondary" className="mr-6" />
                                </div>
                            </div>
                        </>
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