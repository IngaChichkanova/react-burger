import { FC, HTMLAttributes } from 'react';
import headerStyles from '././header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const AppHeader: FC<HTMLAttributes<HTMLHtmlElement>> = () => {

    return (
        <header className={`${headerStyles.header} pb-4 pt-4`}>
            <div className={`${headerStyles.headerBlock}`}>

                <NavLink to="/" className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`}>
                    {({ isActive }) => (
                        <>
                            <BurgerIcon type={isActive ? "primary" : "secondary"} />
                            <p className={`pl-2 text text_type_main-small ${!isActive && "text_color_inactive"}`}>
                                Конструктор
                            </p>
                        </>
                    )}
                </NavLink>
                <NavLink to="/feed" className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`}>
                    {({ isActive }) => (
                        <>
                            <ListIcon type={isActive ? "primary" : "secondary"} />
                            <p className={`pl-2 text text_type_main-small ${!isActive && "text_color_inactive"}`}>
                                Лента заказов
                            </p>
                        </>
                    )}
                </NavLink>

            </div>
            <div className={`${headerStyles.headerBlock}`}>
                <NavLink to="/" className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`}>
                    <Logo />
                </NavLink>
            </div>
            <div className={`${headerStyles.headerBlock}`}>
                <NavLink to="/profile" className={`${headerStyles.header_item_wrapper_item} pl-5 pr-5 pb-4 pt-4`}>
                    {({ isActive }) => (
                        <>
                            <ProfileIcon type={isActive ? "primary" : "secondary"} />
                            <p className={`pl-2 text text_type_main-small ${!isActive && "text_color_inactive"}`}>
                                Личный кабинет
                            </p>
                        </>
                    )}
                </NavLink>
            </div>
        </header>
    );
}

export default AppHeader;
