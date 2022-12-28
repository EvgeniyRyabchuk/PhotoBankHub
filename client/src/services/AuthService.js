
import $api, {OAUTH_CLIENT_SECRET} from "../http";
import {toast} from "react-toastify";
import {
    PrimaryErrorAlert,
    PrimarySuccessAlert,
    PromiseAlert,
    showAxiosErrorAlert,
    showAxiosSuccessAlert
} from "../utills/alert";
import jwt_decode from "jwt-decode";


export default class AuthService {
    static async login(email, password, remember_me = false) {
        const payload = {
            "grant_type": "password",
            "client_id": "2",
            "client_secret": OAUTH_CLIENT_SECRET,
            "username": email,
            "password": password
        };

        const promise = $api.post('/oauth/token', {
            ...payload
        });

        toast.promise(promise,
            {
                pending: PromiseAlert.FETCH_LOGIN_PENDING,
                success: PromiseAlert.FETCH_LOGIN_SUCCESS,
                error: PromiseAlert.FETCH_LOGIN_ERROR
            }
        )
        return promise;
    }

    static async loginWithGoogle(googleResponse) {
        // const decoded = jwt_decode(credential);
        // console.log(decoded);
        const { credential } = googleResponse;
        console.log(googleResponse);

        return $api.post(`google/callback`, {
            ...googleResponse
        });
    }

    static async register({name, email, password, roleId, remember_me = false}) {
        return $api.post('/register', {
            full_name: name,
            email,
            password,
            remember_me,
            roleId
        });
    }

    static async logout() {
        return $api.delete('/logout');
    }

    static async profile(isDetail = false) {
        // const accessToken = localStorage.getItem('access_token');

        if(isDetail) {
            return $api.get('/profile?detail=true');
        }
        else {
            return $api.get('/profile');
        }
    }



    static async getRoles() {
        return $api.get('/roles');
    }

    static async sendEmailVerification() {
        try {
            const response = await $api.post('/email/verification-notification');
            showAxiosSuccessAlert(PrimarySuccessAlert.MAIL_SENT_SUCCESS);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.MAIL_SENT_SUCCESS}, err);
            throw err;
        }
    }

    static async emailVerify(token) {
        return $api.post('/email/verify', { token });
    }


    static async sendPasswordReset(email) {
        try {
            const response = await $api.post('/send-password-reset-email', { email} );
            showAxiosSuccessAlert(PrimarySuccessAlert.MAIL_SENT_SUCCESS);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.MAIL_SENT_SUCCESS}, err);
            throw err;
        }
    }

    static async passwordReset(userId, token, password) {
        return $api.post(`/password-reset/${userId}/${token}`,
            { password });
    }


    static async deleteAccount(userId)
    {
        return $api.delete(`/auth/users/${userId}`);
    }


}