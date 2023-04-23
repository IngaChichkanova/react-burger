import React, { useEffect } from 'react';
import ingredientsStyles from './ingredients.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentIngredient } from '../services/actions/ingredients';
import { getIngedients } from '../services/actions/ingredients';

export const IngredientsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentIngredient, ingredientsList, ingredientsListFailed, ingredientsListRequest } = useSelector(state => state.ingredients);

  useEffect(() => {
    if (!currentIngredient.name && ingredientsList.length === 0) {
      dispatch(getIngedients());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!ingredientsListRequest && !ingredientsListFailed && ingredientsList.length > 0) {
      let currentId = location.pathname.split('/ingredients/')[1];
      let current = ingredientsList.filter(item => item._id === currentId);
      if (current.length > 0) {
        dispatch(updateCurrentIngredient(current[0]))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsListRequest, ingredientsListFailed, ingredientsList])

  return (
    <main className={`${ingredientsStyles.wrapper}`}>
      <Outlet />
    </main>
  );
};