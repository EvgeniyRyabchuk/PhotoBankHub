import React from 'react';
import {Button} from "@mui/material";
import {useGoogleLogin} from "@react-oauth/google";
import AuthService from "../../services/AuthService";
import {loginWithSocial} from "../../store/action-creator/user";
import {useAction} from "../../hooks/useAction";
import {SocialIconButton} from "../../components/UI/SocialButtons";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import {useNavigate} from "react-router-dom";

const SocialAuth = ({extraData}) => {
    const { loginWithSocial } = useAction();
    const navigate = useNavigate();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            await loginWithSocial('google', {...codeResponse, ...extraData});
            navigate(`/profile`);
        },
        flow: 'auth-code',
    });

    return (
        <>
            <SocialIconButton
                sx={{ boxShadow: 1 }}
                // onClick={loginWithGoogle}
                startIcon={<GoogleIcon sx={{ mr: 1 }} />}
                onClick={() => loginWithGoogle()}
            >
                Sign in with Google
            </SocialIconButton>
            <SocialIconButton
                sx={{ boxShadow: 1 }}
                // onClick={loginWithFacebook}
                startIcon={<FacebookIcon sx={{ mr: 1 }} />}
            >
                Sign in with Facebook
            </SocialIconButton>
        </>
    );
};

export default SocialAuth;



/*

   <GoogleLogin
    onSuccess={async (credentialResponse) => {
        const response = await AuthService.loginWithGoogle(credentialResponse);
    }}
    onError={() => {
        console.log('Login Failed');
    }}
    scope="openid profile email"

 */