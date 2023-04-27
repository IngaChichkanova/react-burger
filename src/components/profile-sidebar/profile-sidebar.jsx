
import { useState } from 'react';
import profileSidebarStyles from './profile-sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../services/auth';
import { useNavigate } from "react-router-dom";

const ProfileSidebar = () => {
    const { signOut, logoutStart, logoutError } = useAuth();
    let navigate = useNavigate();
    const [text, setText] = useState(<>В этом разделе вы можете изменить <br /> свои персональные данные</>);

    const logOut = async (e) => {
        e.preventDefault();
        await signOut().then((success) => {
            if (success) {
                navigate('/login', { replace: true });
            }
        })
    }

    return (
        <section className={`${profileSidebarStyles.navLinks} mr-15`}>
            <ul>
                <li className='pt-3 pb-3'>
                    <NavLink
                        to={{ pathname: `/profile` }}
                        end
                        className={({ isActive }) => `${profileSidebarStyles.navLink} text text_type_main-default ${isActive ? profileSidebarStyles.navLinkActive : 'text_color_inactive'}`}
                        onClick={() => setText(<>В этом разделе вы можете изменить <br /> свои персональные данные</>)}
                    >
                        Профиль
                    </NavLink>
                </li>
                <li className='pt-3 pb-3'>
                    <NavLink
                        to={{ pathname: `/profile/orders` }}
                        end
                        className={({ isActive }) => `${profileSidebarStyles.navLink} text text_type_main-default ${isActive ? profileSidebarStyles.navLinkActive : 'text_color_inactive'}`}
                        onClick={() => setText(<></>)}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li className='pt-3 pb-3'>
                    <a href={"/"}
                        className={`${profileSidebarStyles.navLink} text text_type_main-default text_color_inactive`}
                        onClick={logOut}
                    >
                        Выход
                    </a>
                </li>
            </ul>

            {logoutStart && <div className={`text text_type_main-medium mb-4`}>Выход...</div>}
            {logoutError && <div className={`text text_type_main-medium mb-4`}>Ошибка</div>}

            <div className={`${profileSidebarStyles.text} text text_type_main-default text_color_inactive mt-20`}>
                {text}
            </div>
        </section>
    );
};

export default ProfileSidebar;