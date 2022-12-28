import {API_URL_WITH_PUBLIC_STORAGE} from "../http";


const getAvatar = (user) => {
    if(!user) return '/static/avatar/003-boy.svg';
    if(user.google_id) {
        return user.avatar;
    }
    return `${API_URL_WITH_PUBLIC_STORAGE}${user.avatar}`;
}

const getPreview = (preview) => {
    return `${API_URL_WITH_PUBLIC_STORAGE}${preview}`;
}

export {
    getAvatar,
    getPreview
}