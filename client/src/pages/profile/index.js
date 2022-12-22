import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import AuthService from "../../services/AuthService";
import {useAction} from "../../hooks/useAction";

const Profile = () => {

    const { user, isAuth } = useSelector(store => store.user);
    const { profile } = useAction();

    const [token, setToken] = useState('');
    const sendVerifyEmail = async () => {
        const data = await AuthService.sendEmailVerification();
    }

    const emailVerify = async () => {
        const data = await AuthService.emailVerify(token);
        profile();
    }

    const sendChangePasswordRequest = async () => {
        const data = await AuthService.sendPasswordReset(user.email);
    }

    return (
        <div>
            <h1>Profile</h1>

            <h3>Name: {user.full_name}</h3>
            <h3>Email: {user.email}</h3>
            <h3>About: {user.about}</h3>
            <a href={user.website}>{user.website}</a>
            <h3>{user.role.name}</h3>
            <h3>Email verify: {user.email_verified_at ? 'yes' : 'no'}</h3>
            <hr/>
            <br/>

            <Button variant='contained'
            onClick={sendVerifyEmail}>
                Send Verify Email
            </Button>

            <br/>
            <br/>

            <input
                type="text"
                value={token}
                onChange={(e) =>
                    setToken(e.target.value)
                }
            />
            <br/>
            <br/>
            <Button variant='contained'
                    onClick={emailVerify}>
                Verify Email
            </Button>

            <br/>

            <hr/>

            <input
                type="text"
                value={user.email}
            />

            <Button
                variant='contained'
                onClick={sendChangePasswordRequest}
            >
                Change Password
            </Button>


        </div>
    );
};

export default Profile;