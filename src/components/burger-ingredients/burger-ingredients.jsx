import React from 'react';
//import PropTypes from 'prop-types';
import ingredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: "bun"
        }

        this.bunRef = React.createRef();
        this.sauceRef = React.createRef();
        this.mainRef = React.createRef();
    }

    setCurrent = (value) => {
        this.setState({ currentTab: value });
        this[`${value}Ref`].current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    render() {
        const { currentTab } = this.state;
        const { data } = this.props;

        return (
            <section className={` mr-5`}>
                <section className={`mt-10`}>
                    <h1 className="text text_type_main-large">Соберите бургер</h1>
                    <div className={`${ingredientsStyles.tabs} mt-5`}>
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

                <section className={`${ingredientsStyles.scroll} custom-scroll`}>
                    <section ref={this.bunRef} className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                        <p className="text text_type_main-medium mt-10 mb-6">Булки</p>
                        {data.filter(ingredient => ingredient.type === "bun").map((ingredient, key) => (<div className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`} key={key}>
                            <Counter count={1} size="default" extraClass="m-1" />
                            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                            <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                                <span className="mr-1">{ingredient.price}</span>
                                <CurrencyIcon type="primary" />
                            </p>
                            <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                        </div>))}
                    </section>

                    <section ref={this.sauceRef} className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                        <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                        {data.filter(ingredient => ingredient.type === "sauce").map((ingredient, key) => (<div className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`} key={key}>
                            <Counter count={1} size="default" extraClass="m-1" />
                            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                            <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                                <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                            </p>
                            <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                        </div>))}
                    </section>

                    <section ref={this.mainRef} className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                        <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                        {data.filter(ingredient => ingredient.type === "main").map((ingredient, key) => (<div className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`} key={key}>
                            <Counter count={1} size="default" extraClass="m-1" />
                            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                            <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                                <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                            </p>
                            <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                        </div>))}
                    </section>
                </section>
            </section>
        );
    }
}

export default BurgerIngredients;


/*BurgerIngredients.propTypes = {
    orderId: PropTypes.number
};*/