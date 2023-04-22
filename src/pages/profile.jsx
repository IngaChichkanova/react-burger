import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate, NavLink } from 'react-router-dom';
import profileStyles from './profile.module.css';
import ProfileInfo from '../components/profile-info/profile-info';

export const ProfilePage = () => {

  return (
    <main className={`${profileStyles.wrapper} mt-30`}>
      <section className={`${profileStyles.navLinks} mr-15`}>
        <ul>
          <li className='pt-3 pb-3'>
            <NavLink
              to={{ pathname: `/profile` }}
              className={`${profileStyles.navLink} text text_type_main-default text_color_inactive`}
              activeClassName={profileStyles.activeNavLink}
            >
              Профиль
            </NavLink>
          </li>
          <li className='pt-3 pb-3'>
            <NavLink
              to={{ pathname: `/profile/orders` }}
              className={`${profileStyles.navLink} text text_type_main-default text_color_inactive`}
              activeClassName={profileStyles.activeNavLink}
            >
              История заказов
            </NavLink>
          </li>
          <li className='pt-3 pb-3'>
            <NavLink
              to={{ pathname: `/profile/orders` }}
              className={`${profileStyles.navLink} text text_type_main-default text_color_inactive`}
              activeClassName={profileStyles.activeNavLink}
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </section>
      <ProfileInfo />
      <section>

      </section>
    </main>
  );
};