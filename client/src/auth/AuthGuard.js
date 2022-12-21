import React, {Fragment} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {store} from "../store";

const AuthGuard = ({accessRoles, children}) => {

    const {isAuth, user} = useSelector(store => store.user);

    const navigation = useNavigate();


    if(!isAuth) {
        //TODO: redirect to login
        // navigation('/login');
        console.log('not auth', isAuth, user);
        console.log('roles', accessRoles);
        return;
    }

    if(accessRoles) {

    }

    console.log('not auth');
    console.log('roles', accessRoles);


    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default AuthGuard;