import React from 'react';
import AppHeader from '../header/header';
import styles from './app.module.css';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage, HomePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientsPage, NotFoundPage } from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { ProtectedRouteElement, PublicRouteElement } from '../protected-route';
import ProfileInfo from '../../components/profile-info/profile-info'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let { state } = location;

  return (
    <div className={`${styles.app}`}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/login" element={<PublicRouteElement element={<LoginPage />} />} />
        <Route path="/register" element={<PublicRouteElement element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<PublicRouteElement element={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<PublicRouteElement element={<ResetPasswordPage />} />} />


        {/*<Route exact path="/profile" element={<ProtectedRouteElement element={
          <ProfilePage>
            <ProfileInfo />
          </ProfilePage>} />
        } />
      <Route exact path="/profile/orders" element={<ProtectedRouteElement element={<ProfilePage><NotFoundPage /></ProfilePage>} />} />*/}


        <Route path="" element={<ProfilePage />}>
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/profile/orders" element={<NotFoundPage />} />
        </Route>



        <Route path="/" element={<HomePage />} />

        <Route path="/ingredients/:id" element={<IngredientsPage />}>
          <Route path="" element={<IngredientDetails />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<Modal onClose={() => { navigate(`/`) }}>
            <IngredientDetails />
          </Modal>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
