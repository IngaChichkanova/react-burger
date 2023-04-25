import React from 'react';
import AppHeader from '../header/header';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, HomePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientsPage, NotFoundPage } from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ProtectedRouteElement, PublicRouteElement } from '../protected-route';

const App = () => {

  return (
    <div className={`${styles.app}`}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/login" element={<PublicRouteElement element={<LoginPage />} />} />
          <Route path="/register" element={<PublicRouteElement element={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<PublicRouteElement element={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<PublicRouteElement element={<ResetPasswordPage />} />} />

          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />

          <Route path="/" element={<HomePage />} />

          {<Route path="/ingredients" element={<IngredientsPage />}>
            {/* добавим роут для просмотра чата */}
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
          </Route>}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
