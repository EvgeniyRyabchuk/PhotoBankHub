import React, {Fragment, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {store} from "../store";

const AuthGuard = ({accessRoles, children}) => {

    const {isAuth, user} = useSelector(store => store.user);
    const navigation = useNavigate();

    if(!isAuth && !localStorage.getItem('access_token')) {
        console.log('not auth', isAuth, user);
        console.log('roles', accessRoles);
        navigation('/login');
    }

    const check = () => {
        if(isAuth && accessRoles && accessRoles.length > 0) {
            const existAccessRole = accessRoles.find(ar => ar === user.role.name);
            console.log(existAccessRole);

            if(!existAccessRole) {
                navigation('/login');
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