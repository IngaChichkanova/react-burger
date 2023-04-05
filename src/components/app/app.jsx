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
    await getIngedients()
      .then(response => {
        setIsLoading(false);
        setHasError(false);
        setIngredientList(response.data);
      })
      .catch((e) => {
        console.error(e);
        setHasError(true);
        setIsLoading(false);
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
