import React from 'react';
import ingredientsStyles from './ingredients.module.css';
import { Outlet } from 'react-router-dom';

export const IngredientsPage = () => {

  return (
    <main className={`${ingredientsStyles.wrapper}`}>
      <Outlet />
    </main>
  );
};