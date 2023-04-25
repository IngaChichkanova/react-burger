import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import profileStyles from './profile.module.css';
import ProfileInfo from '../components/profile-info/profile-info';
import { useAuth } from '../services/auth';
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { signOut } = useAuth();
  let navigate = useNavigate();
  const [text, setText] = useState(<>В этом разделе вы можете изменить <br /> свои персональные данные</>);

  const logOut = (e) => {
    e.preventDefault();
    signOut().then(() => {
      navigate('/', { replace: true });
    })
  }

  return (
    <main className={`${profileStyles.wrapper} mt-30`}>
      <section className={`${profileStyles.navLinks} mr-15`}>
        <ul>
          <li className='pt-3 pb-3'>
            <NavLink
              to={{ pathname: `/profile` }}
              className={({ isActive }) => `${profileStyles.navLink} text text_type_main-default ${isActive ? profileStyles.navLinkActive : 'text_color_inactive'}`}
              onClick={() => setText(<>В этом разделе вы можете изменить <br /> свои персональные данные</>)}
            >
              Профиль
            </NavLink>
          </li>
          <li className='pt-3 pb-3'>
            <NavLink
              to={{ pathname: `/profile/orders` }}
              className={({ isActive }) => `${profileStyles.navLink} text text_type_main-default ${isActive ? profileStyles.navLinkActive : 'text_color_inactive'}`}
              onClick={() => setText(<></>)}
            >
              История заказов
            </NavLink>
          </li>
          <li className='pt-3 pb-3'>
            <a href={"/"}
              className={`${profileStyles.navLink} text text_type_main-default text_color_inactive`}
              onClick={logOut}
            >
              Выход
            </a>
          </li>
        </ul>

        <div className={`${profileStyles.text} text text_type_main-default text_color_inactive mt-20`}>
          {text}
        </div>
      </section>

      <ProfileInfo />

      <section>

      </section>
    </main>
  );
};