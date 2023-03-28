import React from 'react';
import burgerStyles from './burger-constructor.module.css';
import { DragIcon, CurrencyIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';

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
                <section className={`${burgerStyles.sectionIngredient} `}>
                    {data.map((ingredient, key) => (<div key={key} className={`${burgerStyles.ingredient} `}>
                        <DragIcon type="primary" />
                        <img className="pl-1 pr-1" src={ingredient.image_mobile} alt={ingredient.name} />
                        <p className={``}>{ingredient.name}</p>
                        <p className={``}>
                            <span className="mr-1">{ingredient.price}</span><CurrencyIcon type="primary" />
                        </p>
                        <DeleteIcon type="primary" />
                    </div>))}
                </section>

                <section className={`${burgerStyles.sectionFooter} `}>

                </section>
            </section>
        );
    }
}

export default BurgerConstructor;