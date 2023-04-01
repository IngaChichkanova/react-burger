import React from 'react';
import { ingredientListPropTypes } from '../../utils/prop-types';
import ingredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({ ingredientList }) => {

    const [currentTab, setCurrentTab] = React.useState("bun");

    const bunRef = React.createRef();
    const sauceRef = React.createRef();
    const mainRef = React.createRef();

    const setCurrent = (value) => {
        setCurrentTab(value);
        value.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    const buns = React.useMemo(() => ingredientList.filter((item) => item.type === 'bun'), [ingredientList]);
    const sauces = React.useMemo(() => ingredientList.filter((item) => item.type === 'sauce'), [ingredientList]);
    const mains = React.useMemo(() => ingredientList.filter((item) => item.type === 'main'), [ingredientList]);

    return (
        <section className={` mr-5`}>
            <section className={`mt-10`}>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div className={`${ingredientsStyles.tabs} mt-5`}>
                    <Tab value={bunRef} active={currentTab === 'bunRef'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value={sauceRef} active={currentTab === 'sauceRef'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value={mainRef} active={currentTab === 'mainRef'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
            </section>

            <section className={`${ingredientsStyles.scroll} custom-scroll`}>
                <section ref={bunRef} className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                    <p className="text text_type_main-medium mt-10 mb-6">Булки</p>
                    {buns.map((ingredient, key) => (<div className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`} key={key}>
                        <Counter count={1} size="default" extraClass="m-1" />
                        <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                        <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                            <span className="mr-1">{ingredient.price}</span>
                            <CurrencyIcon type="primary" />
                        </p>
                        <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                    </div>))}
                </section>

                <section ref={sauceRef} className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                    <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                    {sauces.map((ingredient, key) => (<div className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`} key={key}>
                        <Counter count={1} size="default" extraClass="m-1" />
                        <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                        <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                            <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                        </p>
                        <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                    </div>))}
                </section>

                <section ref={mainRef} className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                    <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                    {mains.map((ingredient, key) => (<div className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`} key={key}>
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

export default BurgerIngredients;

ingredientListPropTypes(BurgerIngredients);