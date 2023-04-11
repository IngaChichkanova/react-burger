import React, { useEffect, useState, useReducer } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngedients } from '../../utils/burger-api';

const initialState = { ingredientList: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ingredientList":
      return { ingredientList: action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getIngedientsAsync();
  }, []);

  const getIngedientsAsync = async () => {
    await getIngedients()
      .then(response => {
        setHasError(false);
        dispatch({ type: "ingredientList", payload: response.data });
        setIsLoading(false);
      })
      .catch((e) => {
        setHasError(true);
        setIsLoading(false);
      });
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {!isLoading && !hasError && <main className={appStyles.main}>
        <BurgerIngredients ingredientList={state.ingredientList} />
        <BurgerConstructor ingredientList={state.ingredientList} />
      </main>}
    </div>
  );
}

export default App;
