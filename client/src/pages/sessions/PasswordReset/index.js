import React, {useState} from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import {useSelector} from "react-redux";
import {useAction} from "../../../hooks/useAction";


const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState('');
    const { logout } = useAction();
    const navigate = useNavigate();

    const { token, id } = useParams();
    console.log(token);
    const change = async () => {
        const data = await AuthService.passwordReset(id, token, newPassword);
        await logout();
        navigate('/login');
    }

    return (
        <div>
            <h2>please set a new password</h2>
            <input
                type='password'
                value={newPassword}
                   onChange={(e)=> {
                       setNewPassword(e.target.value);

           }}/>
            <Button
                variant='contained'
                onClick={change}
            >
                Change Password
            </Button>
        </div>
    );
};

export default PasswordReset;