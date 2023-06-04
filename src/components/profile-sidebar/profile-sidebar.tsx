
import { FC, HTMLAttributes, FormEvent } from 'react';
import profileSidebarStyles from './profile-sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { useNavigate, useMatch } from "react-router-dom";
import { signOut } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from '../../utils/types';

const ProfileSidebar:FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const dispatch = useDispatch();
    const logoutStart = useSelector((state: RootState) => state.user.logoutStart);
    const logoutError = useSelector((state: RootState) => state.user.logoutError);
    let navigate = useNavigate();

    const logOut = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        await signOut(dispatch).then((success) => {
            if (success) {
                navigate('/login', { replace: true });
            }
        })
    }

    return (
        <section className={`${profileSidebarStyles.navLinks} mr-15  mt-30`}>
            <ul>
                <li className='pt-3 pb-3'>
                    <NavLink
                        to={{ pathname: `/profile` }}
                        end
                        className={({ isActive }) => `${profileSidebarStyles.navLink} text text_type_main-default ${isActive ? profileSidebarStyles.navLinkActive : 'text_color_inactive'}`}
                    >
                        Профиль
                    </NavLink>
                </li>
                <li className='pt-3 pb-3'>
                    <NavLink
                        to={{ pathname: `/profile/orders` }}
                        end
                        className={({ isActive }) => `${profileSidebarStyles.navLink} text text_type_main-default ${isActive ? profileSidebarStyles.navLinkActive : 'text_color_inactive'}`}
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
                {useMatch('/profile') ? <>В этом разделе вы можете изменить <br /> свои персональные данные</> : <></>}
            </div>
        </section>
    );
};

export default ProfileSidebar;