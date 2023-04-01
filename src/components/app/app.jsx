import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { INGREDIENTS_LIST } from '../../utils/constants';

const App = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getIngedients();
  }, []);

  const getIngedients = async () => {
    await fetch(INGREDIENTS_LIST)
      .then(response => response.json()
        .then(json => {
          setIsLoading(false);
          if (json.success) {
            setHasError(false);
            setIngredientList(json.data);
          } else {
            setHasError(true);
          }
        })
      )
      .catch(e => {
        setHasError(true);
        setIsLoading(false);
      })
      ;
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
