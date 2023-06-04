import { FC, HTMLAttributes, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import resetPasswordStyles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../services/actions/user';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from '../utils/types';

export const ResetPasswordPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
  const dispatch = useDispatch();
  const resetPasswordStart = useSelector((state: RootState) => state.user.resetPasswordStart);
  const resetPasswordError = useSelector((state: RootState) => state.user.resetPasswordError);
  const location = useLocation();
  const navigate = useNavigate();

  let { state } = location;

  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setCode(e.target.value);
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);

  }

  const onIconClick = (): void => {
    setShowPassword(!showPassword);
  }

  const onSave = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await resetPassword(password, code, dispatch).then((success) => {
      if (success) {
        navigate('/login', { replace: true });
      }
    })
  }


  return (
    state?.from ?
      <main className={`${resetPasswordStyles.wrapper}`}>
        <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
        <form className={`${resetPasswordStyles.form}`} onSubmit={onSave}>
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
            disabled={resetPasswordStart}
          />
          <Input
            onChange={onChangeCode}
            value={code}
            name={'code'}
            placeholder="Введите код из письма"
            extraClass="mb-6"
            disabled={resetPasswordStart}
          />
          <Button
            onClick={onSave}
            disabled={resetPasswordStart || (password.length === 0 || code.length === 0)}
            htmlType="submit"
            type="primary"
            size="large"
            extraClass="mb-20"
          >
            Сохранить
          </Button>
        </form>

        {resetPasswordStart && <div className={`text text_type_main-medium mb-4`}>Подождите</div>}
        {resetPasswordError && <div className={`text text_type_main-medium mb-4`}>Ошибка</div>}

        <div className={`text text_type_main-default text_color_inactive`}>
          Вспомнили пароль?
          <Link className={`${resetPasswordStyles.link} ml-2`} to='/login'>
            Войти
          </Link>
        </div>
      </main>
      :
      <Navigate to="/login" replace />
  );
};