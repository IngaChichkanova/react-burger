import { FC, HTMLAttributes, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import loginStyles from './login.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { validateEmail } from '../utils/validation';
import { signIn } from '../services/actions/user';
import { useSelector, RootState, useDispatch } from '../utils/types';

export const LoginPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
  const dispatch = useDispatch();
  const loginStart = useSelector((state: RootState) => state.user.loginStart);
  const loginError = useSelector((state: RootState) => state.user.loginError);
  const loginErrorText = useSelector((state: RootState) => state.user.loginErrorText);
  let navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const location = useLocation();
  let { state } = location;

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  const onIconClick = (): void => {
    setShowPassword(!showPassword);
  }

  const submitButton = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await signIn(email, password, dispatch).then((success) => {
      if (success) {
        navigate(state?.from ? state.from : '/', { replace: true });
      }
    })
  }

  return (
    <main className={`${loginStyles.wrapper}`}>
      <h1 className='text text_type_main-medium mb-6'>Вход</h1>
      <form className={`${loginStyles.form}`} onSubmit={submitButton}>
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          placeholder="E-mail"
          extraClass="mt-6 mb-6"
          disabled={loginStart}
          data-testid="login"
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
          disabled={loginStart}
          data-testid="password"
        />
        <Button
          disabled={loginStart || (!validateEmail(email) || email.length === 0 || password.length === 0)}
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20"
          data-testid="submit"
        >
          Войти
        </Button>
      </form>

      {loginStart && <div className={`text text_type_main-medium text_color_inactive mb-4`}>Выполняется вход</div>}

      {loginError && <div className={`text text_type_main-medium mb-4`}>Ошибка {loginErrorText}</div>}

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