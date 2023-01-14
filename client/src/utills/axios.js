import {API_URL_WITH_PUBLIC_STORAGE} from "../http";


const getAvatar = (user) => {
    if(!user) return '/static/avatar/003-boy.svg';
    if(user.google_id) {
        return user.avatar;
    }
    return `${API_URL_WITH_PUBLIC_STORAGE}/${user.avatar}`;
}

const getPreview = (preview) => {
    return `${API_URL_WITH_PUBLIC_STORAGE}${preview}`;
}

const imagePlaceholder = `${API_URL_WITH_PUBLIC_STORAGE}/static/gallery_preview.jpeg`;


const downloadFile = (data) => {
    const href = URL.createObjectURL(data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', '1.png'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

}

export {
    getAvatar,
    getPreview,
    imagePlaceholder,
    downloadFile
}