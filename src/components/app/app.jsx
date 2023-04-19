import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {

  return (
    <div className={`${appStyles.app}`}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={`${appStyles.main}`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
