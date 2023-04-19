import React from 'react';
import headerStyles from '././header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
    const [activeHeaderItem, setActiveHeaderItem] = React.useState("constructor");

    const handlerMenu = (e, value) => {
        e.preventDefault();
        setActiveHeaderItem(value)
    }

    return (
        <header className={`${headerStyles.header} pb-4 pt-4 mt-10`}>
            <div className={`${headerStyles.headerBlock}`}>
                <a href="/" className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4 mr-2`} onClick={(e) => handlerMenu(e, "constructor")}>
                    <BurgerIcon type={activeHeaderItem === "constructor" ? "primary" : "secondary"} />
                    <p className={`pl-2 text text_type_main-small ${activeHeaderItem !== "constructor" && "text_color_inactive"}`}>
                        Конструктор
                    </p>
                </a>
                <a href="/" className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`} onClick={(e) => handlerMenu(e, "orders")}>
                    <ListIcon type={activeHeaderItem === "orders" ? "primary" : "secondary"} />
                    <p className={`pl-2 text text_type_main-small ${activeHeaderItem !== "orders" && "text_color_inactive"}`}>
                        Лента заказов
                    </p>
                </a>
            
            </div>
            <div className={`${headerStyles.headerBlock}`}>
            <a className="" onClick={(e) => e.preventDefault()} href="/">
                    <Logo />
                </a>
            </div>
            <div className={`${headerStyles.headerBlock}`}>
                <a href="/" className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`} onClick={(e) => handlerMenu(e, "profile")}>
                    <ProfileIcon type={activeHeaderItem === "profile" ? "primary" : "secondary"} />
                    <p className={`pl-2 text text_type_main-small ${activeHeaderItem !== "profile" && "text_color_inactive"}`}>
                        Личный кабинет
                    </p>
                </a>
            </div>
        </header>
    );
}

export default AppHeader;
