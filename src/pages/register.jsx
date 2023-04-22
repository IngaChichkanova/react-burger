import React from 'react';
import { Link } from 'react-router-dom';
import registerStyles from './register.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../services/actions/login';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../utils/validation';

export const RegisterPage = () => {
  const { rgisterFailed } = useSelector(state => state.login);
  const dispatch = useDispatch();

  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

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
    dispatch(register(email, password, login));
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
      />
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
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mb-20"
        disabled={!validateEmail(email) || login.length === 0 || email.length === 0 || password.length === 0}
        onClick={registerButton}
      >
        Зарегистрироваться
      </Button>

      {rgisterFailed && <div className={`text text_type_main-medium mb-4`}>Ошибка</div>}

      <div className={`text text_type_main-default text_color_inactive mb-4`}>
        Уже зарегистрированы?
        <Link className={`${registerStyles.link} ml-2`} to='/login'>
          Войти
        </Link>
      </div>
    </main>
  );
};