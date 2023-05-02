import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../utils/set-cookie';
import PropTypes from 'prop-types';
import { getUser } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';


export function ProtectedRouteElement({ element, isPublic }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [isUserLoaded, setUserLoaded] = useState(false);
    const location = useLocation();

    const init = async () => {
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

ProtectedRouteElement.propTypes = {
    element: PropTypes.node.isRequired,
    isPublic: PropTypes.bool.isRequired
}