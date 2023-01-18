import React, {Fragment, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const AuthGuard = ({accessRoles, children}) => {
    console.log('auth guard');
    const {isAuth, loading, user} = useSelector(store => store.user);
    const navigate = useNavigate();
    // check auth

    const checkAuth = () => {
        if(!loading && !isAuth) {
            navigate('/statuses/not_authorized');
        }
        if(!localStorage.getItem('access_token')) {
            navigate('/statuses/not_authorized');
        }
    }

    // check roles
    const checkRole = () => {
        if(isAuth && accessRoles && accessRoles.length > 0) {
            const existAccessRole = accessRoles.find(ar => ar === user.role.name);
            if(!existAccessRole) {
                navigate('/statuses/forbidden');
            }
        }
    }

    useEffect(() => {
        checkAuth();
        checkRole();
    }, [isAuth])

    return (
        <Fragment>
            {isAuth && children}
        </Fragment>
    );
};

export default AuthGuard;