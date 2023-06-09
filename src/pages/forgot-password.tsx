import React, { FC, HTMLAttributes, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import forgotPasswordStyles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { validateEmail } from '../utils/validation';
import { forgotPassword } from '../services/actions/user';
import { useSelector, RootState, useDispatch } from '../utils/types';

export const ForgotPasswordPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
  const dispatch = useDispatch();
  const forgotPasswordStart = useSelector((state: RootState) => state.user.forgotPasswordStart);
  const forgotPasswordError = useSelector((state: RootState) => state.user.forgotPasswordError);
  let navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>('');

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    let email = e.target.value;
    setEmail(email);
  }

  const submitButton = (e: FormEvent): void => {
    e.preventDefault();
    forgotPassword(email, dispatch).then((success) => {
      if (success) {
        navigate(
          '/reset-password',
          {
            replace: true,
            state: {
              from: location.pathname
            }
          }
        );
      }
    })

  }

  return (
    <main className={`${forgotPasswordStyles.wrapper}`}>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <form className={`${forgotPasswordStyles.form}`} onSubmit={submitButton}>
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          placeholder="Укажите e-mail"
          extraClass="mb-6"
          disabled={forgotPasswordStart}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20"
          disabled={forgotPasswordStart || !validateEmail(email)}
        >
          Восстановить
        </Button>
      </form>

      {forgotPasswordStart && <div className={`text text_type_main-medium mb-4`}>Подождите</div>}
      {forgotPasswordError && <div className={`text text_type_main-medium mb-4`}>Ошибка</div>}

      <div className={`text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?
        <Link className={`${forgotPasswordStyles.link} ml-2`} to='/login'>
          Войти
        </Link>
      </div>
    </main>
  );
};