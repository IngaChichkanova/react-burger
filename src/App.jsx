import React from 'react';
import AppHeader from './components/header/header';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, HomePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientsPage } from './pages';

const App = () => {

  return (
    <div className={`${styles.app}`}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ingredients/:id " element={<IngredientsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
