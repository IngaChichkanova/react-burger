import React, { FC, HTMLAttributes } from 'react';
import ingredientsStyles from './ingredients.module.css';
import { Outlet } from 'react-router-dom';

export const IngredientsPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {

  return (
    <main className={`${ingredientsStyles.wrapper}`}>
      <Outlet />
    </main>
  );
};