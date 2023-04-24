import React from 'react';
import headerStyles from '././header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    const [activeHeaderItem, setActiveHeaderItem] = React.useState("constructor");

    const handlerMenu = (value) => {
        setActiveHeaderItem(value)
    }

    return (
        <header className={`${headerStyles.header} pb-4 pt-4 mt-10`}>
            <div className={`${headerStyles.headerBlock}`}>
                <NavLink
                    to="/"
                    className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4 mr-2`}
                    activeClassName={headerStyles.header_item_wrapper_item_active}
                >
                    <BurgerIcon type={activeHeaderItem === "constructor" ? "primary" : "secondary"} />
                    <p className={`pl-2 text text_type_main-small ${activeHeaderItem !== "constructor" && "text_color_inactive"}`}>
                        Конструктор
                    </p>
                </NavLink>
                <NavLink
                    to="/"
                    className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`}
                    activeClassName={headerStyles.header_item_wrapper_item_active}
                >
                    <ListIcon type={activeHeaderItem === "orders" ? "primary" : "secondary"} />
                    <p className={`pl-2 text text_type_main-small ${activeHeaderItem !== "orders" && "text_color_inactive"}`}>
                        Лента заказов
                    </p>
                </NavLink>

            </div>
            <div className={`${headerStyles.headerBlock}`}>
                <NavLink to="/">
                    <Logo />
                </NavLink>
            </div>
            <div className={`${headerStyles.headerBlock}`}>
                <NavLink
                    activeClassName={headerStyles.header_item_wrapper_item_active}
                    to="/profile"
                    className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`}
                    activeClassName={headerStyles.header_item_wrapper_item_active}
                >
                    <ProfileIcon type={activeHeaderItem === "profile" ? "primary" : "secondary"} />
                    <p className={`pl-2 text text_type_main-small ${activeHeaderItem !== "profile" && "text_color_inactive"}`}>
                        Личный кабинет
                    </p>
                </NavLink>
            </div>
        </header>
    );
}

export default AppHeader;
