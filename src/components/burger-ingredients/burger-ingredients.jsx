import React from 'react';
//import PropTypes from 'prop-types';
import ingredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: "bun"
        }
    }

    setCurrent = (value) => {
        this.setState({ currentTab: value });
    }

    render() {
        const { currentTab } = this.state;
        const { data } = this.props;

        return (
            <section className={`mt-10 `}>
                <section>
                    <h1 className="text text_type_main-large">Соберите бургер</h1>
                    <div className={`${ingredientsStyles.tabs} mt-5s`}>
                        <Tab value="bun" active={currentTab === 'bun'} onClick={this.setCurrent}>
                            Булки
                        </Tab>
                        <Tab value="sauce" active={currentTab === 'sauce'} onClick={this.setCurrent}>
                            Соусы
                        </Tab>
                        <Tab value="main" active={currentTab === 'main'} onClick={this.setCurrent}>
                            Начинки
                        </Tab>
                    </div>
                </section>

                <div className={ingredientsStyles.scroll}>
                    {currentTab === "bun" && (<section className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                        <p className="text text_type_main-medium mt-10 mb-6">Булки</p>
                        {data.filter(ingredient => ingredient.type === currentTab).map((ingredient, key) => (<div className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`} key={key}>
                            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                            <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                                <span className="mr-1">{ingredient.price}</span>
                                <CurrencyIcon type="primary" />
                            </p>
                            <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                        </div>))}
                    </section>)}

                    {currentTab === "sauce" && (<section className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                        <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                        {data.filter(ingredient => ingredient.type === currentTab).map((ingredient, key) => (<div className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`} key={key}>
                            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                            <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                                <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                            </p>
                            <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                        </div>))}
                    </section>)}

                    {currentTab === "main" && (<section className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                        <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                        {data.filter(ingredient => ingredient.type === currentTab).map((ingredient, key) => (<div className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`} key={key}>
                            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                            <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                                <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                            </p>
                            <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                        </div>))}
                    </section>)}
                </div>
            </section>
        );
    }
}

export default BurgerIngredients;


/*BurgerIngredients.propTypes = {
    orderId: PropTypes.number
};*/