import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../services/auth';
import { useSelector } from 'react-redux';
import { getCookie } from '../utils/set-cookie';
import PropTypes from 'prop-types';

export function ProtectedRouteElement({ element, isPublic }) {
    let { getUser, updateRefreshToken } = useAuth();
    const { user } = useSelector(state => state.login);
    const [isUserLoaded, setUserLoaded] = useState(false);
    const location = useLocation();

    const init = async () => {
        await getUser(getCookie('token')).then(response => {
            if (!response.success) {
                if (response.tokenExpired) {
                    refreshToken();
                }
            }
            setUserLoaded(true);
        })
    };

    const refreshToken = async () => {
        await updateRefreshToken().then(success => {
            if (success.success) {
                getUser(success.accessToken)
            }
        })
    }

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isUserLoaded) return null

    if (isPublic) {
        return user.email ? <Navigate to="/" replace /> : element;
    } else {

        return user.email ? element : <Navigate to="/login" replace state={{
            from: location.pathname
        }} />;
    }
}

ProtectedRouteElement.propTypes = {
    element: PropTypes.node.isRequired,
    isPublic: PropTypes.bool.isRequired
}