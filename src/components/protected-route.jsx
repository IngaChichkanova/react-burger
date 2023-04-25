import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../services/auth';
import { useSelector } from 'react-redux';

export function ProtectedRouteElement({ element }) {
    let { getUser } = useAuth();
    const { getUserSuccess } = useSelector(state => state.login);
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return getUserSuccess ? element : <Navigate to="/login" replace />;
}

export function PublicRouteElement({ element }) {
    let { getUser } = useAuth();
    const { getUserSuccess } = useSelector(state => state.login);
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return getUserSuccess ? <Navigate to='/' /> : element;
} 