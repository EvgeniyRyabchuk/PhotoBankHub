import {API_URL_WITH_PUBLIC_STORAGE} from "../http";


const getAvatar = (user) => {
    if(!user) return '/static/avatar/003-boy.svg';
    return `${API_URL_WITH_PUBLIC_STORAGE}${user.avatar}`;
}


export {
    getAvatar
}