import { FC, HTMLAttributes } from 'react';
import AppHeader from '../header/header';
import styles from './app.module.css';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage, HomePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientsPage, NotFoundPage, ProfileOrdersPage } from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { ProtectedRouteElement } from '../protected-route';

const App: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let { state } = location;

  return (
    <div className={`${styles.app} pt-10 pr-10 pl-10`}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>

        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} isPublic={true} />} />
        <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} isPublic={true} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} isPublic={true} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} isPublic={true} />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientsPage />}>
          <Route path="" element={<IngredientDetails />} />
        </Route>

        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} isPublic={false} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfileOrdersPage />} isPublic={false} />} />

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
