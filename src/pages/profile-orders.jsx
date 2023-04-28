import React from 'react';
import profileOrdersStyles from './profile-orders.module.css';
import ProfileSidebar from '../components/profile-sidebar/profile-sidebar';

export const ProfileOrdersPage = () => {

    return (
        <main className={`${profileOrdersStyles.wrapper} mt-30`}>
            <ProfileSidebar />

            <section className={`${profileOrdersStyles.section}`}>

            </section>
        </main>
    );
};