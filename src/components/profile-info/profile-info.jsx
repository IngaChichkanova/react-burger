import React, { useEffect } from 'react';
import profileStyles from './profile-info.module.css';
import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, editUser } from '../../services/actions/login';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { user, getUserSuccess } = useSelector(state => state.login);
  const [name, setName] = React.useState(user.name || '');
  const [login, setLogin] = React.useState(user.email || '');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
      dispatch(getUser());
  }, [])

  useEffect(() => {
    setName(user.name);
    setLogin(user.email);
  }, [user])

  const onChangeLogin = e => {
    setName(e.target.value);
  }

  const onChangeEmail = e => {
    setLogin(e.target.value);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  return (
    <div className={`${profileStyles.wrapper}`}>
      <Input
        onChange={onChangeLogin}
        value={name}
        name={'name'}
        placeholder="Имя"
        extraClass="mb-6"
        type={'text'}
        icon={'EditIcon'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
      <EmailInput
        onChange={onChangeEmail}
        value={login}
        name={'login'}
        isIcon={true}
        placeholder="Логин"
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