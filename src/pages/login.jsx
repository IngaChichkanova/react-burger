import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginStyles from './login.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { validateEmail } from '../utils/validation';
import { useSelector } from 'react-redux';
import { useAuth } from '../services/auth';

export const LoginPage = () => {
  const { signIn } = useAuth();
  const { signInFailed, signInRequest } = useSelector(state => state.login);
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [errorSignIn, setErrorSignIn] = useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  const onIconClick = () => {
    setShowPassword(!showPassword);
  }

  const submitButton = () => {
    signIn(email, password).then((res) => {
      if (res.success) {
        navigate('/', { replace: true });
      } else if (!res.success && res.message) {
        setErrorSignIn(`: ${res.message}`);
      }
    })
  }

  return (
    <main className={`${loginStyles.wrapper}`}>
      <h1 className='text text_type_main-medium mb-6'>Вход</h1>
      <EmailInput
        onChange={onChangeEmail}
        value={email}
        name={'email'}
        placeholder="E-mail"
        extraClass="mt-6 mb-6"
        disabled={signInRequest}
      />
      <Input
        onChange={onChangePassword}
        value={password}
        name={'password'}
        placeholder="Пароль"
        extraClass="mb-6"
        type={showPassword ? 'text' : 'password'}
        icon={showPassword ? 'ShowIcon' : 'HideIcon'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        disabled={signInRequest}
      />
      <Button
        onClick={submitButton}
        disabled={signInRequest || (!validateEmail(email) || email.length === 0 || password.length === 0)}
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mb-20"
      >
        Войти
      </Button>

      {signInRequest && <div className={`text text_type_main-medium text_color_inactive mb-4`}>Выполняется вход</div>}

      {signInFailed && <div className={`text text_type_main-medium mb-4`}>Ошибка {errorSignIn}</div>}

      <div className={`text text_type_main-default text_color_inactive mb-4`}>
        Вы — новый пользователь?
        <Link className={`${loginStyles.link} ml-2`} to='/register'>
          Зарегистрироваться
        </Link>
      </div>
      <div className={`text text_type_main-default text_color_inactive`}>
        Забыли пароль?
        <Link className={`${loginStyles.link} ml-2`} to='/forgot-password'>
          Восстановить пароль
        </Link>
      </div>
    </main>
  );
};