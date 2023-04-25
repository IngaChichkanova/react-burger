import React, { useEffect } from 'react';
import profileStyles from './profile-info.module.css';
import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../services/actions/login';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { validateEmail } from '../../utils/validation';
import { useAuth } from '../../services/auth';

const ProfileInfo = () => {
  const { getUser } = useAuth();
  const dispatch = useDispatch();
  const { user, getUserSuccess } = useSelector(state => state.login);
  const [name, setName] = React.useState(user.name || '');
  const [login, setLogin] = React.useState(user.email || '');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    if (getUserSuccess) {
      setName(user.name);
      setLogin(user.email);
    }
  }, [getUserSuccess, user])

  const onChangeName = e => {
    setName(e.target.value);
  }

  const onChangeLogin = e => {
    setLogin(e.target.value);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  const onCancel = () => {
    setName(user.name);
    setLogin(user.email);
    setPassword('');
  }

  const onSave = () => {
    dispatch(editUser(login, password, name));
  }

  const isChanges = () => (getUserSuccess && (name !== user.name || (login !== user.email && validateEmail(login)) || password.length > 0));

  return (
    <section className={`${profileStyles.wrapper}`}>
      <Input
        onChange={onChangeName}
        value={name}
        name={'name'}
        placeholder="Имя"
        extraClass="mb-6"
        type={'text'}
        icon={'EditIcon'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        disabled={!getUserSuccess}
      />
      <EmailInput
        onChange={onChangeLogin}
        value={login}
        name={'login'}
        isIcon={true}
        placeholder="Логин"
        extraClass="mt-6 mb-6"
        disabled={!getUserSuccess}
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
        disabled={!getUserSuccess}
      />

      {isChanges() && <div className={`${profileStyles.buttons}`}>
        <Button onClick={onCancel} htmlType="button" type="secondary" size="medium">
          Отмена
        </Button>
        <Button onClick={onSave} htmlType="button" type="primary" size="medium">
          Сохранить
        </Button>
      </div>}

    </section>
  );
};

export default ProfileInfo;