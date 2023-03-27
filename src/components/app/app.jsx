import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../ingredients/ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className={appStyles.app}>
        <AppHeader />
        <BurgerIngredients />
        <BurgerConstructor />
    </div>
  );
}

export default App;
