import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import loginStyles from './login.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  const onChangeEmail = e => {
    setEmail(e.target.value);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  const onIconClick = () => {
    setShowPassword(!showPassword);
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
      />
      <Button htmlType="button" type="primary" size="large" extraClass="mb-20">
        Войти
      </Button>
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