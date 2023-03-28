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
            <section className={`${burgerStyles.section} mt-25 mb-10 ml-5`}>
                <section className={`${burgerStyles.sectionIngredients} `}>
                    {data.filter(element => element._id === "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mb-4`}>
                        <>

                            <div className={`${burgerStyles.ingredient} ml-6 pt-4 pb-4 text text_type_main-small`}>
                                <img className="pl-1 pr-1" src={ingredient.image_mobile} alt={ingredient.name} />
                                <p className={`ml-5 mr-5`}>{ingredient.name}</p>
                                <p className={`${burgerStyles.price}`}>
                                    <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                                </p>
                                <LockIcon type="secondary" className="mr-6" />
                            </div>
                        </>
                    </section>))}
                    <section className={`${burgerStyles.scroll} custom-scroll`}>
                        {data.filter(element => element._id !== "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mb-4`}>
                            <>
                                <DragIcon type="primary" />
                                <div className={`${burgerStyles.ingredient} ml-6 pt-4 pb-4 text text_type_main-small`}>
                                    <img className="pl-1 pr-1" src={ingredient.image_mobile} alt={ingredient.name} />
                                    <p className={`ml-5 mr-5`}>{ingredient.name}</p>
                                    <p className={`${burgerStyles.price}`}>
                                        <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                                    </p>
                                    <DeleteIcon type="primary" className="mr-6" />
                                </div>
                            </>
                        </section>))}
                    </section>
                    {data.filter(element => element._id === "60666c42cc7b410027a1a9b1").map((ingredient, key) => (<section key={key} className={`${burgerStyles.sectionIngredient} mb-4`}>
                        <>

                            <div className={`${burgerStyles.ingredient} ml-6 pt-4 pb-4 text text_type_main-small`}>
                                <img className="pl-1 pr-1" src={ingredient.image_mobile} alt={ingredient.name} />
                                <p className={`ml-5 mr-5`}>{ingredient.name}</p>
                                <p className={`${burgerStyles.price}`}>
                                    <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                                </p>
                                <LockIcon type="secondary" className="mr-6" />
                            </div>
                        </>
                    </section>))}
                </section>

                <section className={`${burgerStyles.sectionFooter} mt-10`}>
                    <p className={`text text_type_main-large mr-10`}>610
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