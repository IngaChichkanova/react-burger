import { FC, HTMLAttributes, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import profileStyles from './profile.module.css';
import ProfileSidebar from '../components/profile-sidebar/profile-sidebar';
import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { editUser, getUser } from '../services/actions/user';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { validateEmail } from '../utils/validation';
import { useSelector, RootState, useDispatch } from '../utils/types';

export const ProfilePage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const getUserStart = useSelector((state: RootState) => state.user.getUserStart);
  const getUserError = useSelector((state: RootState) => state.user.getUserError);

  const [name, setName] = useState<string>(user ? user.name : '');
  const [login, setLogin] = useState<string>(user ? user.email : '');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    getUser(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLogin(user.email);
    }
  }, [user])

  const onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  }

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>): void => {
    setLogin(e.target.value);
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  const onCancel = (): void => {
    setName(user ? user.name : '');
    setLogin(user ? user.email : '');
    setPassword('');
  }

  const onSave = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await editUser(login, password, name, dispatch);
    setPassword('');
  }

  const isChanges = (): boolean => (!getUserStart && (name !== (user ? user.name : '') || (login !== (user ? user.email : '') && validateEmail(login)) || password.length > 0));

  if (getUserStart || getUserError) return null

  return (
    <main className={`${profileStyles.wrapper}`}>
      <ProfileSidebar />

      <section className={`${profileStyles.section}  mt-30`}>
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