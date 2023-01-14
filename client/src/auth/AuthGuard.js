import React, {Fragment, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {store} from "../store";

const AuthGuard = ({accessRoles, children}) => {

    const {isAuth, user} = useSelector(store => store.user);
    const navigation = useNavigate();

    if(!isAuth && !localStorage.getItem('access_token')) {
        navigation('/statuses/not_authorized');
    }

    const check = () => {
        if(isAuth && accessRoles && accessRoles.length > 0) {
            const existAccessRole = accessRoles.find(ar => ar === user.role.name);
            if(!existAccessRole) {
                navigation('/statuses/forbidden');
            }
        }
    }

    useEffect(() => {
        check();
    }, [isAuth])

    return (
        <Fragment>
            {isAuth && children}
        </Fragment>
    );
};

export default AuthGuard;