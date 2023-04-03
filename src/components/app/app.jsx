import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngedients } from '../../utils/burger-api';

const App = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getIngedientsAsync();
  }, []);

  const getIngedientsAsync = async () => {
    await getIngedients().then(response => {
      if (response.errors) {
        setHasError(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setHasError(false);
        setIngredientList(response.data);
      }
    });
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {!isLoading && !hasError && <main className={appStyles.main}>
        <BurgerIngredients ingredientList={ingredientList} />
        <BurgerConstructor ingredientList={ingredientList} />
      </main>}
    </div>
  );
}

export default App;
