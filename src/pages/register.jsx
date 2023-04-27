import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerStyles from './register.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAuth } from '../services/auth';
import { useSelector } from 'react-redux';
import { validateEmail } from '../utils/validation';

export const RegisterPage = () => {
  const { register } = useAuth();
  let navigate = useNavigate();
  const { rgisterFailed, rgisterRequest } = useSelector(state => state.login);

  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);
  const [errorSignIn, setErrorSignIn] = useState('');

  const onChangeLogin = e => {
    setLogin(e.target.value);
  }

  const onChangeEmail = e => {
    setEmail(e.target.value);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  const onIconClick = () => {
    setShowPassword(!showPassword);
  }

  const registerButton = () => {
    register(email, password, login).then((res) => {
      console.log(res)
      if (res.success) {
        navigate('/', { replace: true });
      } else if (!res.success && res.message) {
        setErrorSignIn(`: ${res.message}`);
      }
    })
  }

  return (
    <main className={`${registerStyles.wrapper}`}>
      <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
      <Input
        onChange={onChangeLogin}
        value={login}
        name={'login'}
        placeholder="Имя"
        extraClass="mb-6"
        type={'text'}
        size={'default'}
        disabled={rgisterRequest}
      />
      <EmailInput
        onChange={onChangeEmail}
        value={email}
        name={'email'}
        placeholder="E-mail"
        extraClass=" mb-6"
        disabled={rgisterRequest}
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
        disabled={rgisterRequest}
      />
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mb-20"
        disabled={rgisterRequest || (!validateEmail(email) || login.length === 0 || email.length === 0 || password.length === 0)}
        onClick={registerButton}
      >
        Зарегистрироваться
      </Button>

      {rgisterRequest && <div className={`text text_type_main-medium text_color_inactive mb-4`}>Выполняется регистрация</div>}

      {rgisterFailed && <div className={`text text_type_main-medium mb-4`}>Ошибка {errorSignIn}</div>}

      <div className={`text text_type_main-default text_color_inactive mb-4`}>
        Уже зарегистрированы?
        <Link className={`${registerStyles.link} ml-2`} to='/login'>
          Войти
        </Link>
      </div>
    </main>
  );
};