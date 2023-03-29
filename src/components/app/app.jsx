import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ingredientList } from '../../utils/data';

function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredientList={ingredientList} />
        <BurgerConstructor ingredientList={ingredientList} />
      </main>
    </div>
  );
}

export default App;
