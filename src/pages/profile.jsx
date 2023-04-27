import { useState, useEffect } from 'react';
import profileStyles from './profile.module.css';
import ProfileSidebar from '../components/profile-sidebar/profile-sidebar';
import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../services/actions/login';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { validateEmail } from '../utils/validation';
import { useAuth } from '../services/auth';

export const ProfilePage = () => {
  const { getUser, getUserStart, getUserError } = useAuth();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.login);
  const [name, setName] = useState(user.name || '');
  const [login, setLogin] = useState(user.email || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setName(user.name);
    setLogin(user.email);
  }, [user])

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

  const onSave = async (e) => {
    e.preventDefault();
    await editUser(login, password, name, dispatch);
    setPassword('');
  }

  const isChanges = () => (!getUserStart && (name !== user.name || (login !== user.email && validateEmail(login)) || password.length > 0));

  if (getUserStart || getUserError) return null

  return (
    <main className={`${profileStyles.wrapper} mt-30`}>
      <ProfileSidebar />

      <section className={`${profileStyles.section}`}>
        <form onSubmit={onSave}>
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
            disabled={getUserStart}
          />
          <EmailInput
            onChange={onChangeLogin}
            value={login}
            name={'login'}
            isIcon={true}
            placeholder="Логин"
            extraClass="mt-6 mb-6"
            disabled={getUserStart}
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
            disabled={getUserStart}
          />

          {isChanges() && <div className={`${profileStyles.buttons}`}>
            <Button onClick={onCancel} htmlType="button" type="secondary" size="medium">
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>}
        </form>

      </section>
    </main>
  );
};