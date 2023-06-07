import React, { FC, HTMLAttributes } from 'react';
import profileOrdersStyles from './profile-orders.module.css';
import ProfileSidebar from '../components/profile-sidebar/profile-sidebar';
import Feed from '../components/feed/feed';

export const ProfileOrdersPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {

    return (
        <main className={`${profileOrdersStyles.wrapper}`}>
            <ProfileSidebar />

            <Feed />
        </main>
    );
};