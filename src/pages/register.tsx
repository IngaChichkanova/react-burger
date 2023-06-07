import { FC, HTMLAttributes, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerStyles from './register.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../services/actions/user';
import { validateEmail } from '../utils/validation';
import { useSelector, RootState, useDispatch } from '../utils/types';

export const RegisterPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
  const dispatch = useDispatch();
  const registerStart = useSelector((state: RootState) => state.user.registerStart);
  const registerError = useSelector((state: RootState) => state.user.registerError);
  const registerErrorText = useSelector((state: RootState) => state.user.registerErrorText);
  let navigate = useNavigate();

  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>): void => {
    setLogin(e.target.value);
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  const onIconClick = (): void => {
    setShowPassword(!showPassword);
  }

  const registerButton = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await register(email, password, login, dispatch).then((success) => {
      if (success) {
        navigate('/', { replace: true });
      }
    })
  }

  return (
    <main className={`${registerStyles.wrapper}`}>
      <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
      <form className={`${registerStyles.form}`} onSubmit={registerButton}>
        <Input
          onChange={onChangeLogin}
          value={login}
          name={'login'}
          placeholder="Имя"
          extraClass="mb-6"
          type={'text'}
          size={'default'}
          disabled={registerStart}
        />
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          placeholder="E-mail"
          extraClass=" mb-6"
          disabled={registerStart}
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
          disabled={registerStart}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20"
          disabled={registerStart || (!validateEmail(email) || login.length === 0 || email.length === 0 || password.length === 0)}
        >
          Зарегистрироваться
        </Button>
      </form>

      {registerStart && <div className={`text text_type_main-medium text_color_inactive mb-4`}>Выполняется регистрация</div>}

      {registerError && <div className={`text text_type_main-medium mb-4`}>Ошибка {registerErrorText}</div>}

      <div className={`text text_type_main-default text_color_inactive mb-4`}>
        Уже зарегистрированы?
        <Link className={`${registerStyles.link} ml-2`} to='/login'>
          Войти
        </Link>
      </div>
    </main>
  );
};