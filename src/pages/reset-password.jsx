import React from 'react';
import { Link } from 'react-router-dom';
import resetPasswordStyles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../services/actions/login';

export const ResetPasswordPage = () => {
  const { resetFailed } = useSelector(state => state.login);
  const dispatch = useDispatch();

  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  const onChangeCode = e => {
    setCode(e.target.value);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);

  }

  const onIconClick = () => {
    setShowPassword(!showPassword);
  }

  const onSave = () => {
    dispatch(reset(password, code));
  }

  return (
    <main className={`${resetPasswordStyles.wrapper}`}>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <Input
        onChange={onChangePassword}
        value={password}
        name={'password'}
        placeholder="Введите новый пароль"
        extraClass="mb-6"
        type={showPassword ? 'text' : 'password'}
        icon={showPassword ? 'ShowIcon' : 'HideIcon'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        onChange={onChangeCode}
        value={code}
        name={'code'}
        placeholder="Введите код из письма"
        extraClass="mb-6"
      />
      <Button
        onClick={onSave}
        disabled={password.length === 0 || code.length === 0}
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mb-20"
      >
        Сохранить
      </Button>

      {resetFailed && <div className={`text text_type_main-medium mb-4`}>Ошибка</div>}

      <div className={`text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?
        <Link className={`${resetPasswordStyles.link} ml-2`} to='/login'>
          Войти
        </Link>
      </div>
    </main>
  );
};