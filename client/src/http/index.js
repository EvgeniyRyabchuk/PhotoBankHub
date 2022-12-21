import axios from "axios";


export const API_URL = process.env.REACT_APP_API_URL;
export const API_URL_DEBUG = process.env.REACT_APP_API_URL_DEBUG;
export const API_URL_PROD = process.env.REACT_APP_API_URL_PROD;

export const API_URL_WITH_PUBLIC_STORAGE = `${API_URL}/storage`;

export const OAUTH_CLIENT_SECRET = process.env.REACT_APP_OAUTH_CLIENT_SECRET;


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    if(config && config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        // config.headers.cacheControl = 'no-cache';
        // config.headers.pragma = 'no-cache';
    }
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await fetch(`${API_URL}/auth/refresh`, {
                    credentials: "include",
                    method: 'POST',
                    body: {
                        grant_type: "refresh_token",
                        refresh_token: refreshToken,
                        client_id: 2,
                        client_secret: OAUTH_CLIENT_SECRET,
                        scope: ""
                    }
                }
            );
            const {access_token, refresh_token} = await response.json();
            localStorage.setItem('access_token', access_token); 
            localStorage.setItem('refresh_token', refresh_token);
            return $api.request(originalRequest);
        } catch (e) {
            if (error.response.status == 401) {
                //TODO: logout
                console.log('НЕ АВТОРИЗОВАН')
                throw new Error('Not auth');
            }
            throw e;
        }
    }
    throw error;
})

export default $api;
