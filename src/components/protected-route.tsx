import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../utils/set-cookie';
import { getUser } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { TUserState } from '../services/reducers/user';

type TProtectedRouteElementProps = {
    element: JSX.Element;
    isPublic: boolean
};

export function ProtectedRouteElement({ element, isPublic }: TProtectedRouteElementProps) {
    const dispatch = useDispatch();
    const user = useSelector((state: { [prop in string]: TUserState }) => state.user.user);
    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);
    const location = useLocation();

    const init = async (): Promise<void> => {
        await getUser(dispatch);
        setUserLoaded(true);
    };

    useEffect(() => {
        if (getCookie('token') && (localStorage.getItem('refreshToken'))) {
            init();
        } else {
            setUserLoaded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isUserLoaded) return null

    if (isPublic) {
        return user ? <Navigate to="/" replace /> : element;
    } else {

        return user ? element : <Navigate to="/login" replace state={{
            from: location.pathname
        }} />;
    }
}