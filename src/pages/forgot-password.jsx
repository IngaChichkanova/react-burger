import React from 'react';
import { Link } from 'react-router-dom';
import forgotPasswordStyles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { passwordReset } from '../services/actions/login';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../utils/validation';

export const ForgotPasswordPage = () => {
  const { passwordResetFailed } = useSelector(state => state.login);
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');

  const onChangeEmail = e => {
    let email = e.target.value;
    setEmail(email);
  }

  const submitButton = () => {
    dispatch(passwordReset(email));
  }

  return (
    <main className={`${forgotPasswordStyles.wrapper}`}>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <EmailInput
        onChange={onChangeEmail}
        value={email}
        name={'email'}
        placeholder="Укажите e-mail"
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass="mb-20"
        onClick={submitButton}
        disabled={!validateEmail(email)}
      >
        Восстановить
      </Button>

      {passwordResetFailed && <div className={`text text_type_main-medium mb-4`}>Ошибка</div>}

      <div className={`text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?
        <Link className={`${forgotPasswordStyles.link} ml-2`} to='/login'>
          Войти
        </Link>
      </div>
    </main>
  );
};