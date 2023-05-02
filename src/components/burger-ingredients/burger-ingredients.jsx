import React, { useState, createRef, useMemo, useEffect } from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngedients } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import DraggableItem from './draggable-items';
import { Link, useLocation } from 'react-router-dom';


const BurgerIngredients = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const ingredientsList = useSelector(state => state.ingredients.ingredientsList);
    const currentIngredientsList = useSelector(state => state.burgerConstructor.currentIngredientsList);
    const ingredientsListFailed = useSelector(state => state.ingredients.ingredientsListFailed);
    const ingredientsListRequest = useSelector(state => state.ingredients.ingredientsListRequest);

    const [currentTab, setCurrentTab] = useState("bun");

    const bunRef = createRef();
    const sauceRef = createRef();
    const mainRef = createRef();

    useEffect(() => {
        dispatch(getIngedients());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setCurrent = (valueRef, value) => {
        if (!ingredientsListFailed) {
            setCurrentTab(value);
            valueRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    }

    const scrollObserve = () => {
        function obCallback(payload) {
            for (let i = 0; payload.length > i; i++) {
                if ((payload[i].target === bunRef.current) && (payload[i].isIntersecting && payload[i].intersectionRatio > 0.7)) {
                    setCurrentTab("bun");
                } else if ((payload[i].target === sauceRef.current) && (payload[i].isIntersecting && payload[i].intersectionRatio > 0.7)) {
                    setCurrentTab("sauce");
                } else if ((payload[i].target === mainRef.current) && (payload[i].isIntersecting && payload[i].intersectionRatio > 0.3)) {
                    setCurrentTab("main");
                }
            }
        }

        const ob = new IntersectionObserver(obCallback);

        ob.observe(bunRef.current);
        ob.observe(sauceRef.current);
        ob.observe(mainRef.current);
    }

    const buns = useMemo(() => ingredientsList.filter((item) => item.type === 'bun'), [ingredientsList]);
    const sauces = useMemo(() => ingredientsList.filter((item) => item.type === 'sauce'), [ingredientsList]);
    const mains = useMemo(() => ingredientsList.filter((item) => item.type === 'main'), [ingredientsList]);


    return (
        <>
            <section className={` mr-5`}>
                <section className={`mt-10`}>
                    <h1 className="text text_type_main-large">Соберите бургер</h1>
                    <div className={`${ingredientsStyles.tabs} mt-5`}>
                        <Tab value={bunRef} active={currentTab === 'bun'} onClick={() => setCurrent(bunRef, 'bun')}>
                            Булки
                        </Tab>
                        <Tab value={sauceRef} active={currentTab === 'sauce'} onClick={() => setCurrent(sauceRef, 'sauce')}>
                            Соусы
                        </Tab>
                        <Tab value={mainRef} active={currentTab === 'main'} onClick={() => setCurrent(mainRef, 'main')}>
                            Начинки
                        </Tab>
                    </div>
                </section>

                {ingredientsListRequest
                    ?
                    <p className="text text_type_main-medium mt-10 mb-6">Загрузка...</p>
                    :
                    ingredientsListFailed ?
                        <p className="text text_type_main-medium mt-10 mb-6">Ошибка</p>
                        :
                        <section
                            onScroll={scrollObserve}
                            className={`${ingredientsStyles.scroll} custom-scroll`}
                        >
                            <section ref={bunRef} className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                                <p className="text text_type_main-medium mt-10 mb-6">Булки</p>

                                {buns.map(ingredient => (
                                    <DraggableItem
                                        key={ingredient._id}
                                        item={ingredient}
                                        type={ingredient.type}
                                        className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`}
                                    >
                                        <Link
                                            className={`${ingredientsStyles.ingredientLink}`}
                                            to={`ingredients/${ingredient._id}`}
                                            state={{ backgroundLocation: location }}
                                        >
                                            <Counter count={currentIngredientsList.filter(item => item._id === ingredient._id).length} size="default" extraClass="m-1" />
                                            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                                            <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                                                <span className="mr-1">{ingredient.price}</span>
                                                <CurrencyIcon type="primary" />
                                            </p>
                                            <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                                        </Link>
                                    </DraggableItem>
                                ))}

                            </section>

                            <section ref={sauceRef} className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                                <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>

                                {sauces.map(ingredient => (
                                    <DraggableItem
                                        key={ingredient._id}
                                        item={ingredient}
                                        type={ingredient.type}
                                        className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`}
                                    >
                                        <Link
                                            className={`${ingredientsStyles.ingredientLink}`}
                                            to={`ingredients/${ingredient._id}`}
                                            state={{ backgroundLocation: location }}
                                        >
                                            <Counter count={currentIngredientsList.filter(item => item._id === ingredient._id).length} size="default" extraClass="m-1" />
                                            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                                            <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                                                <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                                            </p>
                                            <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                                        </Link>
                                    </DraggableItem>))}

                            </section>

                            <section ref={mainRef} className={`${ingredientsStyles.ingredientsSection} ml-1 mr-1`}>
                                <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>

                                {mains.map(ingredient => (
                                    <DraggableItem
                                        key={ingredient._id}
                                        item={ingredient}
                                        type={ingredient.type}
                                        className={`${ingredientsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`}
                                    >
                                        <Link
                                            className={`${ingredientsStyles.ingredientLink}`}
                                            to={`ingredients/${ingredient._id}`}
                                            state={{ backgroundLocation: location }}
                                        >
                                            <Counter count={currentIngredientsList.filter(item => item._id === ingredient._id).length} size="default" extraClass="m-1" />
                                            <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
                                            <p className={`${ingredientsStyles.ingredientDetail} mt-1 mb-1`}>
                                                <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                                            </p>
                                            <p className={`${ingredientsStyles.ingredientDetail}`}>{ingredient.name}</p>
                                        </Link>
                                    </DraggableItem>
                                ))}

                            </section>
                        </section>}
            </section>
        </>
    );
}

export default BurgerIngredients;