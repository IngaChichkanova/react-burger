import React from 'react';
import headerStyles from '././header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeHeaderItem: "constructor",
        }
    }

    render() {
        const { activeHeaderItem } = this.state;

        return (
            <header className={`${headerStyles.header} mb-4 mt-4`}>
                <section className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4 mr-2`}>
                    <BurgerIcon type={activeHeaderItem === "constructor" ? "primary" : "secondary"} />
                    <p className={`ml-2 text text_type_main-small ${activeHeaderItem !== "constructor" && "text_color_inactive"}`}>
                        Конструктор
                    </p>
                </section>
                <section className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`}>
                    <ListIcon type={activeHeaderItem === "orders" ? "primary" : "secondary"} />
                    <p className={`ml-2 text text_type_main-small ${activeHeaderItem !== "orders" && "text_color_inactive"}`}>
                        Лента заказов
                    </p>
                </section>
                <section className='mr-2 ml-2'>
                    <Logo />
                </section>
                <section className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`}>
                    <ProfileIcon type={activeHeaderItem === "profile" ? "primary" : "secondary"} />
                    <p className={`ml-2 text text_type_main-small ${activeHeaderItem !== "profile" && "text_color_inactive"}`}>
                        Личный кабинет
                    </p>
                </section>
            </header>
        );
    }
}

export default AppHeader;
