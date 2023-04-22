import React, { useEffect, useState, useCallback } from 'react';
import profileStyles from './profile-info.module.css';
import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileInfo = () => {
  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChangeLogin = e => {
    setLogin(e.target.value);
  }

  const onChangeEmail = e => {
    setEmail(e.target.value);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  return (
    <div className={`${profileStyles.wrapper}`}>
      <Input
        onChange={onChangeLogin}
        value={login}
        name={'login'}
        placeholder="Логин"
        extraClass="mb-6"
        type={'text'}
        icon={'EditIcon'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
      <EmailInput
        onChange={onChangeEmail}
        value={email}
        name={'email'}
        isIcon={true}
        placeholder="E-mail"
        extraClass="mt-6 mb-6"
      />
      <Input
        onChange={onChangePassword}
        value={password}
        name={'password'}
        placeholder="Пароль"
        extraClass="mb-6"
        type={'password'}
        icon={'EditIcon'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
    </div>
  );
};

export default ProfileInfo;