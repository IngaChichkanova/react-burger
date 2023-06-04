import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../utils/set-cookie';
import { getUser } from '../services/actions/user';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from '../utils/types';

type TProtectedRouteElementProps = {
    element: JSX.Element;
    isPublic: boolean
};

export function ProtectedRouteElement({ element, isPublic }: TProtectedRouteElementProps) {
    const dispatch = useDispatch();
    const user = useSelector((store: RootState) => store.user.user);
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