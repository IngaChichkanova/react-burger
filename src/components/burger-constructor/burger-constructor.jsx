import React from 'react';
import burgerStyles from './burger-constructor.module.css';

class BurgerConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <section className={burgerStyles.section}>

            </section>
        );
    }
}

export default BurgerConstructor;